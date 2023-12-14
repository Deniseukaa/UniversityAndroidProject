import { AxiosResponse } from 'axios';

import { $apiPrivate, $apiPublic } from '../../../core/api';
import { User } from '../../../core/types';

export interface IAuth {
	refreshToken: string;
	accessToken: string;
	userData: User;
}

export interface IRegister {
	name: string;
	surname: string;
	email: string;
	password: string;
	address: string;
	document: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export const login = async ({ email, password }: ILogin): Promise<IAuth> => {
	const response: AxiosResponse<IAuth> = await $apiPublic.post<IAuth>('auth/login', {
		email,
		password,
	});

	return response.data;
};

export const register = async ({
	name,
	surname,
	password,
	email,
	address,
	document,
}: IRegister): Promise<void> => {
	console.log(document);
	const form = new FormData();
	const userData = {
		name,
		surname,
		password,
		email,
		address,
	};
	form.append('file', {
		uri: document,
		type: 'application/pdf',
		name: 'file.pdf',
		fileName: 'file.pdf',
	} as any);
	form.append('data', JSON.stringify(userData));
	return $apiPrivate.post('auth/register', form, {
		headers: {
			Accept: '*/*',
			'Content-Type': 'multipart/form-data',
		},
	});
	// const url = process.env.EXPO_PUBLIC_BASE_URL + 'auth/register';
	// console.log(form);
	// const config = {
	// 	method: 'POST',
	// 	headers: { Accept: '*/*', 'Content-Type': 'multipart/form-data' },
	// 	body: form,
	// };
	// return fetch(url, config).then((response) => {});
};
