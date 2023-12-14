import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { StackParamList } from './StackNavigation';
import { DormitoryScreen } from '../../modules/dormitory/screens/Dormitories';
import { HomeScreen } from '../../modules/home/screens/Home';
import { RoomScreen } from '../../modules/room/screens/Room';
import { useTheme } from '../hooks/useTheme';

export type TabParamList = {
	Home: undefined;
	Dormitory: undefined;
	Room: { title: string };
};
export type TabScreenNavigationProp<T extends keyof TabParamList> = BottomTabNavigationProp<
	TabParamList,
	T
>;

export type TabScreenProps<T extends keyof TabParamList> = {
	navigation: TabScreenNavigationProp<T>;
};

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigation() {
	const { theme } = useTheme();
	const { navigate } = useNavigation<BottomTabNavigationProp<TabParamList & StackParamList>>();
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: string;

					if (route.name === 'Home') {
						iconName = focused ? 'home' : 'home-outline';
					} else if (route.name === 'Dormitory') {
						iconName = focused ? 'ios-business' : 'ios-business-outline';
					} else if (route.name === 'Room') {
						iconName = focused ? 'bed' : 'bed-outline';
					}
					//@ts-ignore
					return <Ionicons name={iconName} size={size} color={theme.colors.specialBg} />;
				},
				headerShown: true,
				headerTitleAlign: 'center',
				headerRight: () => (
					<Ionicons
						name="ellipsis-vertical"
						size={20}
						color={theme.colors.specialBg}
						style={{ marginRight: 15 }}
						onPress={() => navigate('Settings')}
					/>
				),
				headerTintColor: theme.colors.textSoft,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: theme.colors.bg,
					borderTopWidth: 3,
					borderTopColor: theme.colors.border,
				},
			})}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={({ route }) => ({
					title: 'Головна',
					headerStyle: {
						height: 80,
						backgroundColor: theme.colors.bg,
					},
				})}
			/>
			<Tab.Screen
				name="Dormitory"
				component={DormitoryScreen}
				options={({ route }) => ({
					title: 'Гуртожиток',
					headerStyle: {
						height: 80,
						backgroundColor: theme.colors.bg,
					},
				})}
			/>
			<Tab.Screen
				name="Room"
				initialParams={{ title: 'Room' }}
				component={RoomScreen}
				options={({ route }) => ({
					title: route.params?.title || 'Кімната',
					headerStyle: {
						height: 80,
						backgroundColor: theme.colors.bg,
					},
				})}
			/>
		</Tab.Navigator>
	);
}
