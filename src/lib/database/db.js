import { liveQuery } from 'dexie';
import Dexie from 'dexie';
import { browser } from '$app/environment';

/**
 * Definimos nuestra clase de base de datos que hereda de Dexie
 * Es la forma moderna de Dexie de manejar la configuración.
 */
class MiAppDatabase extends Dexie {
	// 'items' es el nombre de nuestra "tabla" (Object Store)
	// 'id' es la clave primaria autoincremental (++)
	// 'nombre' es un campo indexado, para poder buscar por él (opcional, pero buena práctica)
	items;
	users; // <--- 1. Añade la propiedad
	constructor() {
		super('Crud_dixie_DB'); // El nombre de la base de datos

		// Definición del esquema y las versiones
		this.version(1).stores({
			items: '++id, nombre, apellido' // Esquema: Clave primaria autoincremental 'id' e indexamos 'nombre'
		});
		this.version(2).stores({
			items: '++id, nombre, apellido', // Mantenemos el esquema anterior
			users: '&username, hashedPassword, salt' // 'username' es la clave
		});

		// Asignamos la "tabla" a una propiedad de la clase para fácil acceso
		this.items = this.table('items');
		this.users = this.table('users');
	}
}

// Instanciamos la base de datos
export const db = new MiAppDatabase();

// --- Nuestras Funciones CRUD (¡Ahora mucho más simples!) ---

/**
 * (CREATE) Añadir un nuevo item
 * @param {object} item - El objeto a añadir (sin ID)
 */
export async function addItem(item) {
	// Dexie es inteligente y sabe cómo manejar el autoincremento.
	// db.items.add() retorna el ID del nuevo item.
	if (browser) {
		return await db.items.add(item);
	}
}

/**
 * (READ) Obtener todos los items
 */
export async function getAllItems() {
	// .toArray() es una función de Dexie para obtener todo.
	if (browser) {
		return await db.items.toArray();
	}
	return []; // Retornamos un array vacío si estamos en SSR
}

/**
 * (UPDATE) Actualizar un item existente
 * @param {object} item - El objeto a actualizar (debe tener ID)
 */
export async function updateItem(item) {
	// .put() actualiza si el ID existe, o crea uno nuevo si no.
	// Como 'item' ya tiene el 'id', lo actualizará.
	if (browser) {
		return await db.items.put(item);
	}
}

/**
 * (DELETE) Borrar un item por su ID
 * @param {number} id - El ID del item a borrar
 */
export async function deleteItem(id) {
	// Sintaxis súper limpia: .delete()
	if (browser) {
		return await db.items.delete(id);
	}
}

// stats

export function getLiveItemCount() {
	if (!browser) {
		// Para SSR, retornamos un store con valor 0
		return { subscribe: (run) => { run(0); return () => {}; } };
	}
	return liveQuery(() => db.items.count());
}