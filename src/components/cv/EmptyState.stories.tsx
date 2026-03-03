import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "./EmptyState";

const meta = {
	title: "CV/EmptyState",
	component: EmptyState,
	tags: ["autodocs"],
	args: {
		onCreateCV: () => {},
	},
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
