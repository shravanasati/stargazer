import { Loader2 } from "lucide-react";

export function Loading() {
	return (
		<div className="flex items-center justify-center h-96">
			<Loader2 className="animate-spin mr-2" size={40}/> <span className="text-3xl">Loading...</span>
		</div>
	)
}