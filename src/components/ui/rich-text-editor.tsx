import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
	value: string;
	onChange: (html: string) => void;
	placeholder?: string;
	className?: string;
}

export function RichTextEditor({
	value,
	onChange,
	placeholder,
	className,
}: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				blockquote: false,
				bulletList: false,
				codeBlock: false,
				heading: false,
				horizontalRule: false,
				listItem: false,
				orderedList: false,
				code: false,
				hardBreak: false,
				strike: false,
			}),
			Placeholder.configure({ placeholder }),
		],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value, false);
		}
	}, [editor, value]);

	if (!editor) return null;

	return (
		<div
			className={cn(
				"rounded-md border border-input shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30",
				className,
			)}
		>
			<div className="flex gap-1 border-b border-input px-2 py-1">
				<Button
					type="button"
					variant="ghost"
					size="xs"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={cn(editor.isActive("bold") && "bg-accent")}
				>
					<span className="font-bold">B</span>
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="xs"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={cn(editor.isActive("italic") && "bg-accent")}
				>
					<span className="italic">I</span>
				</Button>
			</div>
			<EditorContent
				editor={editor}
				className="px-3 py-2 text-base md:text-sm"
			/>
		</div>
	);
}
