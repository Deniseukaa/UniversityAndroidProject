import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Text, Switch, FAB, Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../../../core/hooks/useTheme';
import sendEmail from '../../../core/utils/sendEmail';
import { useAuth } from '../../auth/hooks/useAuth';

export function SettingsScreen() {
	const [isSwitchOn, setIsSwitchOn] = useState(false);
	const insets = useSafeAreaInsets();
	const { theme, toggleTheme } = useTheme();
	const { logout, user } = useAuth();
	const onToggleSwitch = () => {
		setIsSwitchOn(!isSwitchOn);
		toggleTheme();
	};

	return (
		<View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
			<View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
				<Avatar.Text
					size={76}
					label={user?.name ? `${user.name[0] + user.surname[0]}` : ':3'}
					style={{
						backgroundColor: theme.colors.specialBg,
					}}
					color={theme.colors.textSoft}
				/>
				<Text
					variant="headlineSmall"
					style={{ fontFamily: 'Teko-bold', color: theme.colors.textSoft, marginVertical: 10 }}
				>
					{user.name} {user.surname}
				</Text>
			</View>
			<Divider />
			<View
				style={{
					flexDirection: 'row',
					marginHorizontal: 10,
					marginTop: 20,
					justifyContent: 'space-between', // Changed justifyContent
					alignItems: 'flex-start',
				}}
			>
				<Text variant="bodyLarge" style={{ fontFamily: 'Teko-bold', color: theme.colors.textSoft }}>
					Переключити тему
				</Text>
				<Switch
					color={theme.colors.specialBg}
					value={isSwitchOn}
					onValueChange={onToggleSwitch}
					style={{ alignSelf: 'flex-end' }}
				/>
			</View>
			<TouchableOpacity
				style={{
					flexDirection: 'row',
					marginHorizontal: 10,
					marginTop: 20,
					justifyContent: 'space-between', // Changed justifyContent
					alignItems: 'baseline',
				}}
				onPress={logout}
			>
				<Text variant="bodyLarge" style={{ fontFamily: 'Teko-bold', color: theme.colors.textSoft }}>
					Вийти з аккаунту
				</Text>
				<Ionicons
					name="exit"
					size={26}
					color={theme.colors.specialBg}
					style={{ marginRight: 12 }}
				/>
			</TouchableOpacity>
			<FAB
				icon="message-outline"
				style={{
					position: 'absolute',
					right: 0,
					bottom: 0,
					marginRight: 16,
					marginBottom: insets.bottom + 16,
					backgroundColor: theme.colors.specialBg,
					shadowColor: theme.colors.shadow,
				}}
				label="Написати адміністратору"
				color={theme.colors.text}
				onPress={() => sendEmail({ recipients: [user.email] })}
			/>
		</View>
	);
}
