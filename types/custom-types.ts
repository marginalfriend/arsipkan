export type ResponseMessage = {
	message: string
	description: string
	toastVariant: "default" | "destructive" | null | undefined;
}