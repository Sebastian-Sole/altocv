import { SignedIn, SignedOut } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { AuthenticatedHome } from "@/components/home/AuthenticatedHome";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Header } from "@/components/layout/Header";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<SignedOut>
				<main className="flex-1">
					<Hero />
					<Features />
				</main>
				<Footer />
			</SignedOut>
			<SignedIn>
				<AuthenticatedHome />
			</SignedIn>
		</div>
	);
}
