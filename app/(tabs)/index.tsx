import {  StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import Chart from '@/components/Chart';
import { useCallback, useContext, useEffect, useState } from 'react';
import useAsyncStorage from '@/hooks/useStorage';
import parseAmount from '@/utils/parseAmount';
import Records from '@/components/Records';
import RecordI from '@/types/recods.interface';
import Button from '@/components/Button';
import { ExpenseContext } from '@/contexts/ExpenseContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {

  const { total, expenses } = useContext(ExpenseContext);
  const router = useRouter()

  const newExpenseHandler = () => {
    router.navigate('/(tabs)/expense')
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <SafeAreaView>
        <View>
          <ThemedText type='title' style={styles.title}>Welcome to the Test App</ThemedText>
        </View>
        <View>
          <ThemedText type='default'>You have spent</ThemedText>
          <ThemedText type='subtitle'>{parseAmount(total)}</ThemedText>
        </View>
        <Chart/>
        { expenses.length === 0 && (
          <View style={styles.emptyRecords}>
            <ThemedText type='subtitle'>You don't have any records</ThemedText>
            <ThemedText type='default'>To start please register a new one</ThemedText>
            <Button title='Add new Expense' onPress={newExpenseHandler}/>
          </View>
        )}

        { expenses.map((record, i) => (
          <Records
            key={`record-id-${i}`}
            title={record.title}
            amount={record.amount}
            description={record.description}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    textAlign: 'center'
  },
  emptyRecords: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  }
});
