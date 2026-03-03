import { Text, View } from "@react-pdf/renderer";
import { styles } from "../styles";

export function InterestsSection({ data }: { data: string[] }) {
	if (data.length === 0) return null;
	return (
		<View>
			<Text style={styles.sectionTitle}>Interests</Text>
			<View style={styles.skillsRow}>
				{data.map((interest) => (
					<Text key={interest} style={styles.interestBadge}>
						{interest}
					</Text>
				))}
			</View>
		</View>
	);
}
