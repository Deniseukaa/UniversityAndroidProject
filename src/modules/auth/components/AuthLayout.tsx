import { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../../core/hooks/useTheme';

export const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
	const { theme } = useTheme();
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
			<SafeAreaView
				style={{ flexGrow: 1, backgroundColor: theme.colors.bg, justifyContent: 'center' }}
			>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						backgroundColor: theme.colors.bg,
						justifyContent: 'center',
					}}
				>
					{children}
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};
