import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Loading } from '../../../core/components/Loading';
import { useTheme } from '../../../core/hooks/useTheme';
import { useRoom } from '../../room/hooks/useRoom';
import { useUser } from '../../user/hooks/useUser';
import { PaymentInfo } from '../components/PaymentInfo';

export const HomeScreen: React.FC = () => {
	const { theme } = useTheme();
	const { data, isLoading } = useUser();
	const { data: roomData, isLoading: roomLoading } = useRoom();
	const [refreshing, setRefreshing] = useState(false);
	const queryClient = useQueryClient();

	const pullDownToRefresh = async () => {
		setRefreshing(true);
		await queryClient.invalidateQueries({ queryKey: ['users'] });
		await queryClient.invalidateQueries({ queryKey: ['rooms'] });
		console.log(data);
		setRefreshing(false);
	};

	if (isLoading || roomLoading) {
		return <Loading isLoading />;
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.colors.bg }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={pullDownToRefresh} />}
			>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					{data?.confirmed ? (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text
								variant="headlineLarge"
								style={{ fontFamily: 'Teko-regular', color: theme.colors.text, marginBottom: 15 }}
							>
								{data?.name} {data?.surname}
							</Text>
							<Text
								variant="headlineSmall"
								style={{ fontFamily: 'Teko-regular', color: theme.colors.text, marginBottom: 15 }}
							>
								{data?.email}
							</Text>
							<Text
								variant="headlineSmall"
								style={{ fontFamily: 'Teko-regular', color: theme.colors.text, marginBottom: 15 }}
							>
								Кімната №{roomData?.number}, Гуртожиток №{roomData?.dormitory?.name}
							</Text>
							<PaymentInfo stripeId={data.stripeId} subscriptionId={data.subscriptionId} />
						</View>
					) : (
						<Text
							variant="headlineSmall"
							style={{ fontFamily: 'Teko-bold', color: theme.colors.text }}
						>
							Статус: не підтверджено
						</Text>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
