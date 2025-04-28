import useAsyncStorage from '@/hooks/useStorage';
import Expense from '@/types/recods.interface';
import React, {createContext ,PropsWithChildren,useCallback,useEffect,useState } from 'react';

export type ExpenseContextType = {
	expenses: Expense[];
	total: number;
	addExpense: (expense: Expense) => Promise<void>;
}

export const ExpenseContext = createContext<ExpenseContextType>({
	expenses: [],
	total: 0,
	addExpense: async () => {}
});

export function ExpenseProvider({ children } : PropsWithChildren) {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [total, setTotal] = useState(0);
	
	const { getData, saveData } = useAsyncStorage();

	const getExpesnes = useCallback(async () => {
		const data = await getData('expenses');
		setExpenses(data || []);
	}, []);
	
	const getTotalAmount = useCallback(async () => {
		const data = await getData('total');
		setTotal(data || 0);
	}, []);

	useEffect(() => {
		getExpesnes();
		getTotalAmount();
	}, []);

	const addExpense = async (expense: Expense) => {
		try {
			const expensesAux = [...expenses, expense];
			const newTotal = total + expense.amount;
			
			await saveData(expensesAux, 'expenses');
			await saveData(newTotal, 'total');
			
			setExpenses(expensesAux);
			setTotal(newTotal);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<ExpenseContext.Provider
			value={{
				expenses,
				total,
				addExpense
			}}
		>
			{children}
		</ExpenseContext.Provider>
	)
}