import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { convexClient } from "./lib/convex";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const convexQueryClient = new ConvexQueryClient(convexClient);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	});
	convexQueryClient.connect(queryClient);

	const router = routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			scrollRestoration: true,
			defaultPreload: "intent",
			context: { queryClient },
		}),
		queryClient,
	);

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
