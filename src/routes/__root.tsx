import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { TooltipProvider } from "@/components/ui/tooltip";
import { convexClient } from "@/lib/convex";
import appCss from "../styles.css?url";

interface RouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Alto CV" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
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
