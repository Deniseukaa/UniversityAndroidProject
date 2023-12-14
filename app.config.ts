module.exports = {
	name: 'Поселення в гуртожиток',
	slug: 'AndroidApp',
	version: '1.0.0',
	orientation: 'portrait',
	userInterfaceStyle: 'light',
	assetBundlePatterns: ['**/*'],
	expo: {
		plugins: [
			[
				'expo-image-picker',
				{
					photosPermission: 'The app accesses your photos to let you share them with your friends.',
					cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
				},
			],
			[
				'@stripe/stripe-react-native',
				{
					enableGooglePay: true,
				},
			],
		],
	},
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
