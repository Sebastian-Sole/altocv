import { useNavigate } from "@tanstack/react-router";
import { useAction } from "convex/react";
import { Globe, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { api } from "../../../../convex/_generated/api";

const LANGUAGES = [
	{ value: "en", label: "English" },
	{ value: "es", label: "Spanish" },
	{ value: "fr", label: "French" },
	{ value: "de", label: "German" },
	{ value: "pt", label: "Portuguese" },
	{ value: "it", label: "Italian" },
	{ value: "nl", label: "Dutch" },
	{ value: "sv", label: "Swedish" },
	{ value: "ja", label: "Japanese" },
	{ value: "zh", label: "Chinese" },
	{ value: "ko", label: "Korean" },
	{ value: "ar", label: "Arabic" },
];

interface TranslateDialogProps {
	cvId: string;
	currentLanguage: string;
}

export function TranslateDialog({
	cvId,
	currentLanguage,
}: TranslateDialogProps) {
	const [open, setOpen] = useState(false);
	const [targetLanguage, setTargetLanguage] = useState("");
	const [translating, setTranslating] = useState(false);
	const translateCV = useAction(api.translate.translateCV);
	const navigate = useNavigate();

	async function handleTranslate() {
		if (!targetLanguage) return;
		setTranslating(true);
		try {
			const newCvId = await translateCV({
				cvId: cvId as any,
				targetLanguage,
			});
			setOpen(false);
			navigate({ to: "/editor/$cvId", params: { cvId: newCvId } });
		} finally {
			setTranslating(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Globe className="h-4 w-4 sm:mr-2" />
					<span className="hidden sm:inline">Translate</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Translate CV</DialogTitle>
				</DialogHeader>
				<p className="text-sm text-muted-foreground">
					Creates a translated copy of your CV using AI. The original will not
					be modified.
				</p>
				<div className="space-y-2">
					<Label>Target Language</Label>
					<Select value={targetLanguage} onValueChange={setTargetLanguage}>
						<SelectTrigger>
							<SelectValue placeholder="Select language" />
						</SelectTrigger>
						<SelectContent>
							{LANGUAGES.filter((l) => l.value !== currentLanguage).map(
								(lang) => (
									<SelectItem key={lang.value} value={lang.value}>
										{lang.label}
									</SelectItem>
								),
							)}
						</SelectContent>
					</Select>
				</div>
				<DialogFooter>
					<Button
						onClick={handleTranslate}
						disabled={!targetLanguage || translating}
					>
						{translating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{translating ? "Translating..." : "Translate"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
