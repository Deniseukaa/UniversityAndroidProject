import { useRef } from 'react';
import { Linking, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MapProps } from '../../../core/navigation/StackNavigation';
import { useDormitories } from '../../dormitory/hooks/useDormitories';

export const Map: React.FC<MapProps> = ({ navigation, route }) => {
	const mapRef = useRef<MapView>(null);
	const insets = useSafeAreaInsets();
	const { data } = useDormitories();
	return (
		<View style={{ flex: 1, paddingBottom: insets.bottom }}>
			<MapView
				ref={mapRef}
				userInterfaceStyle="dark"
				loadingEnabled
				style={{ width: '100%', height: '100%' }}
				onMapLoaded={() => {
					if (
						mapRef.current &&
						route.params &&
						route.params.latitude !== undefined &&
						route.params.longitude !== undefined
					) {
						console.log(route.params.latitude, route.params.longitude);
						mapRef.current.animateToRegion(
							{
								latitude: route.params.latitude,
								longitude: route.params.longitude,
								longitudeDelta: 0.001,
								latitudeDelta: 0.001,
							},
							1000,
						);
					}
				}}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: 49.83558481216278,
					longitude: 24.014415338990517,
					longitudeDelta: 0.001,
					latitudeDelta: 0.001,
				}}
			>
				{data?.map((dormitory) => (
					<Marker
						coordinate={{
							latitude: dormitory.latitude,
							longitude: dormitory.longitude,
						}}
						key={dormitory.id}
						title={`Гуртожиток №${dormitory.name}'`}
						description={dormitory.street}
						onPress={() => {
							Linking.openURL(
								`geo:${dormitory.latitude}, ${dormitory.longitude}?q=${dormitory.street}`,
							);
						}}
					/>
				))}
			</MapView>
		</View>
	);
};
