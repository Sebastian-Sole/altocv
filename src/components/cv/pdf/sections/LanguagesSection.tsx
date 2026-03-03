import { Text, View } from "@react-pdf/renderer";
import type { Language } from "@/types/cv";
import { styles } from "../styles";

export function LanguagesSection({ data }: { data: Language[] }) {
	if (data.length === 0) return null;
	return (
		<View>
			<Text style={styles.sectionTitle}>Languages</Text>
			<View style={styles.skillsRow}>
				{data.map((item) => (
					<Text key={item.id} style={styles.skillBadge}>
						{item.name} — {item.proficiency}
					</Text>
				))}
			</View>
		</View>
	);
}
