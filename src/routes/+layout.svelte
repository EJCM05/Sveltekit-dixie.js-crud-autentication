<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import { userSession } from '$lib/store.js';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	let { children } = $props();
	function handleLogout() {
		userSession.logout();
		goto('/login');
	}
	// Sincronizar el store si localStorage cambia en otra pestaña
	function onStorageChange(event) {
		if (event.key === 'userSession') {
			if (event.newValue) {
				userSession.login(JSON.parse(event.newValue));
			} else {
				userSession.logout();
			}
		}
	}

	// Escuchador de SvelteKit
	if (browser) {
		window.addEventListener('storage', onStorageChange);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<svelte:window on:storage={onStorageChange} />
	{#if $userSession}
	<p class="alert alert-info m-3 text-center font-bold">
		Usuario: {$userSession.username}
	</p>
	{/if}
{@render children()}
<div class="dock dock-xs">
	{#if $userSession}
		<!-- svelte-ignore a11y_invalid_attribute -->
		<!-- svelte-ignore a11y_consider_explicit_label -->

		<button>
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<a href="/">
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
						><polyline
							points="1 11 12 2 23 11"
							fill="none"
							stroke="currentColor"
							stroke-miterlimit="10"
							stroke-width="2"
						></polyline><path
							d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
							fill="none"
							stroke="currentColor"
							stroke-linecap="square"
							stroke-miterlimit="10"
							stroke-width="2"
						></path><line
							x1="12"
							y1="22"
							x2="12"
							y2="18"
							fill="none"
							stroke="currentColor"
							stroke-linecap="square"
							stroke-miterlimit="10"
							stroke-width="2"
						></line></g
					></svg
				>
			</a>
		</button>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button>
			<a href="/dashboard">
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
						><polyline
							points="3 14 9 14 9 17 15 17 15 14 21 14"
							fill="none"
							stroke="currentColor"
							stroke-miterlimit="10"
							stroke-width="2"
						></polyline><rect
							x="3"
							y="3"
							width="18"
							height="18"
							rx="2"
							ry="2"
							fill="none"
							stroke="currentColor"
							stroke-linecap="square"
							stroke-miterlimit="10"
							stroke-width="2"
						></rect></g
					></svg
				>
			</a>
		</button>
		<!-- svelte-ignore a11y_consider_explicit_label -->

		<button>
			<a href="/nav">
				<svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><g fill="currentColor" stroke-linejoin="miter" stroke-linecap="butt"
						><circle
							cx="12"
							cy="12"
							r="3"
							fill="none"
							stroke="currentColor"
							stroke-linecap="square"
							stroke-miterlimit="10"
							stroke-width="2"
						></circle><path
							d="m22,13.25v-2.5l-2.318-.966c-.167-.581-.395-1.135-.682-1.654l.954-2.318-1.768-1.768-2.318.954c-.518-.287-1.073-.515-1.654-.682l-.966-2.318h-2.5l-.966,2.318c-.581.167-1.135.395-1.654.682l-2.318-.954-1.768,1.768.954,2.318c-.287.518-.515,1.073-.682,1.654l-2.318.966v2.5l2.318.966c.167.581.395,1.135.682,1.654l-.954,2.318,1.768,1.768,2.318-.954c.518.287,1.073.515,1.654.682l.966,2.318h2.5l.966-2.318c.581-.167,1.135-.395,1.654-.682l2.318.954,1.768-1.768-.954-2.318c.287-.518.515-1.073.682-1.654l2.318-.966Z"
							fill="none"
							stroke="currentColor"
							stroke-linecap="square"
							stroke-miterlimit="10"
							stroke-width="2"
						></path></g
					></svg
				>
			</a>
		</button>
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button onclick={handleLogout}>
			<svg
				width="22px"
				height="22px"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				></g><g id="SVGRepo_iconCarrier">
					<path
						d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z"
						fill="#FFF"
					></path>
					<path
						d="M13.9999 11C14.5522 11 14.9999 11.4477 14.9999 12C14.9999 12.5523 14.5522 13 13.9999 13V11Z"
						fill="#FFF"
					></path>
					<path
						d="M5.71783 11C5.80685 10.8902 5.89214 10.7837 5.97282 10.682C6.21831 10.3723 6.42615 10.1004 6.57291 9.90549C6.64636 9.80795 6.70468 9.72946 6.74495 9.67492L6.79152 9.61162L6.804 9.59454L6.80842 9.58848C6.80846 9.58842 6.80892 9.58778 5.99991 9L6.80842 9.58848C7.13304 9.14167 7.0345 8.51561 6.58769 8.19098C6.14091 7.86637 5.51558 7.9654 5.19094 8.41215L5.18812 8.41602L5.17788 8.43002L5.13612 8.48679C5.09918 8.53682 5.04456 8.61033 4.97516 8.7025C4.83623 8.88702 4.63874 9.14542 4.40567 9.43937C3.93443 10.0337 3.33759 10.7481 2.7928 11.2929L2.08569 12L2.7928 12.7071C3.33759 13.2519 3.93443 13.9663 4.40567 14.5606C4.63874 14.8546 4.83623 15.113 4.97516 15.2975C5.04456 15.3897 5.09918 15.4632 5.13612 15.5132L5.17788 15.57L5.18812 15.584L5.19045 15.5872C5.51509 16.0339 6.14091 16.1336 6.58769 15.809C7.0345 15.4844 7.13355 14.859 6.80892 14.4122L5.99991 15C6.80892 14.4122 6.80897 14.4123 6.80892 14.4122L6.804 14.4055L6.79152 14.3884L6.74495 14.3251C6.70468 14.2705 6.64636 14.1921 6.57291 14.0945C6.42615 13.8996 6.21831 13.6277 5.97282 13.318C5.89214 13.2163 5.80685 13.1098 5.71783 13H13.9999V11H5.71783Z"
						fill="#FFF"
					></path>
				</g></svg
			>
		</button>
	{:else}
		<a href="/login">Login</a>
		<a href="/register">Registro</a>
	{/if}
</div>
