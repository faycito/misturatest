import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAsyncStorage(){
	
	const getData = async (key: string) => {
		try {
			const value = await AsyncStorage.getItem(key);
			
			if(!value) return null;

			return JSON.parse(value);
		} catch (error) {
			return null;
		}
	}

	const saveData = async(value: Record<string, any> | any, key: string) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
		} catch (error) {
			console.error('Some error happening with saving data: ', error);
		}
	}
	
	return {
		getData,
		saveData,
	}
}