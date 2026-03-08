import { useQuery } from "convex/react";
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
	ClassicLetterPreview,
	ModernLetterPreview,
	FormalLetterPreview,
	MinimalLetterPreview,
} from "./CoverLetterTemplatePreviews";
import { api } from "../../../convex/_generated/api";

interface CreateCoverLetterDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: {
		title: string;
		language: string;
		templateId: string;
		linkedCvId?: string;
	}) => void;
}

export function CreateCoverLetterDialog({
	open,
	onOpenChange,
	onSubmit,
}: CreateCoverLetterDialogProps) {
	const [title, setTitle] = useState("Untitled Cover Letter");
	const [language, setLanguage] = useState("en");
	const [templateId, setTemplateId] = useState("classic-letter");
	const [linkedCvId, setLinkedCvId] = useState<string>("none");

	const cvs = useQuery(api.cvs.list);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSubmit({
			title: title.trim() || "Untitled Cover Letter",
			language,
			templateId,
			linkedCvId: linkedCvId === "none" ? undefined : linkedCvId,
		});
	}

	function handleOpenChange(open: boolean) {
		if (!open) {
			setTitle("Untitled Cover Letter");
			setLanguage("en");
			setTemplateId("classic-letter");
			setLinkedCvId("none");
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
					<DialogTitle>Create New Cover Letter</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={handleSubmit}
					className="flex min-h-0 flex-col"
				>
					<div className="overflow-y-auto space-y-5 p-1">
						<div className="space-y-2">
							<Label>Template</Label>
							<div className="grid grid-cols-2 gap-3">
								<ClassicLetterPreview
									{...previewProps("classic-letter")}
								/>
								<ModernLetterPreview
									{...previewProps("modern-letter")}
								/>
								<FormalLetterPreview
									{...previewProps("formal-letter")}
								/>
								<MinimalLetterPreview
									{...previewProps("minimal-letter")}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="cl-title">Title</Label>
								<Input
									id="cl-title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder="My Cover Letter"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="cl-language">Language</Label>
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

						<div className="space-y-2">
							<Label htmlFor="cl-linked-cv">
								Link to CV (optional)
							</Label>
							<Select value={linkedCvId} onValueChange={setLinkedCvId}>
								<SelectTrigger>
									<SelectValue placeholder="Select a CV..." />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="none">
										No linked CV
									</SelectItem>
									{cvs?.map((cv) => (
										<SelectItem key={cv._id} value={cv._id}>
											{cv.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<p className="text-xs text-muted-foreground">
								Contact info will be copied from the selected CV.
							</p>
						</div>
					</div>

					<DialogFooter className="pt-5">
						<Button type="submit">Create Cover Letter</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
