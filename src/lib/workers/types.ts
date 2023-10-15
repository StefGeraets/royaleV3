export interface PostMessageDataRequest {
	text: string;
}

export interface PostMessageDataResponse {
	tick: number;
}

export type PostMessageRequest = 'request1' | 'start' | 'stop';
export type PostMessageResponse = 'response1' | 'response2';

export interface PostMessage<T extends PostMessageDataRequest | PostMessageDataResponse> {
	msg: PostMessageRequest | PostMessageResponse;
	data?: T;
}
