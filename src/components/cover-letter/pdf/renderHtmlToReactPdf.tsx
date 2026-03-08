import { Link, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";

interface RenderOptions {
	baseStyle?: any;
	linkColor?: string;
}

export function renderHtmlToReactPdf(
	html: string,
	options: RenderOptions = {},
): ReactNode {
	if (!html) return null;

	// Plain text fallback
	if (!/<[a-z][\s\S]*>/i.test(html)) {
		return <Text style={options.baseStyle}>{html}</Text>;
	}

	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");

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

		if (tag === "br") {
			return <Text>{"\n"}</Text>;
		}

		if (tag === "a") {
			const href = el.getAttribute("href") ?? "";
			const children = Array.from(el.childNodes).map((child, i) => (
				<Text key={i}>{renderNode(child, nextBold, nextItalic)}</Text>
			));
			return (
				<Link
					src={href}
					style={{
						color: options.linkColor ?? "#2563eb",
						textDecoration: "underline",
					}}
				>
					{children}
				</Link>
			);
		}

		const children = Array.from(el.childNodes).map((child, i) => (
			<Text key={i}>{renderNode(child, nextBold, nextItalic)}</Text>
		));

		if (tag === "p") {
			return (
				<Text style={{ marginBottom: 6 }}>{children}</Text>
			);
		}

		if (tag === "ul" || tag === "ol") {
			return (
				<View style={{ marginLeft: 12, marginBottom: 4 }}>
					{Array.from(el.children).map((li, i) => {
						const bullet = tag === "ul" ? "•" : `${i + 1}.`;
						return (
							<View
								key={i}
								style={{ flexDirection: "row", marginBottom: 2 }}
							>
								<Text style={{ width: 14 }}>{bullet}</Text>
								<Text style={{ flex: 1 }}>
									{Array.from(li.childNodes).map((child, j) => (
										<Text key={j}>
											{renderNode(child, nextBold, nextItalic)}
										</Text>
									))}
								</Text>
							</View>
						);
					})}
				</View>
			);
		}

		return children;
	}

	const elements = Array.from(doc.body.childNodes).map((node, i) => (
		<Text key={i} style={i === 0 ? options.baseStyle : options.baseStyle}>
			{renderNode(node, false, false)}
		</Text>
	));

	return <>{elements}</>;
}
