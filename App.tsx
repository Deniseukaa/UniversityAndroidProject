import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation, ParamListBase } from '@react-navigation/native';
import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as MailComposer from 'expo-mail-composer';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useRef } from 'react';
import { Linking, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PaperProvider, Chip, Avatar, Text, FAB } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MapScreen } from './src/screens/Map/Map';
import { darkTheme, lightTheme } from './src/constants';

type StackParamList = {
	TabNavigation: undefined;
	Home3: undefined;
	Home2: undefined;
	Home: undefined;
};

type TabParamList = {
	Home: undefined;
	Home2: undefined;
};

let isDark = false;

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function HomeScreen() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Chip icon="information" onPress={() => console.log('Pressed')}>
				Example Chip
			</Chip>
			<Avatar.Text
				size={49}
				label="XD"
				style={{
					backgroundColor: 'red',
				}}
			/>
			<Text>Home Screen</Text>
		</View>
	);
}

function Home2Screen() {
	const { navigate } = useNavigation<BottomTabNavigationProp<TabParamList & StackParamList>>();
	const name: string = 'Jokerge';
	return (
		<SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: lightTheme.colors.bg,
				}}
			>
				<Text
					variant="headlineLarge"
					style={{
						fontFamily: 'Teko-bold',
						color: lightTheme.colors.textStrong,
					}}
					onPress={() => navigate('Home3')}
				>
					Home2 Screen
				</Text>
			</View>
			<View>
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
					onPress={() =>
						MailComposer.composeAsync({
							recipients: ['jokerge@gmail.com'],
							subject: `Поселення в гуртожиток ${name}`,
						})
					}
				/>
			</View>
		</SafeAreaView>
	);
}

function Home3Screen() {
	const mapRef = useRef<MapView>(null);
	return (
		<View style={{ flex: 1 }}>
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

function TabNavigation() {
	return (
		<Tab.Navigator initialRouteName="Home">
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					headerTitleAlign: 'center',
				}}
			/>
			<Tab.Screen name="Home2" component={Home2Screen} />
		</Tab.Navigator>
	);
}

SplashScreen.preventAutoHideAsync();

export default function App() {
	const theme = isDark ? darkTheme : lightTheme;
	let auth = true;
	const [fontsLoaded, fontError] = useFonts({
		'Teko-regular': require('./assets/fonts/Teko/Teko-Regular.ttf'),
		'Teko-bold': require('./assets/fonts/Teko/Teko-Bold.ttf'),
		'Teko-semibold': require('./assets/fonts/Teko/Teko-SemiBold.ttf'),
		'Teko-light': require('./assets/fonts/Teko/Teko-Light.ttf'),
		'Teko-Medium': require('./assets/fonts/Teko/Teko-Medium.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<SafeAreaProvider>
			<PaperProvider>
				<NavigationContainer onReady={onLayoutRootView}>
					<Stack.Navigator
						initialRouteName={auth ? 'Home2' : 'Home3'}
						screenOptions={{
							headerTintColor: theme.colors.textSoft,
							statusBarColor: theme.colors.bg,
							headerStyle: {
								backgroundColor: theme.colors.bg,
							},
							contentStyle: {
								borderTopColor: theme.colors.specialBg,
								borderTopWidth: 5,
							},
							navigationBarColor: theme.colors.bg,
							statusBarStyle: isDark ? 'light' : 'dark',
						}}
					>
						{auth ? (
							<Stack.Screen
								name="Home2"
								component={Home2Screen}
								options={{
									headerTitleAlign: 'center',
								}}
							/>
						) : (
							false
						)}

						<Stack.Screen
							name="Home3"
							component={MapScreen}
							options={{
								headerTitleAlign: 'center',
								animation: 'slide_from_left',
							}}
						/>
						<Stack.Screen
							name="Home"
							component={HomeScreen}
							options={{
								headerTitleAlign: 'center',
								animation: 'slide_from_left',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</SafeAreaProvider>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// });

// #[TODO] replace screens and createe folder structure for project
// #[ISSUE] project quit with error on margin in map.tsx;
// #[CHECK] My memory increases to 8.4(was 4.5Gb) chech why it occurs.
