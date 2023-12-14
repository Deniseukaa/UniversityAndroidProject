import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useAuth } from './useAuth';
import { useNavigate } from '../../../core/hooks/useNavigate';
import { IAuth, ILogin, login } from '../services/authService';

export function useLogin() {
	const { setAccessToken, setRefreshToken, setUser } = useAuth();
	const navigate = useNavigate();
	return useMutation<IAuth, AxiosError, ILogin>({
		onSuccess: async (data: IAuth) => {
			// handle success
			await setRefreshToken(data?.refreshToken);
			await setAccessToken(data?.accessToken);
			await setUser(data?.userData);
			navigate('TabNavigation');
		},
		onError: (error: AxiosError) => {
			// handle error
			console.error('Login failed:', error.response?.data);
		},
		mutationFn: login,
	});
}
