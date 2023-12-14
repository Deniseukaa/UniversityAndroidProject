import { MapProps } from '../../../../core/navigation/StackNavigation';
import { Map } from '../../components/Map';

export const MapScreen: React.FC<MapProps> = ({ navigation, route }) => {
	return <Map navigation={navigation} route={route} />;
};
