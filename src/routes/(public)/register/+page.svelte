<script>
	import { goto } from '$app/navigation';
	import { register } from '$lib/database/auth.js';

	let username = '';
	let password = '';
	let error = '';
	let success = '';

	async function handleRegister() {
		error = '';
		success = '';
		const result = await register(username, password);
		
		if (result.success) {
			success = result.message + '. ¡Ahora puedes iniciar sesión!';
			// Opcional: redirigir a login
			setTimeout(() => {
				goto('/login');
			}, 2000);
		} else {
			error = result.message;
		}
	}
</script>
<main class="min-h-screen flex items-center justify-center bg-base-200">
	
	<div class="card w-full max-w-md bg-base-100 shadow-xl">
		<div class="card-body">
			
			<h1 class="card-title text-3xl font-bold justify-center mb-4">Registro</h1>

			<form on:submit|preventDefault={handleRegister}>
				
				<div class="form-control w-full">
					<label class="label" for="username-input">
						<span class="label-text">Usuario</span>
					</label>
					<input
						id="username-input"
						type="text"
						placeholder="tu.usuario"
						class="input input-bordered w-full"
						bind:value={username}
						required
					/>
				</div>

				<div class="form-control w-full mt-2">
					<label class="label" for="password-input">
						<span class="label-text">Contraseña</span>
					</label>
					<input
						id="password-input"
						type="password"
						placeholder="••••••••"
						class="input input-bordered w-full"
						bind:value={password}
						required
					/>
				</div>
				
				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary">Registrarse</button>
				</div>

				{#if error}
					<div role="alert" class="alert alert-error mt-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2 2m2-2l2 2m-2-2L8 8m4 4l-4 4m6-6l4 4m-4-4l4-4" /></svg>
						<span>{error}</span>
					</div>
				{/if}

				{#if success}
					<div role="alert" class="alert alert-success mt-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						<span>{success}</span>
					</div>
				{/if}
			</form>

			<div class="text-center mt-4">
				<a href="/login" class="link link-secondary">
					¿Ya tienes cuenta? Inicia sesión
				</a>
			</div>
			
		</div>
	</div>
</main>