import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ClassicPreview,
	ModernPreview,
	MinimalPreview,
	ProfessionalPreview,
	ExecutivePreview,
	CreativePreview,
	CompactPreview,
	BoldPreview,
} from "./TemplatePreviews";

interface CreateCVDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: {
		title: string;
		language: string;
		templateId: string;
	}) => void;
}

export function CreateCVDialog({
	open,
	onOpenChange,
	onSubmit,
}: CreateCVDialogProps) {
	const [title, setTitle] = useState("Untitled CV");
	const [language, setLanguage] = useState("en");
	const [templateId, setTemplateId] = useState("classic");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSubmit({
			title: title.trim() || "Untitled CV",
			language,
			templateId,
		});
	}

	function handleOpenChange(open: boolean) {
		if (!open) {
			setTitle("Untitled CV");
			setLanguage("en");
			setTemplateId("classic");
		}
		onOpenChange(open);
	}

	const previewProps = (id: string) => ({
		selected: templateId === id,
		onClick: () => setTemplateId(id),
	});

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="flex max-h-[90dvh] flex-col sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Create New CV</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className="flex min-h-0 flex-col gap-5"
				>
					{/* Template selection — horizontal scroll on mobile, 2-col grid on desktop */}
					<div className="min-h-0 space-y-2">
						<Label>Template</Label>
						<div className="overflow-y-auto overscroll-contain rounded-md border p-2 sm:max-h-none sm:border-0 sm:p-0" style={{ maxHeight: "40dvh" }}>
							<div className="grid grid-cols-2 gap-3">
								<ClassicPreview {...previewProps("classic")} />
								<ModernPreview {...previewProps("modern")} />
								<MinimalPreview {...previewProps("minimal")} />
								<ProfessionalPreview {...previewProps("professional")} />
								<ExecutivePreview {...previewProps("executive")} />
								<CreativePreview {...previewProps("creative")} />
								<CompactPreview {...previewProps("compact")} />
								<BoldPreview {...previewProps("bold")} />
							</div>
						</div>
					</div>

					{/* Title & language */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="cv-title">Title</Label>
							<Input
								id="cv-title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="My CV"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="cv-language">Language</Label>
							<Select value={language} onValueChange={setLanguage}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="en">English</SelectItem>
									<SelectItem value="es">Spanish</SelectItem>
									<SelectItem value="fr">French</SelectItem>
									<SelectItem value="de">German</SelectItem>
									<SelectItem value="pt">Portuguese</SelectItem>
									<SelectItem value="it">Italian</SelectItem>
									<SelectItem value="nl">Dutch</SelectItem>
									<SelectItem value="sv">Swedish</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<DialogFooter>
						<Button type="submit">Create CV</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
