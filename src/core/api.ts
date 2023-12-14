import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { NavigationRef } from './navigation/StackNavigation';

export const $apiPublic = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

export const $apiPrivate = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

$apiPrivate.interceptors.request.use(
	async (config) => {
		const accessToken = await SecureStore.getItemAsync('accessToken');
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

$apiPrivate.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// If the error is a 401 and we have a refresh token, refresh the JWT token
		if (error.response.status === 401 && (await SecureStore.getItemAsync('refreshToken'))) {
			originalRequest._retry = true;
			try {
				const refreshToken = await SecureStore.getItemAsync('refreshToken');
				const response = await $apiPrivate.get<{ accessToken: string }>('auth/refresh', {
					headers: {
						Cookie: `refreshToken=${refreshToken}`,
					},
				});
				const { accessToken } = response.data;

				await SecureStore.setItemAsync('accessToken', accessToken);

				// Retry the original request with the new token
				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				return axios(originalRequest);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					if (
						(error.response?.status === 403 &&
							error.response?.data.message === 'RefreshToken expired') ||
						error.response?.status === 500
					)
						NavigationRef?.current.navigate('Login');
					await SecureStore.deleteItemAsync('accessToken');
					await SecureStore.deleteItemAsync('refreshToken');
				} else {
					console.log(error);
				}
			}
		}
		return Promise.reject(error);
	},
);
