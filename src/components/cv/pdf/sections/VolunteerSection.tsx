import { Text, View } from "@react-pdf/renderer";
import type { VolunteerWork } from "@/types/cv";
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
					{item.description && (
						<Text style={styles.itemDescription}>{item.description}</Text>
					)}
				</View>
			))}
		</View>
	);
}
