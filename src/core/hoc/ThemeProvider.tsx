import * as SecureStore from 'expo-secure-store';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeType, darkTheme, lightTheme } from '../../constants';

export interface IThemeContext {
	toggleTheme: () => Promise<void>;
	theme: ThemeType;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [theme, setTheme] = useState<ThemeType>(lightTheme);
	const deviceColorTheme = useColorScheme();
	useEffect(() => {
		const getTheme = async () => {
			try {
				const savedTheme = await SecureStore.getItemAsync('theme');
				if (!savedTheme) {
					if (deviceColorTheme === null || deviceColorTheme === undefined) {
						await SecureStore.setItemAsync('theme', 'light');
					} else await SecureStore.setItemAsync('theme', deviceColorTheme);
				} else {
					if (savedTheme === 'dark') setTheme(darkTheme);
					else setTheme(lightTheme);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getTheme();
	}, []);

	const toggleTheme = async () => {
		if ((await SecureStore.getItemAsync('theme')) === 'light') {
			await SecureStore.setItemAsync('theme', 'dark');
			setTheme(darkTheme);
		} else {
			await SecureStore.setItemAsync('theme', 'light');
			setTheme(lightTheme);
		}
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
export default ThemeContext;
