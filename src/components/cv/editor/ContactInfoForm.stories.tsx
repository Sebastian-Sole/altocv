import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { ContactInfo } from "@/types/cv";
import { ContactInfoForm } from "./ContactInfoForm";

const meta = {
	title: "CV/Editor/ContactInfoForm",
	component: ContactInfoForm,
	tags: ["autodocs"],
	args: {
		data: {
			fullName: "",
			email: "",
		},
		onChange: () => {},
	},
} satisfies Meta<typeof ContactInfoForm>;

export default meta;
type Story = StoryObj<typeof meta>;

function ContactInfoFormWrapper() {
	const [data, setData] = useState<ContactInfo>({
		fullName: "John Doe",
		email: "john@example.com",
		phone: "+1 234 567 890",
		location: "New York, NY",
		summary: "Experienced software engineer.",
	});
	return <ContactInfoForm data={data} onChange={setData} />;
}

export const Default: Story = {
	render: () => <ContactInfoFormWrapper />,
};
