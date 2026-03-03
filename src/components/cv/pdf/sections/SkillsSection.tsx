import { Text, View } from "@react-pdf/renderer";
import type { Skill } from "@/types/cv";
import { styles } from "../styles";

export function SkillsSection({ data }: { data: Skill[] }) {
	if (data.length === 0) return null;
	return (
		<View>
			<Text style={styles.sectionTitle}>Skills</Text>
			<View style={styles.skillsRow}>
				{data.map((item) => (
					<Text key={item.id} style={styles.skillBadge}>
						{item.name}
						{item.level ? ` (${item.level})` : ""}
					</Text>
				))}
			</View>
		</View>
	);
}
