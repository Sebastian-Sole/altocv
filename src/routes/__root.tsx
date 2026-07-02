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
const SITE_TITLE = "Alto CV — Your career, beautifully composed";
const SITE_DESCRIPTION =
	"Alto CV turns your experience into a document worth reading. Craft a considered, ATS-friendly CV and cover letter with real-time preview, elegant templates, and one-click PDF export.";

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: SITE_TITLE },
			{ name: "description", content: SITE_DESCRIPTION },
			{ name: "robots", content: "index, follow" },
			{ name: "theme-color", content: "#e2613e" },
			// Open Graph
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:type", content: "website" },
			{ property: "og:title", content: SITE_TITLE },
			{ property: "og:description", content: SITE_DESCRIPTION },
			{ property: "og:image", content: "/og.png" },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ property: "og:image:alt", content: "Alto CV — Your career, beautifully composed" },
			// Twitter
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: SITE_TITLE },
			{ name: "twitter:description", content: SITE_DESCRIPTION },
			{ name: "twitter:image", content: "/og.png" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "preconnect", href: "https://fonts.googleapis.com" },
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
			},
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
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
