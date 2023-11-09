import { useRef } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Text, FAB } from 'react-native-paper';

import { darkTheme } from '../../constants';

function MapScreen() {
	const mapRef = useRef<MapView>(null);
	return (
		<View style={{ flex: 1 }}>
			<FAB
				icon="message-outline"
				style={{
					position: 'absolute',
					bottom: 0,
					right: 0,
					margin: 16,
					backgroundColor: darkTheme.colors.specialBg,
					shadowColor: darkTheme.colors.shadow,
				}}
				label="Написати адміністратору"
				color={darkTheme.colors.text}
			/>
			<Text
				style={{ fontFamily: 'Teko-bold' }}
				onPress={() => {
					// Linking.openURL(
					// 	`geo:49.83412544312776, 24.01306512720111?q=Le cloud store, Hlyboka St, 8, Lviv, Lviv Oblast, 79000`,
					// );
					mapRef.current?.animateToRegion(
						{
							latitude: 49.8340770022102,
							longitude: 24.010994461920312,
							longitudeDelta: 0.001,
							latitudeDelta: 0.001,
						},
						1000,
					);
				}}
			>
				Home2 Screen
			</Text>
			<MapView
				ref={mapRef}
				style={{ width: '100%', height: '100%' }}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: 49.83558481216278,
					longitude: 24.014415338990517,
					longitudeDelta: 0.01,
					latitudeDelta: 0.01,
				}}
			>
				<Marker
					coordinate={{
						latitude: 49.83558481216278,
						longitude: 24.014415338990517,
					}}
					title="Sharaga"
					description="Sharaga2"
				/>
			</MapView>
		</View>
	);
}

export { MapScreen };
