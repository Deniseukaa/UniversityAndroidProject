import { ActivityIndicator, Modal, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import hexToRGBA from '../utils/hexToRGBA';

type Props = {
	isLoading: boolean;
};

export const Loading: React.FC<Props> = ({ isLoading }) => {
	const { theme } = useTheme();
	return (
		<Modal transparent animationType="none" visible={isLoading}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: hexToRGBA(theme.colors.bg, '0.5'),
				}}
			>
				<ActivityIndicator animating={isLoading} size={54} color={theme.colors.specialBg} />
			</View>
		</Modal>
	);
};
