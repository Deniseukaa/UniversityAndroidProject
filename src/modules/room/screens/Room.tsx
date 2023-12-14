import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

import { Loading } from '../../../core/components/Loading';
import { useTheme } from '../../../core/hooks/useTheme';
import { TabScreenProps } from '../../../core/navigation/TabNavigation';
import { ResidentCard } from '../components/ResidentCard';
import { useRoom } from '../hooks/useRoom';

export const RoomScreen: React.FC<TabScreenProps<'Room'>> = ({ navigation }) => {
	const { data, isLoading } = useRoom();
	const [refreshing, setRefreshing] = useState(false);
	const queryClient = useQueryClient();
	const { theme } = useTheme();

	const pullDownToRefresh = async () => {
		setRefreshing(true);
		queryClient.invalidateQueries({ queryKey: ['rooms'] });
		setRefreshing(false);
	};

	useEffect(() => {
		if (data) {
			navigation.setOptions({
				title: `Кімната №${data?.number}, Гуртожиток №${data?.dormitory?.name}`,
			});
		}
	}, [data?.number, data?.dormitory?.name, data]);

	if (isLoading) {
		return <Loading isLoading={isLoading} />;
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.colors.bg }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={pullDownToRefresh} />}
			>
				{data ? (
					<View>
						<Text
							variant="headlineSmall"
							style={{
								color: theme.colors.textSoft,
								fontFamily: 'Teko-bold',
								textAlign: 'center',
								marginVertical: 20,
							}}
						>
							Мешканці: {data?.users?.length} / {data?.capacity}
						</Text>
						<Divider bold style={{ backgroundColor: theme.colors.specialBg }} />
						<View style={{ marginHorizontal: 10 }}>
							{data?.users?.map((user) => {
								return (
									<ResidentCard
										name={user.name}
										surname={user.surname}
										email={user.email}
										key={user.email}
									/>
								);
							})}
						</View>
					</View>
				) : (
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: theme.colors.bg,
						}}
					>
						<Text
							style={{
								color: theme.colors.text,
								textAlign: 'center',
							}}
							variant="headlineSmall"
						>
							Очікуйте на підтвердження адміністратором
						</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};
