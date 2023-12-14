import { useContext } from 'react';

import { AuthContext, IAuthContext } from '../hoc/AuthProvider';

export const useAuth = (): IAuthContext => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	const {
		setAccessToken,
		getAccessToken,
		setRefreshToken,
		getRefreshToken,
		isAuthorized,
		setIsAuthorized,
		logout,
		setUser,
		user,
	} = context;
	return {
		setAccessToken,
		getAccessToken,
		setRefreshToken,
		getRefreshToken,
		isAuthorized,
		setIsAuthorized,
		logout,
		setUser,
		user,
	};
};
