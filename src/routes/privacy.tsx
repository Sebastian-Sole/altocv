import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/layout/Header";

const LAST_UPDATED = "Last updated: 2026-05-27";

export const Route = createFileRoute("/privacy")({
	head: () => ({
		meta: [
			{ title: "Privacy Policy — Alto CV" },
			{
				name: "description",
				content:
					"Privacy Policy for Alto CV, the modern CV and cover letter builder.",
			},
		],
	}),
	component: PrivacyPage,
});

function PrivacyPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
				<article className="mx-auto max-w-3xl space-y-6">
					<header className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
							Privacy Policy
						</h1>
						<p className="text-sm text-muted-foreground">{LAST_UPDATED}</p>
					</header>

					<div className="rounded-md border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
						This is a template — review with legal counsel before relying on it.
					</div>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">1. Data We Collect</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							When you sign up, our authentication provider (Clerk) collects
							your email address and, optionally, profile information. Content
							you create — CVs, cover letters, and related metadata — is stored
							in our database (Convex). If you choose to translate content
							using AI, the relevant text is sent to Anthropic to perform the
							translation.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">2. Cookies</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							We use cookies and similar technologies that are strictly
							necessary for authentication and session management. We do not
							use advertising or cross-site tracking cookies.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">3. Third-Party Services</h2>
						<ul className="space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground [list-style:disc]">
							<li>
								<span className="font-medium text-foreground">Clerk</span> —
								authentication and account management.
							</li>
							<li>
								<span className="font-medium text-foreground">Convex</span> —
								database and backend hosting for your content.
							</li>
							<li>
								<span className="font-medium text-foreground">Anthropic</span>{" "}
								— optional AI translation of content you submit.
							</li>
						</ul>
						<p className="text-sm leading-relaxed text-muted-foreground">
							Each provider processes data under its own privacy policy.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">4. Your Rights</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							You may access, update, or delete your account and content at any
							time from the app. Depending on your jurisdiction, you may have
							additional rights such as the right to portability or to object
							to certain processing. Contact us to exercise these rights.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">5. Data Retention</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							We retain your content for as long as your account is active. If
							you delete a document or your account, the associated content is
							removed from our active systems within a reasonable period.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">6. Changes</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							We may update this Privacy Policy from time to time. Material
							changes will be communicated through the Service.
						</p>
					</section>

					<section className="space-y-3">
						<h2 className="text-xl font-semibold">7. Contact</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							Privacy questions? Email{" "}
							<a
								href="mailto:privacy@altocv.app"
								className="font-medium text-foreground underline-offset-4 hover:underline"
							>
								privacy@altocv.app
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
