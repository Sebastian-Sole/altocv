import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 10,
		fontFamily: "Helvetica",
		color: "#333",
	},
	header: {
		marginBottom: 20,
		borderBottom: "2px solid #333",
		paddingBottom: 10,
	},
	name: {
		fontSize: 24,
		fontFamily: "Helvetica-Bold",
		marginBottom: 4,
	},
	contactRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		fontSize: 9,
		color: "#666",
	},
	contactItem: {
		marginRight: 12,
	},
	summary: {
		fontSize: 10,
		marginTop: 8,
		lineHeight: 1.5,
		color: "#555",
	},
	sectionTitle: {
		fontSize: 13,
		fontFamily: "Helvetica-Bold",
		marginTop: 16,
		marginBottom: 8,
		borderBottom: "1px solid #ccc",
		paddingBottom: 4,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 2,
	},
	itemTitle: {
		fontSize: 11,
		fontFamily: "Helvetica-Bold",
	},
	itemSubtitle: {
		fontSize: 10,
		color: "#555",
		marginBottom: 2,
	},
	itemDate: {
		fontSize: 9,
		color: "#777",
	},
	itemDescription: {
		fontSize: 9.5,
		lineHeight: 1.5,
		marginTop: 2,
		color: "#444",
	},
	itemContainer: {
		marginBottom: 10,
	},
	skillsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 4,
	},
	skillBadge: {
		fontSize: 9,
		backgroundColor: "#f0f0f0",
		padding: "3 8",
		borderRadius: 3,
	},
	interestBadge: {
		fontSize: 9,
		backgroundColor: "#f5f5f5",
		padding: "3 8",
		borderRadius: 3,
	},
});
