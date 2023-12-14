import { useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { NavigationRef } from '../../../core/navigation/StackNavigation';
import { User } from '../../../core/types';

export interface IAuthContext {
	setAccessToken: (token: string) => Promise<void>;
	setRefreshToken: (token: string) => Promise<void>;
	getAccessToken: () => Promise<string | null>;
	getRefreshToken: () => Promise<string | null>;
	setUser: (user: User) => Promise<void>;
	isAuthorized: boolean;
	setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
	logout: () => Promise<void>;
	user: User;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
	const [user, setUserInfo] = useState<User>({} as User);
	const queryClient = useQueryClient();

	useEffect(() => {
		console.log(1);
		const getToken = async () => {
			try {
				const accessToken = await getAccessToken();
				if (accessToken) {
					setIsAuthorized(true);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getToken();
	}, []);

	const setAccessToken = async (token: string): Promise<void> => {
		await SecureStore.setItemAsync('accessToken', token);
	};

	const setRefreshToken = async (token: string): Promise<void> => {
		await SecureStore.setItemAsync('refreshToken', token);
	};

	const getAccessToken = async (): Promise<string | null> => {
		return SecureStore.getItemAsync('accessToken');
	};

	const getRefreshToken = async (): Promise<string | null> => {
		return SecureStore.getItemAsync('refreshToken');
	};

	const setUser = async (user: User): Promise<void> => {
		setUserInfo(user);
		await SecureStore.setItemAsync('user', JSON.stringify(user));
	};

	const logout = async (): Promise<void> => {
		await SecureStore.deleteItemAsync('refreshToken');
		await SecureStore.deleteItemAsync('accessToken');
		await SecureStore.deleteItemAsync('user');
		setIsAuthorized(false);
		setUserInfo({} as User);
		queryClient.clear();
		NavigationRef?.current.navigate('Login');
	};
	return (
		<AuthContext.Provider
			value={{
				isAuthorized,
				setIsAuthorized,
				setAccessToken,
				setRefreshToken,
				getAccessToken,
				getRefreshToken,
				logout,
				setUser,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
