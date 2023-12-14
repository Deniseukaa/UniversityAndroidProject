import { $apiPrivate } from '../../../core/api';
import { User } from '../../../core/types';

export interface IUser extends User {
	confirmed: boolean;
	role: 'student' | 'admin';
	room_id: number;
	address: string;
	password: string;
	stripeId: string;
	subscriptionId: string;
	documents: string;
}

export const getUserViaId = async (id: number): Promise<IUser> => {
	const response = await $apiPrivate.get<IUser>(`/users/${id}`);
	return response.data;
};
