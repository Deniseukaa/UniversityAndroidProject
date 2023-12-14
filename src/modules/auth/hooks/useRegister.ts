import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';

import { useNavigate } from '../../../core/hooks/useNavigate';
import { register } from '../services/authService';

export function useRegister() {
	const navigate = useNavigate();
	return useMutation({
		onSuccess: async () => {
			console.log('Register successful:');
			navigate('Login');
		},
		onError: (error: AxiosError) => {
			if (error) {
				Alert.alert(`Register failed: ${error.response?.data.message}`);
			}
		},
		mutationFn: register,
	});
}
