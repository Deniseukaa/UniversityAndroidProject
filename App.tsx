import { StripeProvider } from '@stripe/stripe-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from './src/core/hoc/ThemeProvider';
import { StackNavigation } from './src/core/navigation/StackNavigation';
import { AuthProvider } from './src/modules/auth/hoc/AuthProvider';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ThemeProvider>
					<StripeProvider publishableKey={publishableKey}>
						<SafeAreaProvider>
							<PaperProvider>
								<StackNavigation />
							</PaperProvider>
						</SafeAreaProvider>
					</StripeProvider>
				</ThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}
