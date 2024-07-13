import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function dateFormatter(date: Date) {
	return date.toLocaleDateString('id-ID', {
		dateStyle: 'long'
	})
}

export function formatIDR(amount: number) {
	// Create a new Intl.NumberFormat object with the 'id-ID' locale and IDR currency
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0, // Set to 0 to omit decimals
		maximumFractionDigits: 0  // Set to 0 to omit decimals
	}).format(amount);
}

export function createAbbreviation(input: string) {
	// Define a regex to match and remove common prefixes (PT, PT., CV, CV.)
	const prefixRegex = /^[A-Z]{2}\.?(\s+|$)/i;

	// Remove the prefix from the input string
	const withoutPrefix = input.replace(prefixRegex, '');

	// Split the remaining string into words
	const words = withoutPrefix.split(/\s+/);

	// Create an abbreviation from the first letter of each word
	const abbreviation = words.map(word => word.charAt(0)).join('').toUpperCase();

	return abbreviation;
}

export function monthToRoman(date: Date) {
	const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
	const month = date.getMonth(); // getMonth() returns 0-11, so we need to add 1
	return romanNumerals[month];
}
