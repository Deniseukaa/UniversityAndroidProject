import { $apiPrivate } from '../../../core/api';
import { User } from '../../../core/types';

export interface IRoom {
	id: number;
	number: number;
	capacity: number;
	dormitory_id: number;
	users?: User[];
	dormitory?: {
		name: number;
	};
}

export const getRoomViaUserId = async (id: number): Promise<IRoom> => {
	const response = await $apiPrivate.get<IRoom>(`/rooms/user`, {
		params: {
			id,
		},
	});
	return response.data;
};
