import { useMutation } from "convex/react";
import { AlertCircle, Check, CheckCircle2, Copy, Globe, Link2Off, Loader2, Share2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "../../../convex/_generated/api";

type ToggleState = "idle" | "loading" | "success" | "error";
type CopyState = "idle" | "copied" | "error";
type LastAction = "enable" | "disable" | null;

function copyToClipboard(text: string, container: HTMLElement): void {
	const textarea = document.createElement("textarea");
	textarea.value = text;
	textarea.style.position = "fixed";
	textarea.style.left = "-9999px";
	textarea.style.top = "-9999px";
	textarea.style.fontSize = "16px";
	container.appendChild(textarea);

	textarea.focus();
	textarea.setSelectionRange(0, text.length);
	document.execCommand("copy");
	container.removeChild(textarea);
}

interface ShareDialogProps {
	id: string;
	isPublic: boolean;
	setPublicMutation: typeof api.cvs.setPublic | typeof api.coverLetters.setPublic;
	basePath: string;
	label?: string;
}

export function ShareDialog({
	id,
	isPublic,
	setPublicMutation,
	basePath,
	label = "CV",
}: ShareDialogProps) {
	const setPublic = useMutation(setPublicMutation);
	const [open, setOpen] = useState(false);
	const [copyState, setCopyState] = useState<CopyState>("idle");
	const [toggleState, setToggleState] = useState<ToggleState>("idle");
	const [lastAction, setLastAction] = useState<LastAction>(null);

	const shareUrl =
		typeof window !== "undefined"
			? `${window.location.origin}${basePath}/${id}`
			: `${basePath}/${id}`;

	useEffect(() => {
		if (!open) setToggleState("idle");
	}, [open]);

	async function handleToggle() {
		const action = isPublic ? "disable" : "enable";
		setLastAction(action);
		setToggleState("loading");
		try {
			await setPublic({ id: id as any, isPublic: !isPublic });
			setToggleState("success");
			setTimeout(() => setToggleState("idle"), 2000);
		} catch {
			setToggleState("error");
			setTimeout(() => setToggleState("idle"), 2000);
		}
	}

	function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
		try {
			const container = e.currentTarget.closest("[role='dialog']") as HTMLElement | null;
			copyToClipboard(shareUrl, container ?? document.body);
			setCopyState("copied");
			setTimeout(() => setCopyState("idle"), 2000);
		} catch {
			setCopyState("error");
			setTimeout(() => setCopyState("idle"), 2000);
		}
	}

	function EnableButton() {
		if (toggleState === "success") {
			return (
				<Button className="w-full bg-green-600 text-white hover:bg-green-600" disabled>
					<CheckCircle2 className="mr-2 h-4 w-4" />
					{lastAction === "disable" ? "Link disabled" : "Link enabled!"}
				</Button>
			);
		}
		if (toggleState === "error") {
			return (
				<Button className="w-full bg-destructive text-white hover:bg-destructive" disabled>
					<AlertCircle className="mr-2 h-4 w-4" />
					Something went wrong
				</Button>
			);
		}
		return (
			<Button
				className="w-full"
				onClick={handleToggle}
				disabled={toggleState === "loading"}
			>
				{toggleState === "loading" ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Globe className="mr-2 h-4 w-4" />
				)}
				{toggleState === "loading" ? "Enabling..." : "Enable public link"}
			</Button>
		);
	}

	function DisableButton() {
		if (toggleState === "success") {
			return (
				<Button className="w-full bg-green-600 text-white hover:bg-green-600" disabled>
					<CheckCircle2 className="mr-2 h-4 w-4" />
					Link disabled
				</Button>
			);
		}
		if (toggleState === "error") {
			return (
				<Button className="w-full bg-destructive text-white hover:bg-destructive" disabled>
					<AlertCircle className="mr-2 h-4 w-4" />
					Something went wrong
				</Button>
			);
		}
		return (
			<Button
				variant="outline"
				className="w-full text-muted-foreground"
				onClick={handleToggle}
				disabled={toggleState === "loading"}
			>
				{toggleState === "loading" ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Link2Off className="mr-2 h-4 w-4" />
				)}
				{toggleState === "loading" ? "Disabling..." : "Disable link"}
			</Button>
		);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Share2 className="h-4 w-4 sm:mr-2" />
					<span className="hidden sm:inline">Share</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
				<DialogHeader>
					<DialogTitle>Share {label}</DialogTitle>
					<DialogDescription>
						Anyone with the link can view a read-only version of your {label.toLowerCase()}.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4 py-2">
					{isPublic ? (
						<>
							<div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
								<Globe className="h-4 w-4 shrink-0 text-green-600" />
								<span className="text-sm font-medium text-green-700 dark:text-green-500">
									Public link is active
								</span>
							</div>

							<div className="flex gap-2">
								<Input
									readOnly
									tabIndex={-1}
									value={shareUrl}
									className="font-mono text-xs"
									onFocus={(e) => e.target.select()}
								/>
								<Button
									variant="outline"
									onClick={handleCopy}
									disabled={copyState !== "idle"}
									className={`shrink-0 transition-colors ${
										copyState === "copied"
											? "border-green-600 bg-green-600 text-white hover:bg-green-600"
											: copyState === "error"
												? "border-destructive bg-destructive text-white hover:bg-destructive"
												: ""
									}`}
								>
									{copyState === "copied" ? (
										<>
											<Check className="mr-1.5 h-4 w-4" />
											Copied!
										</>
									) : copyState === "error" ? (
										<>
											<X className="mr-1.5 h-4 w-4" />
											Failed
										</>
									) : (
										<>
											<Copy className="mr-1.5 h-4 w-4" />
											Copy link
										</>
									)}
								</Button>
							</div>

							<DisableButton />
						</>
					) : (
						<>
							<div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
								<Link2Off className="h-4 w-4 shrink-0 text-muted-foreground" />
								<span className="text-sm text-muted-foreground">
									Link sharing is off — only you can see this {label.toLowerCase()}
								</span>
							</div>

							<EnableButton />
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
