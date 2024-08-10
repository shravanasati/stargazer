import { Loader2 } from "lucide-react";

export function Loading() {
	return (
		<div className="flex items-center justify-center h-full">
			<Loader2 className="animate-spin mr-2" /> Loading...
		</div>
	)
}