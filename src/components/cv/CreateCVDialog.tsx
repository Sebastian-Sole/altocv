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

interface CreateCVDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: { title: string; language: string }) => void;
}

export function CreateCVDialog({
	open,
	onOpenChange,
	onSubmit,
}: CreateCVDialogProps) {
	const [title, setTitle] = useState("Untitled CV");
	const [language, setLanguage] = useState("en");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSubmit({ title: title.trim() || "Untitled CV", language });
		setTitle("Untitled CV");
		setLanguage("en");
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New CV</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
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
					<DialogFooter>
						<Button type="submit">Create CV</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
