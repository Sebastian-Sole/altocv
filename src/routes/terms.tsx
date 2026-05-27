import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/layout/Header";

const LAST_UPDATED = "Last updated: 2026-05-27";

export const Route = createFileRoute("/terms")({
	head: () => ({
		meta: [
			{ title: "Terms of Service — Alto CV" },
			{
				name: "description",
				content:
					"Terms of Service for Alto CV, the modern CV and cover letter builder.",
			},
		],
	}),
	component: TermsPage,
});

function TermsPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<article className="mx-auto max-w-3xl space-y-6">
					<header className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
							Terms of Service
						</h1>
						<p className="text-sm text-muted-foreground">{LAST_UPDATED}</p>
					</header>

					<div className="rounded-md border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
						This is a template — review with legal counsel before relying on it.
					</div>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							By accessing or using Alto CV (the "Service"), you agree to be
							bound by these Terms of Service. If you do not agree, do not use
							the Service.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">2. Use of the Service</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							Alto CV provides tools to build, edit, and export CVs and cover
							letters. You agree to use the Service only for lawful purposes
							and in a manner that does not infringe the rights of others or
							restrict their use and enjoyment of the Service.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">3. Accounts</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							To use most features you must create an account via our
							authentication provider. You are responsible for maintaining the
							confidentiality of your credentials and for all activity that
							occurs under your account.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">4. Content Ownership</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							You retain all rights to the content you create using the
							Service, including the text of your CVs and cover letters. You
							grant Alto CV a limited licence to store, process, and display
							that content as required to operate the Service for you.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">5. Termination</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							You may stop using the Service at any time. We may suspend or
							terminate accounts that violate these Terms or that we reasonably
							believe pose a risk to the Service or to other users.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">6. Disclaimer & Liability</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							The Service is provided "as is" without warranties of any kind.
							To the maximum extent permitted by law, Alto CV is not liable for
							any indirect, incidental, special, or consequential damages
							arising out of or related to your use of the Service.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">7. Changes</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							We may update these Terms from time to time. Continued use of the
							Service after changes take effect constitutes acceptance of the
							revised Terms.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">8. Contact</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							Questions about these Terms? Reach out to{" "}
							<a
								href="mailto:hello@altocv.app"
								className="font-medium text-foreground underline-offset-4 hover:underline"
							>
								hello@altocv.app
							</a>
							.
						</p>
					</section>
				</article>
			</main>
			<Footer />
		</div>
	);
}
