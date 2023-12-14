import { $apiPrivate } from '../../../core/api';

export interface IDormitory {
	id: number;
	name: string;
	longitude: number;
	latitude: number;
	street: string;
	photo: string;
}

export const getDormitories = (): Promise<IDormitory[]> =>
	$apiPrivate.get('dormitory/dormitories').then((res) => res.data);
