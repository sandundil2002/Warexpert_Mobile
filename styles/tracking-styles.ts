import {StyleSheet} from "react-native";

export const trackingStyles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    container: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 80,
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 24,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        textTransform: "uppercase",
    },
    button: {
        width: 100,
        height: 50,
        backgroundColor: "#4f46e5",
        borderRadius: 8,
        marginLeft: 12,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#4f46e5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    loadingContainer: {
        alignItems: "center",
        marginVertical: 30,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#4b5563",
    },
    errorContainer: {
        backgroundColor: "#fee2e2",
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        borderLeftWidth: 4,
        borderLeftColor: "#ef4444",
    },
    errorText: {
        fontSize: 16,
        color: "#b91c1c",
        fontWeight: "600",
    },
    errorHint: {
        fontSize: 14,
        color: "#7f1d1d",
        marginTop: 4,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: "hidden",
    },
    cardHeader: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 4,
        textTransform: "capitalize",
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },
    statusText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#4b5563",
    },
    idBadge: {
        backgroundColor: "#f3f4f6",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
    idText: {
        fontSize: 12,
        color: "#6b7280",
        fontWeight: "500",
    },
    imageContainer: {
        width: "100%",
        height: 200,
        backgroundColor: "#f3f4f6",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    divider: {
        height: 1,
        backgroundColor: "#e5e7eb",
        marginHorizontal: 20,
    },
    detailsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 16,
    },
    detailItem: {
        width: "50%",
        padding: 8,
    },
    detailLabel: {
        fontSize: 12,
        color: "#6b7280",
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        color: "#111827",
        fontWeight: "500",
    },
    timelineContainer: {
        padding: 20,
    },
    timelineHeader: {
        marginBottom: 16,
    },
    timelineTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",
    },
    timelineItem: {
        flexDirection: "row",
        marginBottom: 16,
    },
    timelineIconContainer: {
        width: 24,
        alignItems: "center",
    },
    timelineIcon: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#4f46e5",
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: "#e5e7eb",
        marginTop: 4,
    },
    lastLine: {
        backgroundColor: "transparent",
    },
    timelineContent: {
        marginLeft: 12,
        flex: 1,
    },
    timelineEvent: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
    },
    timelineDate: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 2,
    },
});