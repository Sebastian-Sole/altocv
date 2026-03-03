import type { Meta, StoryObj } from "@storybook/react-vite";
import { CVCard } from "./CVCard";

const meta = {
	title: "CV/CVCard",
	component: CVCard,
	tags: ["autodocs"],
	args: {
		id: "1",
		title: "My Resume",
		updatedAt: Date.now(),
		language: "en",
		onDuplicate: () => {},
		onDelete: () => {},
	},
	decorators: [
		(Story) => (
			<div className="w-80">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof CVCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Spanish: Story = {
	args: { title: "Mi Currículum", language: "es" },
};
