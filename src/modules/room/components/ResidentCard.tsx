import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

import { useTheme } from '../../../core/hooks/useTheme';
import { User } from '../../../core/types';
import sendEmail from '../../../core/utils/sendEmail';

type Props = Omit<User, 'id'>;

export const ResidentCard: React.FC<Props> = ({ name, surname, email }) => {
	const { theme } = useTheme();
	return (
		<View
			style={{
				flex: 1,
				width: '100%',
				backgroundColor: theme.colors.bg,
				marginVertical: 20,
				flexDirection: 'row',
			}}
		>
			<Avatar.Text
				size={62}
				label={`${name[0] + surname[0]}`}
				style={{
					backgroundColor: theme.colors.specialBg,
				}}
				color={theme.colors.textSoft}
			/>
			<View style={{ marginLeft: 10, justifyContent: 'space-between', paddingVertical: 7 }}>
				<Text
					variant="bodyLarge"
					style={{ color: theme.colors.textStrong, fontFamily: 'Teko-bold' }}
				>
					{name} {surname}
				</Text>
				<Text
					variant="bodySmall"
					style={{ color: theme.colors.textSoft, fontFamily: 'Teko-medium' }}
				>
					{email}
				</Text>
			</View>
			<TouchableOpacity
				onPress={() => sendEmail({ recipients: [email] })}
				style={{ marginLeft: 'auto', alignSelf: 'center', marginRight: 15 }}
			>
				<Ionicons name="chatbox-ellipses-sharp" size={26} color={theme.colors.specialBg} />
			</TouchableOpacity>
		</View>
	);
};
