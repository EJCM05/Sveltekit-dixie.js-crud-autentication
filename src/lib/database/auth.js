import { browser } from '$app/environment';
import { db } from '$lib/database/db.js'; // Importamos nuestra instancia de Dexie

// --- Funciones de Hashing (Simulación de Backend) ---
// Usamos SubtleCrypto (API nativa del navegador)

// 1. Crear un "salt" (aleatoriedad para el hash)
function getSalt() {
	return window.crypto.getRandomValues(new Uint8Array(16));
}

// 2. "Hashear" la contraseña con el salt
async function hashPassword(password, salt) {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	
	// Importamos la clave (el salt)
	const key = await window.crypto.subtle.importKey(
		'raw',
		salt,
		{ name: 'PBKDF2' },
		false,
		['deriveBits']
	);

	// Derivamos los bits usando PBKDF2 (un estándar)
	const derivedBits = await window.crypto.subtle.deriveBits(
		{
			name: 'PBKDF2',
			salt: salt,
			iterations: 100000,
			hash: 'SHA-256'
		},
		key,
		256
	);
	
	return new Uint8Array(derivedBits); // Este es nuestro "hash"
}

// 3. Función para verificar la contraseña
async function verifyPassword(enteredPassword, storedHash, salt) {
	const newHash = await hashPassword(enteredPassword, salt);
	// Comparamos byte por byte (más seguro que comparar strings)
	if (newHash.length !== storedHash.length) return false;
	for (let i = 0; i < newHash.length; i++) {
		if (newHash[i] !== storedHash[i]) return false;
	}
	return true;
}


// --- Funciones de Autenticación ---

/**
 * (CREATE) Registrar un nuevo usuario
 */
export async function register(username, password) {
	if (!browser) return { success: false, message: 'Solo en el navegador' };

	try {
		const salt = getSalt();
		const hashedPassword = await hashPassword(password, salt);
		
		// Guardamos en Dexie. 
		// 'username' es la clave única, fallará si ya existe.
		await db.users.add({
			username,
			hashedPassword,
			salt
		});
		
		return { success: true, message: 'Usuario registrado con éxito' };

	} catch (error) {
		console.error('Error en el registro:', error);
		// El error 'ConstraintError' es el que da Dexie si la clave única falla
		if (error.name === 'ConstraintError') {
			return { success: false, message: 'El nombre de usuario ya existe' };
		}
		return { success: false, message: 'Error desconocido en el registro' };
	}
}

/**
 * (READ) Iniciar sesión
 */
export async function login(username, password) {
	if (!browser) return { success: false, message: 'Solo en el navegador' };

	try {
		const user = await db.users.get(username); // Buscamos por la clave primaria
		
		if (!user) {
			return { success: false, message: 'Usuario o contraseña incorrectos' };
		}

		// Verificamos el hash
		const isMatch = await verifyPassword(password, user.hashedPassword, user.salt);

		if (isMatch) {
			return { success: true, user: { username: user.username } };
		} else {
			return { success: false, message: 'Usuario o contraseña incorrectos' };
		}

	} catch (error) {
		console.error('Error en el login:', error);
		return { success: false, message: 'Error al iniciar sesión' };
	}
}