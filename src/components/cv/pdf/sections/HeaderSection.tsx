import { Text, View } from "@react-pdf/renderer";
import type { ContactInfo } from "@/types/cv";
import { hasContent, RichText } from "@/lib/rich-text-pdf";
import { styles } from "../styles";

export function HeaderSection({ data }: { data: ContactInfo }) {
	const contactItems = [
		data.email,
		data.phone,
		data.location,
		data.linkedin,
		data.website,
	].filter(Boolean);

	return (
		<View style={styles.header}>
			<Text style={styles.name}>{data.fullName || "Your Name"}</Text>
			{contactItems.length > 0 && (
				<View style={styles.contactRow}>
					{contactItems.map((item) => (
						<Text key={item} style={styles.contactItem}>
							{item}
						</Text>
					))}
				</View>
			)}
			{hasContent(data.summary) && (
				<RichText content={data.summary!} style={styles.summary} />
			)}
		</View>
	);
}
