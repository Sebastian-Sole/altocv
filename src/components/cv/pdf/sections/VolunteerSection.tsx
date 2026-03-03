import { Text, View } from "@react-pdf/renderer";
import type { VolunteerWork } from "@/types/cv";
import { hasContent, RichText } from "@/lib/rich-text-pdf";
import { styles } from "../styles";

export function VolunteerSection({ data }: { data: VolunteerWork[] }) {
	if (data.length === 0) return null;
	return (
		<View>
			<Text style={styles.sectionTitle}>Volunteer Work</Text>
			{data.map((item) => (
				<View key={item.id} style={styles.itemContainer}>
					<View style={styles.itemHeader}>
						<Text style={styles.itemTitle}>{item.role}</Text>
						<Text style={styles.itemDate}>
							{item.startDate} — {item.current ? "Present" : item.endDate}
						</Text>
					</View>
					<Text style={styles.itemSubtitle}>{item.organization}</Text>
					{hasContent(item.description) && (
						<RichText content={item.description!} style={styles.itemDescription} />
					)}
				</View>
			))}
		</View>
	);
}
