import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View, TextInput } from "react-native";
import Button from "@/components/Button";

const userValidValus = {
	username: 'test',
	password: '123456'
}

export default function LoginScreen(){

	const router = useRouter();
	const { signIn } = useAuth();
	
	const [user, setUser] = useState('');
	const [pass, setPass] = useState('');
	const [error, setError] = useState('');

	const onSubmit = () => {
		setError('');
		const { username, password } = userValidValus;

		if(user !== username || pass !== password){
			setError('Username or password invalid');
			return;
		}

		signIn('token123456');
		router.navigate('/(tabs)');

	}
	

	return (
		<ScrollView
			contentContainerStyle={styles.container}
		>
			<View>
				<ThemedText>Username</ThemedText>
				<TextInput
					value={user}
					onChangeText={setUser}
					style={[styles.input]}
					autoCapitalize='none'
				/>
			</View>
			<View>
				<ThemedText>Password</ThemedText>
				<TextInput
					value={pass}
					onChangeText={setPass}
					style={[styles.input]}
					secureTextEntry
				/>
			</View>
			{ error && (
				<ThemedText type="error">{error}</ThemedText>
			)}
			<Button title="Submit" onPress={onSubmit} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	input: {
		borderWidth: 1,
		marginBottom: 12,
		borderColor: '#bababa',
		width: 225,
		padding: 8,
		borderRadius: 8,
		color: 'white'
	}
})