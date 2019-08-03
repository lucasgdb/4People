<script>
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('<?= $root ?>/service-worker.js')
			.then(reg => {
				if (reg.installing) reg.installing.postMessage('<?= $root ?>')
			})
	}
</script>
