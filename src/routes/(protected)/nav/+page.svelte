<!-- The button to open modal -->
<div class="container mx-auto w-full text-center mt-8">
	<a href="#my_modal_8" class="btn mx-auto">open modal</a>
</div>

<!-- Put this part before </body> tag -->
<div class="modal" role="dialog" id="my_modal_8">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Hello!</h3>
		<p class="py-4">This modal works with anchor links</p>
		<div class="modal-action">
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#" class="btn">Yay!</a>
		</div>
	</div>
</div>
