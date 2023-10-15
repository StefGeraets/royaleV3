<script lang="ts">
	import { gameState } from '$lib/stores/gameState';
	import type {
		PostMessage,
		PostMessageDataRequest,
		PostMessageDataResponse
	} from '$lib/workers/types';
	import { onDestroy, onMount } from 'svelte';

	let syncWorker: Worker | undefined = undefined;

	// @ts-expect-error
	const getValue = ({ data: { tick } }: MessageEvent<PostMessage<PostMessageDataResponse>>) => {
		gameState.addTick(tick);
	};

	const loadWorker = async () => {
		const SyncWorker = await import('$lib/workers/timer.worker?worker');
		syncWorker = new SyncWorker.default();

		syncWorker.onmessage = getValue;

		const message: PostMessage<PostMessageDataRequest> = {
			msg: 'start'
		};

		syncWorker.postMessage(message);
	};

	onMount(loadWorker);

	onDestroy(() => syncWorker?.postMessage({ msg: 'stop' }));
</script>
