import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import parseAmount from '@/utils/parseAmount';
import Expense from '@/types/recods.interface';

export default function Records({title, description, amount}: Expense){
	return (
		<TouchableOpacity>
			<View 
				style={styles.container}
			>
				<View>
					<ThemedText type='defaultSemiBold'>{title}</ThemedText>
					<ThemedText style={styles.description}>{description}</ThemedText>
				</View>
				<View>

				<ThemedText type='defaultSemiBold'>{parseAmount(amount)}</ThemedText>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginHorizontal: 4,
		padding: 8,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: '#ababab',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12
	},
	description: {
		fontSize: 12
	}
})