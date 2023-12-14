import { useState } from 'react';
import { ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { Card } from 'react-native-paper';

import { Loading } from '../../../core/components/Loading';
import { useNavigate } from '../../../core/hooks/useNavigate';
import { useTheme } from '../../../core/hooks/useTheme';
import { useDormitories } from '../hooks/useDormitories';

export const DormitoryScreen: React.FC = () => {
	const [refreshing, setRefreshing] = useState(false);

	const { isLoading, data, isSuccess, refetch } = useDormitories();
	const navigate = useNavigate();
	const { theme } = useTheme();
	const pullDownToRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	if (isLoading) {
		return <Loading isLoading={isLoading} />;
	}
	// https://lpnu.ua/sites/default/files/2023/6/1/news/23630/gurt08252016028t.jpg
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.colors.bg }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={pullDownToRefresh} />}
			>
				{isSuccess ? (
					data.map((dormitory, index) => (
						<Card
							key={index} // Ensure each mapped item has a unique key
							style={{
								margin: 15,
								backgroundColor: theme.colors.bg,
								borderColor: theme.colors.outline,
							}}
							onPress={() =>
								navigate('Map', { longitude: dormitory.longitude, latitude: dormitory.latitude })
							}
							mode="outlined"
						>
							<Card.Cover
								source={{
									uri: dormitory.photo,
								}}
								style={{ height: 136 }}
							/>
							<Card.Title
								title={`Гуртожиток №${dormitory.name}`}
								subtitle={`${dormitory.street}`}
								titleVariant="headlineSmall"
								titleStyle={{ fontFamily: 'Teko-bold', color: theme.colors.textStrong }}
								subtitleVariant="bodyLarge"
								subtitleStyle={{ fontFamily: 'Teko-bold', color: theme.colors.textSoft }}
							/>
						</Card>
					))
				) : (
					<Loading isLoading />
				)}
			</ScrollView>
		</SafeAreaView>
	);
};
