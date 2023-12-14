import { AuthLayout } from '../components/AuthLayout';
import { LoginForm } from '../components/LoginForm';

export const LoginScreen: React.FC = () => {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
};
