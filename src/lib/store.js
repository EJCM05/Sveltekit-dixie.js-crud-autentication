import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Esta función nos ayudará a cargar la sesión desde localStorage
// para que el login "persista" al recargar la página
function createSessionStore() {
	const storedUser = browser ? localStorage.getItem('userSession') : null;
	const initialValue = storedUser ? JSON.parse(storedUser) : null;

	const { subscribe, set } = writable(initialValue);

	return {
		subscribe,
		// Función para loguear
		login: (user) => {
			if (browser) {
				localStorage.setItem('userSession', JSON.stringify(user));
			}
			set(user);
		},
		// Función para desloguear
		logout: () => {
			if (browser) {
				localStorage.removeItem('userSession');
			}
			set(null);
		}
	};
}

export const userSession = createSessionStore();