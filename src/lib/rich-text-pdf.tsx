import { Text } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import type { ReactNode } from "react";

export function hasContent(html: string | undefined): boolean {
	if (!html) return false;
	const stripped = html.replace(/<[^>]*>/g, "").trim();
	return stripped.length > 0;
}

interface RichTextProps {
	content: string;
	style?: Style;
}

export function RichText({ content, style }: RichTextProps) {
	if (!content) return null;

	// Plain text (no HTML tags) — backward compatibility
	if (!/<[a-z][\s\S]*>/i.test(content)) {
		return <Text style={style}>{content}</Text>;
	}

	const parser = new DOMParser();
	const doc = parser.parseFromString(content, "text/html");

	function renderNode(
		node: Node,
		bold: boolean,
		italic: boolean,
	): ReactNode {
		if (node.nodeType === Node.TEXT_NODE) {
			const text = node.textContent;
			if (!text) return null;

			let fontFamily: string | undefined;
			if (bold && italic) fontFamily = "Helvetica-BoldOblique";
			else if (bold) fontFamily = "Helvetica-Bold";
			else if (italic) fontFamily = "Helvetica-Oblique";

			if (fontFamily) {
				return <Text style={{ fontFamily }}>{text}</Text>;
			}
			return text;
		}

		if (node.nodeType !== Node.ELEMENT_NODE) return null;

		const el = node as Element;
		const tag = el.tagName.toLowerCase();

		const nextBold = bold || tag === "strong" || tag === "b";
		const nextItalic = italic || tag === "em" || tag === "i";

		const children = Array.from(el.childNodes).map((child, i) => (
			<Text key={i}>{renderNode(child, nextBold, nextItalic)}</Text>
		));

		if (tag === "p") {
			return <Text>{children}</Text>;
		}

		return children;
	}

	const paragraphs = Array.from(doc.body.childNodes).map((node, i) => (
		<Text key={i} style={i === 0 ? style : style}>
			{renderNode(node, false, false)}
		</Text>
	));

	return <>{paragraphs}</>;
}
