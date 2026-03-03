import { Text, View } from "@react-pdf/renderer";
import type { Certificate } from "@/types/cv";
import { styles } from "../styles";

export function CertificatesSection({ data }: { data: Certificate[] }) {
	if (data.length === 0) return null;
	return (
		<View>
			<Text style={styles.sectionTitle}>Certificates</Text>
			{data.map((item) => (
				<View key={item.id} style={styles.itemContainer}>
					<View style={styles.itemHeader}>
						<Text style={styles.itemTitle}>{item.name}</Text>
						{item.date && <Text style={styles.itemDate}>{item.date}</Text>}
					</View>
					<Text style={styles.itemSubtitle}>{item.issuer}</Text>
				</View>
			))}
		</View>
	);
}
