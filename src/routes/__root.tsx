import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ErrorPage } from "@/components/layout/ErrorPage";
import { NotFound } from "@/components/layout/NotFound";
import { TooltipProvider } from "@/components/ui/tooltip";
import { convexClient } from "@/lib/convex";
import appCss from "../styles.css?url";

interface RouterContext {
	queryClient: QueryClient;
}

const SITE_NAME = "Alto CV";
const SITE_DESCRIPTION =
	"Alto CV — a modern CV and cover letter builder. Build ATS-friendly resumes with real-time preview and instant PDF export.";

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: SITE_NAME },
			{ name: "description", content: SITE_DESCRIPTION },
			{ name: "robots", content: "index, follow" },
			// Open Graph
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: SITE_NAME },
			{ property: "og:description", content: SITE_DESCRIPTION },
			// Twitter
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: SITE_NAME },
			{ name: "twitter:description", content: SITE_DESCRIPTION },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
	notFoundComponent: NotFound,
	errorComponent: ({ error }) => <ErrorPage error={error} />,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ClerkProvider>
					<ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
						<TooltipProvider>
							{children}
						</TooltipProvider>
					</ConvexProviderWithClerk>
				</ClerkProvider>
				<Scripts />
			</body>
		</html>
	);
}
