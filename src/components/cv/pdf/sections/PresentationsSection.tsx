import { Text, View } from "@react-pdf/renderer";
import type { Presentation } from "@/types/cv";
import { styles } from "../styles";

export function PresentationsSection({ data }: { data: Presentation[] }) {
	if (data.length === 0) return null;
	return (
		<View>
			<Text style={styles.sectionTitle}>Presentations</Text>
			{data.map((item) => (
				<View key={item.id} style={styles.itemContainer}>
					<View style={styles.itemHeader}>
						<Text style={styles.itemTitle}>{item.title}</Text>
						{item.date && <Text style={styles.itemDate}>{item.date}</Text>}
					</View>
					<Text style={styles.itemSubtitle}>{item.event}</Text>
					{item.description && (
						<Text style={styles.itemDescription}>{item.description}</Text>
					)}
				</View>
			))}
		</View>
	);
}
