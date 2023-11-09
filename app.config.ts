module.exports = {
	name: 'Поселення в гуртожиток',
	slug: 'AndroidApp',
	version: '1.0.0',
	orientation: 'portrait',
	userInterfaceStyle: 'light',
	assetBundlePatterns: ['**/*'],
	ios: {
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/adaptive_icon.png',
			backgroundColor: '#FFFFFF',
		},
		splash: {
			image: './assets/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#8186D5',
		},
		package: 'com.deniseukaa.AndroidApp',
		config: {
			googleMaps: {
				apiKey: process.env.MAPS_API_KEY,
			},
		},
	},
	web: {
		favicon: './assets/favicon.png',
	},
};
