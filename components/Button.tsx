import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps} from 'react-native';
import { ThemedText } from './ThemedText';

interface Props extends TouchableOpacityProps {
	title: string;
	type?: 'default' | 'primary' | 'secondary' 
	line?: 'outlined' | 'full'
}

export default function Button({title, type = 'default', line = 'full', ...props}: Props) {

	return (
		<TouchableOpacity
			{...props}
			style={[
				styles.default,
				type === 'default' ? styles.primary : undefined,
				type === 'secondary' ? styles.secondary : undefined,
				line === 'outlined' ? styles.outlined : undefined,
				props.disabled ? {opacity: .75} : undefined
			]}
		>
			<ThemedText style={styles.label}>
				{title}
			</ThemedText>
		</TouchableOpacity>
	)
}


const styles = StyleSheet.create({
	default: {
		padding: 8,
		borderRadius: 12,
		marginHorizontal: 6 
	},
	primary: {
		backgroundColor: '#43bccd',
		borderColor: '#43bccd',
		borderWidth: 0,
	},
	secondary: {
		backgroundColor: '#662e9b',
		borderColor: '#662e9b',
		borderWidth: 0,
	},
	outlined: {
		borderWidth: 1,
	},
	label: {
		textAlign: 'center'
	}
})