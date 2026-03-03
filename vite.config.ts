import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		allowedHosts: ["sole-kno"],
	},
	optimizeDeps: {
		include: [
			"use-sync-external-store/shim",
			"use-sync-external-store/shim/index.js",
			"use-sync-external-store/shim/with-selector",
			"swr",
			"swr/infinite",
		],
	},
	ssr: {
		noExternal: ["use-sync-external-store"],
	},
	plugins: [
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
});
