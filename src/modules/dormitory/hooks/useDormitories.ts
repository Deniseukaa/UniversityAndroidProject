import { useQuery } from '@tanstack/react-query';

import { IDormitory, getDormitories } from '../services/dormitoryService';

export function useDormitories() {
	return useQuery<IDormitory[], Error>({
		queryKey: ['dormitories'],
		queryFn: getDormitories,
	});
}
