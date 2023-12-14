import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import * as yup from 'yup';

import { useTheme } from '../../../core/hooks/useTheme';
import { useRegister } from '../hooks/useRegister';

const schema = yup.object().shape({
	name: yup.string().required(),
	surname: yup.string().required(),
	email: yup.string().email().required(),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one number',
		)
		.required(),
	address: yup.string().required(),
	document: yup.string().required(),
});

type SchemaType = yup.InferType<typeof schema>;

export const RegisterForm: React.FC = () => {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<SchemaType>({
		resolver: yupResolver<SchemaType>(schema),
	});
	const { mutate } = useRegister();
	const { theme } = useTheme();
	const onSubmit = async (data: SchemaType) => {
		mutate({
			name: data.name,
			surname: data.surname,
			email: data.email,
			address: data.address,
			password: data.password,
			document: data.document,
		});

		// const result = await $apiPublic.get('auth/me');
		// console.log(result.data);
	};
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const pickDocument = async () => {
		try {
			const document = await DocumentPicker.getDocumentAsync({
				type: 'application/pdf',
				multiple: false,
			});
			if (
				document &&
				document.assets &&
				document.assets.length > 0 &&
				document.assets[0].uri !== null
			) {
				setValue('document', document.assets[0].uri);
			}
		} catch (err) {
			console.log('Document picker error:', err);
		}
	};

	return (
		<View style={{ alignItems: 'center', marginHorizontal: 30 }}>
			<Text
				style={{ marginBottom: 30, fontFamily: 'Teko-bold', color: theme.colors.text }}
				variant="headlineLarge"
			>
				Реєстрація
			</Text>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder="Пошта"
						mode="outlined"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						style={{ width: '100%', marginTop: 10, backgroundColor: theme.colors.input }}
						outlineColor={theme.colors.outline}
						activeOutlineColor={theme.colors.outline}
						placeholderTextColor={theme.colors.textSoft}
						textColor={theme.colors.textSoft}
					/>
				)}
				name="email"
			/>
			{errors.email && (
				<Text
					style={{
						marginTop: 2,
						color: theme.colors.error,
						fontFamily: 'Teko-semibold',
						alignSelf: 'flex-start',
					}}
					variant="labelLarge"
				>
					{errors.email?.message}
				</Text>
			)}
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder="Ім'я"
						mode="outlined"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						style={{ width: '100%', marginTop: 10, backgroundColor: theme.colors.input }}
						outlineColor={theme.colors.outline}
						activeOutlineColor={theme.colors.outline}
						placeholderTextColor={theme.colors.textSoft}
						textColor={theme.colors.textSoft}
					/>
				)}
				name="name"
			/>
			{errors.name && (
				<Text
					style={{
						marginTop: 2,
						color: theme.colors.error,
						fontFamily: 'Teko-semibold',
						alignSelf: 'flex-start',
					}}
					variant="labelLarge"
				>
					This is required.
				</Text>
			)}
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder="Прізвище"
						mode="outlined"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						style={{ width: '100%', marginTop: 10, backgroundColor: theme.colors.input }}
						outlineColor={theme.colors.outline}
						activeOutlineColor={theme.colors.outline}
						placeholderTextColor={theme.colors.textSoft}
						textColor={theme.colors.textSoft}
					/>
				)}
				name="surname"
			/>
			{errors.surname && (
				<Text
					style={{
						marginTop: 2,
						color: theme.colors.error,
						fontFamily: 'Teko-semibold',
						alignSelf: 'flex-start',
					}}
					variant="labelLarge"
				>
					This is required.
				</Text>
			)}
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder="Адреса"
						mode="outlined"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						style={{ width: '100%', marginTop: 10, backgroundColor: theme.colors.input }}
						outlineColor={theme.colors.outline}
						activeOutlineColor={theme.colors.outline}
						placeholderTextColor={theme.colors.textSoft}
						textColor={theme.colors.textSoft}
					/>
				)}
				name="address"
			/>
			{errors.address && (
				<Text
					style={{
						marginTop: 2,
						color: theme.colors.error,
						fontFamily: 'Teko-semibold',
						alignSelf: 'flex-start',
					}}
					variant="labelLarge"
				>
					This is required.
				</Text>
			)}
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<View
						style={{
							flexDirection: 'row',
							flex: 1,
						}}
					>
						<TextInput
							placeholder="Пароль"
							mode="outlined"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							style={{ width: '100%', marginTop: 10, backgroundColor: theme.colors.input }}
							outlineColor={theme.colors.outline}
							activeOutlineColor={theme.colors.outline}
							placeholderTextColor={theme.colors.textSoft}
							textColor={theme.colors.textSoft}
							secureTextEntry={!showPassword}
						/>
						<Ionicons
							name={showPassword ? 'eye-off' : 'eye'}
							size={24}
							color={theme.colors.specialBg}
							style={{ position: 'absolute', right: 10, top: '40%' }}
							onPress={toggleShowPassword}
						/>
					</View>
				)}
				name="password"
			/>
			{errors.password && (
				<Text
					style={{
						marginTop: 2,
						color: theme.colors.error,
						fontFamily: 'Teko-semibold',
						alignSelf: 'flex-start',
					}}
					variant="labelLarge"
				>
					{errors.password?.message}
				</Text>
			)}
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<View
						style={{
							flex: 1,
							marginTop: 10,
							width: '100%',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Button
							onPress={pickDocument}
							mode="contained"
							style={{
								backgroundColor: theme.colors.specialBg,
							}}
						>
							Вибрати документи
						</Button>
						<Ionicons
							name={value ? 'checkmark-circle' : 'close-circle'}
							size={24}
							color={value ? 'green' : 'red'}
						/>
					</View>
				)}
				name="document"
			/>
			<Button
				onPress={handleSubmit(onSubmit)}
				mode="contained"
				style={{ marginTop: 30, backgroundColor: theme.colors.specialBg }}
			>
				Відправити
			</Button>
		</View>
	);
};
