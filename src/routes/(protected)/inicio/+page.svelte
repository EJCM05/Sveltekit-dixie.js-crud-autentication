<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	// Importamos nuestras funciones CRUD
	import { addItem, getAllItems, updateItem, deleteItem} from '$lib/database/db.js';

	let items = [];
	let nombreInput = '';
	let apellidoInput = '';
	let editandoId = null; // null si estamos creando, o un ID si estamos editando

	// Cargar los items al montar el componente
	onMount(async () => {
		// (Recuerda: onMount solo corre en el navegador)
		await cargarItems();
	});

	async function cargarItems() {
		// Verificación extra por si acaso
		if (browser) {
			try {
				items = await getAllItems();
			} catch (error) {
				console.error('Error cargando items:', error);
			}
		}
	}

	async function handleSubmit() {
		if (!nombreInput.trim())return;
		try {
			if (editandoId) {
				// --- UPDATE ---
				const itemActualizado = { id: editandoId, nombre: nombreInput, apellido: apellidoInput };
				await updateItem(itemActualizado);
			} else {
				// --- CREATE ---
				const nuevoItem = { nombre: nombreInput, apellido: apellidoInput };
				await addItem(nuevoItem);
			}
			
			// Limpiar y recargar
			cancelarEdicion();
			await cargarItems();

		} catch (error) {
			console.error('Error guardando item:', error);
		}
	}

	async function handleBorrar(id) {
		// --- DELETE ---
		if (confirm('¿Estás seguro de que quieres borrar este item?')) {
			try {
				await deleteItem(id);
				await cargarItems(); // Recargamos la lista
			} catch (error) {
				console.error('Error borrando item:', error);
			}
		}
	}

	// Función para poner un item en modo edición
	function handleEditar(item) {
		nombreInput = item.nombre;
		apellidoInput = item.apellido;
		editandoId = item.id;
	}

	// Función para limpiar el formulario
	function cancelarEdicion() {
		nombreInput = '';
		apellidoInput = '';
		editandoId = null;
	}
</script>

<main>
	<h1 class="text-center">CRUD con IndexedDB y SvelteKit</h1>
	<form on:submit|preventDefault={handleSubmit} class="p-5">
		<input type="text" class="input input-primary mb-5" bind:value={nombreInput} placeholder="Nombre"/>
		<input type="text" class="input input-primary" bind:value={apellidoInput} placeholder="Apellido"/>
		<button type="submit" class="btn btn-accent w-full my-5">
			{editandoId ? 'Actualizar' : 'Añadir'}
		</button>
		{#if editandoId}
			<button type="button" class="btn btn-primary w-full" on:click={cancelarEdicion}>
				Cancelar
			</button>
		{/if}
	</form>
<div class="container p-5">
	<h2 class="text-2xl text-center mb-5">Items Guardados</h2>
	<ul>
		{#each items as item (item.id)}
			<li class="alert alert-vertical sm:alert-horizontal" role="alert">
				<!-- icono de info -->
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>

				<span>{item.nombre} (ID: {item.id})</span>
				<span>{item.apellido} (ID: {item.id})</span>
				<div>
					<button class="btn btn-sm btn-primary"  on:click={() => handleEditar(item)}>Editar</button>
					<button class="btn btn-sm btn-secondary" on:click={() => handleBorrar(item.id)}>Borrar</button>
				</div>
			</li>
			{/each}
			
			{#if items.length === 0}
			<div class="container text-center">
				<p>No hay items. ¡Añade uno!</p>
			</div>
			{/if}
		</ul>
	</div>
</main>