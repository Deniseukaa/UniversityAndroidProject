import { AuthLayout } from '../components/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterScreen: React.FC = () => {
	return (
		<AuthLayout>
			<RegisterForm />
		</AuthLayout>
	);
};
