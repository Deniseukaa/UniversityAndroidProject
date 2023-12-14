import { $apiPrivate } from '../../../core/api';
import { User } from '../../../core/types';

export interface ISubscribeSecrets {
	customerID: string;
	subscription: string;
}

export const subscribe = async (): Promise<ISubscribeSecrets> => {
	const response = await $apiPrivate.get<ISubscribeSecrets>(`payment/subscribe`);
	return response.data;
};

export const getSubscriptionDetails = async (): Promise<any> => {
	const response = await $apiPrivate.get<ISubscribeSecrets>(`payment/details`);
	return response.data;
};
