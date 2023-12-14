import { useQuery } from '@tanstack/react-query';

import { IUser, getUserViaId } from '../services/userService';
import { useAuth } from '../../auth/hooks/useAuth';

export function useUser() {
	const { user } = useAuth();
	return useQuery<IUser, Error>({
		queryKey: ['users'],
		queryFn: () => getUserViaId(user.id),
	});
}
