import { Text, View } from "@react-pdf/renderer";
import type { WorkExperience } from "@/types/cv";
import { styles } from "../styles";

export function WorkExperienceSection({ data }: { data: WorkExperience[] }) {
	if (data.length === 0) return null;
	return (
		<View>
			<Text style={styles.sectionTitle}>Work Experience</Text>
			{data.map((item) => (
				<View key={item.id} style={styles.itemContainer}>
					<View style={styles.itemHeader}>
						<Text style={styles.itemTitle}>{item.position}</Text>
						<Text style={styles.itemDate}>
							{item.startDate} — {item.current ? "Present" : item.endDate}
						</Text>
					</View>
					<Text style={styles.itemSubtitle}>
						{item.company}
						{item.location ? `, ${item.location}` : ""}
					</Text>
					{item.description && (
						<Text style={styles.itemDescription}>{item.description}</Text>
					)}
				</View>
			))}
		</View>
	);
}
