const lightTheme: ThemeType = {
	colors: {
		bg: '#ffffff', // main BG
		text: '#2b2d4c', // main Text
		textSoft: '#3b3c4f', // headings
		textStrong: '#3e3e3e', // contrast
		subtitle: '#f9f9fc', // secondary bg
		border: '#e5e6f4', // borders
		shadow: '#bbbdd9', // shadow
		input: '#ffffff', // input
		outline: '#b9bbe4', // outline
		special: '#6f75ce', // special text
		specialBg: '#7379d0', // special bg
		error: 'red',
		statusBar: 'dark',
	},
};

const darkTheme: ThemeType = {
	colors: {
		bg: '#202020',
		text: '#dfdfe3',
		textSoft: '#d1d1d4',
		textStrong: '#d2d2d2',
		subtitle: '#242428',
		border: '#2f303a',
		shadow: '#000000',
		input: '#1c1c1c',
		outline: '#969ad7',
		special: '#8286c3',
		specialBg: '#565ca8',
		statusBar: 'light',
		error: 'red',
	},
};

export type ThemeType = {
	colors: {
		bg: string;
		text: string;
		textSoft: string;
		textStrong: string;
		subtitle: string;
		border: string;
		shadow: string;
		input: string;
		outline: string;
		special: string;
		specialBg: string;
		error: string;
		statusBar: 'light' | 'dark';
	};
};
export { lightTheme, darkTheme };
