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