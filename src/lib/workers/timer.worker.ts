import type { PostMessage, PostMessageDataRequest } from './types';

onmessage = ({ data: { msg } }: MessageEvent<PostMessage<PostMessageDataRequest>>) => {
	switch (msg) {
		case 'start':
			startTimer();
			break;
		case 'stop':
			stopTimer();
	}
};

let timer: NodeJS.Timeout | undefined = undefined;

const giveTime = () => postMessage({ tick: Math.round(performance.now() / 1000) });

const startTimer = () => (timer = setInterval(giveTime, 1000));

const stopTimer = () => {
	if (!timer) {
		return;
	}

	clearInterval(timer);
	timer = undefined;
};

export {};
