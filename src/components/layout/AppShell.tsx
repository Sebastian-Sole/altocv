import { Outlet } from "@tanstack/react-router";
import { Header } from "./Header";

export function AppShell() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
		</div>
	);
}
