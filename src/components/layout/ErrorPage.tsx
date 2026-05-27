import { Link, useRouter } from "@tanstack/react-router";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
	error: Error;
}

export function ErrorPage({ error }: ErrorPageProps) {
	const router = useRouter();

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
			<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
				<AlertTriangle className="h-8 w-8 text-destructive" />
			</div>
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
					Something went wrong
				</h1>
				<p className="mx-auto max-w-md text-sm text-muted-foreground">
					We hit an unexpected error. You can try again or head back home.
				</p>
				{import.meta.env.DEV && error?.message ? (
					<pre className="mx-auto mt-4 max-w-xl overflow-x-auto rounded-md bg-muted px-3 py-2 text-left text-xs text-muted-foreground">
						{error.message}
					</pre>
				) : null}
			</div>
			<div className="flex items-center gap-3">
				<Button
					variant="outline"
					onClick={() => {
						router.invalidate();
					}}
				>
					<RefreshCw className="mr-2 h-4 w-4" />
					Try again
				</Button>
				<Button asChild>
					<Link to="/">
						<Home className="mr-2 h-4 w-4" />
						Go home
					</Link>
				</Button>
			</div>
		</div>
	);
}
