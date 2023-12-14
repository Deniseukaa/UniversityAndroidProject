import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import * as yup from 'yup';

import { useNavigate } from '../../../core/hooks/useNavigate';
import { useTheme } from '../../../core/hooks/useTheme';
import { useLogin } from '../hooks/useLogin';

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one number',
		)
		.required(),
});

type SchemaType = yup.InferType<typeof schema>;

export const LoginForm: React.FC = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SchemaType>({
		resolver: yupResolver<SchemaType>(schema),
	});
	const navigate = useNavigate();
	const { mutate, error } = useLogin();
	const { theme } = useTheme();
	const onSubmit = async (data: SchemaType) => {
		mutate({
			email: data.email,
			password: data.password,
		});
	};
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<View style={{ alignItems: 'center', marginHorizontal: 30 }}>
			<Text
				style={{ marginBottom: 30, fontFamily: 'Teko-bold', color: theme.colors.text }}
				variant="headlineLarge"
			>
				Вхід
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
			{error ? (
				<Text
					style={{
						marginTop: 2,
						color: theme.colors.error,
						fontFamily: 'Teko-semibold',
						alignSelf: 'flex-start',
					}}
					variant="labelLarge"
				>
					{error.response?.data.message}
				</Text>
			) : null}
			<Button
				onPress={handleSubmit(onSubmit)}
				mode="contained"
				style={{ marginTop: 30, backgroundColor: theme.colors.specialBg }}
			>
				Відправити
			</Button>
			<Text
				onPress={() => navigate('Register')}
				style={{
					marginTop: 10,
					fontFamily: 'Teko-bold',
					textAlign: 'center',
					color: theme.colors.textSoft,
				}}
			>
				Не маєте аккаунту?{'\n'}Зареєструватися
			</Text>
		</View>
	);
};
