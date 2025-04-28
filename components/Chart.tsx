import { ExpenseContext } from '@/contexts/ExpenseContext';
import { useContext, useEffect, useState } from 'react';
import { } from 'react-native';
import { CurveType, LineChart } from 'react-native-gifted-charts';

export default function Chart(){

	const [data, setData] = useState<{value: number}[]>([]);

	const { expenses } = useContext(ExpenseContext);

	useEffect(() => {
		const _data = expenses.map((expense) => ({value: expense.amount}));
		setData(_data);

	}, [expenses])

	return (
		<LineChart
			data={data}
			areaChart
			isAnimated
			width={300}
			spacing={30}
			initialSpacing={0}
			hideDataPoints
			thickness={5}
			hideRules
			hideYAxisText
			yAxisColor="#0BA5A4"
			showVerticalLines
			verticalLinesColor="rgba(14,164,164,0.5)"
			xAxisColor="#0BA5A4"
			color="#0BA5A4"
			curveType={CurveType.QUADRATIC}
			curvature={0.7}
		/>
	)
}
