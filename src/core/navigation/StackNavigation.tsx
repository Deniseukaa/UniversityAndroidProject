import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { PropsWithChildren, createRef, useCallback } from 'react';

import { TabNavigation } from './TabNavigation';
import { useAuth } from '../../modules/auth/hooks/useAuth';
import { LoginScreen } from '../../modules/auth/screens/Login';
import { RegisterScreen } from '../../modules/auth/screens/Register';
import { MapScreen } from '../../modules/map/screens/Map/Map';
import { SettingsScreen } from '../../modules/settings/screens/Settings';
import { useTheme } from '../hooks/useTheme';

export type StackParamList = {
	TabNavigation: undefined;
	Map: { longitude?: number; latitude?: number };
	Register: undefined;
	Login: undefined;
	Settings: undefined;
};

export type MapProps = NativeStackScreenProps<StackParamList, 'Map'>;

const Stack = createNativeStackNavigator<StackParamList>();

export const NavigationRef = createRef<any>();

export const StackNavigation: React.FC<PropsWithChildren> = ({ children }) => {
	const { theme } = useTheme();

	const [fontsLoaded, fontError] = useFonts({
		'Teko-regular': require('../../../assets/fonts/Teko/Teko-Regular.ttf'),
		'Teko-bold': require('../../../assets/fonts/Teko/Teko-Bold.ttf'),
		'Teko-semibold': require('../../../assets/fonts/Teko/Teko-SemiBold.ttf'),
		'Teko-light': require('../../../assets/fonts/Teko/Teko-Light.ttf'),
		'Teko-Medium': require('../../../assets/fonts/Teko/Teko-Medium.ttf'),
	});

	const { isAuthorized } = useAuth();

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
	return (
		<NavigationContainer onReady={onLayoutRootView} ref={NavigationRef}>
			<StatusBar
				style={theme.colors.statusBar}
				animated={false}
				backgroundColor={theme.colors.bg}
			/>
			<Stack.Navigator
				initialRouteName={isAuthorized ? 'TabNavigation' : 'Login'}
				screenOptions={{
					headerTintColor: theme.colors.textSoft,
					headerStyle: {
						backgroundColor: theme.colors.bg,
					},
					navigationBarColor: theme.colors.bg,
					headerShadowVisible: false,
					headerTitleAlign: 'center',
				}}
			>
				<Stack.Screen
					name="Map"
					component={MapScreen}
					options={({ route }) => ({
						title: 'Карта',
						headerTitleAlign: 'center',
						animation: 'slide_from_left',
					})}
				/>
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{
						headerShown: false,
						animation: 'slide_from_left',
					}}
				/>
				<Stack.Screen
					name="TabNavigation"
					component={TabNavigation}
					options={{
						animation: 'slide_from_left',
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Settings"
					component={SettingsScreen}
					options={({ route }) => ({
						title: 'Налаштування',
						headerTitleAlign: 'center',
						animation: 'slide_from_left',
					})}
				/>
				<Stack.Screen
					name="Register"
					component={RegisterScreen}
					options={{
						headerShown: false,
						animation: 'slide_from_right',
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
