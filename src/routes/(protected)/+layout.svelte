<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation'; // <-- Usamos 'goto' (cliente)
	import { userSession } from '$lib/store.js';
	import { browser } from '$app/environment';

	// $userSession es nuestro store reactivo.
	// La página solo se mostrará si $userSession tiene datos.

	onMount(() => {
		// onMount() SOLO se ejecuta en el navegador (cliente)
		// Esta es nuestra nueva guardia, 100% segura.
		
		// Si el usuario no está logueado...
		if (!$userSession) {
			// ...lo enviamos al login usando navegación del cliente.
			goto('/login');
		}
	});

	// (Opcional) Sincroniza si se cierra sesión en otra pestaña
	userSession.subscribe((session) => {
		// Asegúrate de que esto solo corra en el navegador
		if (browser && session === null) {
			goto('/login');
		}
	});
</script>

{#if $userSession}
	<slot />
{:else}
	<p>Cargando...</p>
{/if}