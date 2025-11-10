import { redirect } from '@sveltejs/kit';
import { userSession } from '$lib/store.js';
import { browser } from '$app/environment';
import { get } from 'svelte/store';

// Este 'load' se ejecuta en el cliente ANTES de cargar la página
export function load() {
	if (!browser) return; // No hacer nada en el servidor

	// Obtenemos el valor actual del store
	const user = get(userSession);

	if (!user) {
		// Si no hay usuario, lanzamos una redirección al login
		throw redirect(307, '/login');
	}

	// Si hay usuario, retornamos sus datos para que 
	// la página o el layout los puedan usar
	return {
		user: user
	};
}