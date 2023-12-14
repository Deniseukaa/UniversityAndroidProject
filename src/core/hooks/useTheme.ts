import { useContext } from 'react';

import ThemeContext, { IThemeContext } from '../hoc/ThemeProvider';

export const useTheme = (): IThemeContext => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	const { theme, toggleTheme } = context;
	return { theme, toggleTheme };
};
