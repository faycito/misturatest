export default function parseAmount(value: number){
	return `$ ${value.toFixed(2)}`;
}