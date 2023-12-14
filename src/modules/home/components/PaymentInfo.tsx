import { useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useTheme } from '../../../core/hooks/useTheme';
import { getSubscriptionDetails, subscribe } from '../services/paymentService';

type Props = {
	stripeId?: string;
	subscriptionId?: string;
};

export const PaymentInfo: React.FC<Props> = ({ stripeId, subscriptionId }) => {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const [customerID, setCustomerID] = useState<string>('');
	const [clientSecret, setClientSecret] = useState<string>('');
	const [status, setStatus] = useState<string>('');
	const [date, setDate] = useState<Date | null>(null);
	const { theme } = useTheme();

	useEffect(() => {
		if (stripeId && subscriptionId) {
			setClientSecret(subscriptionId);
			setCustomerID(stripeId);
		} else {
			fetchPaymentSheetParams();
		}
		fetchSubscriptionDetails();
	}, []);

	const fetchPaymentSheetParams = async () => {
		const data = await subscribe();
		setClientSecret(data.subscription);
		setCustomerID(data.customerID);
	};

	const openPaymentSheet = async () => {
		await initializePaymentSheet();
		const { error } = await presentPaymentSheet();

		if (error) {
			Alert.alert(`Error code: ${error.code}`, error.message);
		} else {
			Alert.alert('Success', 'Your order is confirmed!');
			await fetchSubscriptionDetails();
		}
	};

	const initializePaymentSheet = async () => {
		await initPaymentSheet({
			merchantDisplayName: 'Nulp',
			customerId: customerID,
			paymentIntentClientSecret: clientSecret,
			googlePay: {
				merchantCountryCode: 'US',
				testEnv: true,
			},
		});
	};

	const fetchSubscriptionDetails = async () => {
		const data = await getSubscriptionDetails();
		const date = new Date(data.current_period_end * 1000);
		console.log(data);
		console.log(data.status);
		setStatus(data.status);
		setDate(date);
	};

	return (
		<View>
			{status === 'active' && date !== null && new Date() < date ? (
				<Text variant="headlineSmall" style={{ fontFamily: 'Teko-regular', color: 'green' }}>
					Статус: Оплачено до {date?.toLocaleDateString()}
				</Text>
			) : (
				<View>
					<Text variant="headlineSmall" style={{ fontFamily: 'Teko-regular', color: 'red' }}>
						Статус: Не оплачено
					</Text>
					<Button
						mode="contained"
						onPress={openPaymentSheet}
						style={{ backgroundColor: theme.colors.specialBg }}
					>
						Оплатити
					</Button>
				</View>
			)}
		</View>
	);
};
