import { StackParamList } from '../navigation/StackNavigation';
import { TabParamList } from '../navigation/TabNavigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useNavigate = () => {
	const { navigate } = useNavigation<NativeStackNavigationProp<TabParamList & StackParamList>>();

	return navigate;
};
