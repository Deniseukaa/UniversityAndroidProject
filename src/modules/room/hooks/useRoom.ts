import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../../auth/hooks/useAuth';
import { IRoom, getRoomViaUserId } from '../services/roomService';

export function useRoom() {
	const { user } = useAuth();
	return useQuery<IRoom | undefined, Error>({
		queryKey: ['rooms'],
		queryFn: () => getRoomViaUserId(user.id),
	});
}
