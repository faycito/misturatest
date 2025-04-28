import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ExpenseContext } from '@/contexts/ExpenseContext';
import { useContext, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View, TextInput } from 'react-native';
import { Toast } from 'toastify-react-native'

export default function TabTwoScreen() {

  const { addExpense } = useContext(ExpenseContext);

  const [form, setform] = useState({
    title: '',
    description: '',
    amount: ''
  });

  const onChangeValue = (name: string, value: string) => {
    setform({
      ...form,
      [name]: value
    })
  }

  const saveExpenseHandler = async () => {
    await addExpense({...form, amount: Number(form.amount)});
    Toast.success('Expense added successfully');
    setform({
      title: '',
      description: '',
      amount: ''
    })
  }

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView>
          <View style={styles.header}>
            <ThemedText type={'title'}>Add new Expense</ThemedText>
            <ThemedText>Register a new record of your expense here</ThemedText>
          </View>
          <ThemedText style={styles.label}>Title</ThemedText>
          <TextInput
            value={form.title}
            onChangeText={(value) => onChangeValue('title', value)}
            style={[styles.input]}
          />
          <ThemedText style={styles.label}>Description</ThemedText>
          <TextInput
            value={form.description}
            onChangeText={(value) => onChangeValue('description', value)}
            style={[styles.input]}
          />
          <ThemedText style={styles.label}>Amount</ThemedText>
          <TextInput
            value={form.amount.toString()}
            onChangeText={(value) => onChangeValue('amount', value)}
            style={[styles.input]}
            keyboardType='numeric'
          />
          <Button
            type='secondary'
            title='Save Expense'
            disabled={!form.amount || !form.description || !form.title}
            onPress={saveExpenseHandler}
          />
        </SafeAreaView>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 16
  },
  header: {
    marginVertical: 12
  },
  input: {
		borderWidth: 1,
		marginBottom: 12,
		borderColor: '#bababa',
		width: '100%',
		padding: 8,
		borderRadius: 8,
		color: 'white'
	},
  label: {
    marginVertical: 6
  }
});
