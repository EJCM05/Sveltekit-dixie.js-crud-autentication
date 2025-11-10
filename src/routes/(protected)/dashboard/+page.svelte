<script>
	import { getLiveItemCount } from '$lib/database/db.js';

	const totalItems = getLiveItemCount(); // Creamos el nuevo store
</script>

<div class="container mx-auto w-full">
	<div class="stats shadow mx-auto w-full">
		<div class="stat place-items-center">
			<div class="stat-title text-2xl">Items Totales</div>
			<div class="stat-value">{$totalItems}</div>
		</div>
	</div>
</div>
