import {StyleSheet} from "react-native";

export const notificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: "#ffffff",
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
        elevation: 2,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#111827",
    },
    listContent: {
        padding: 16,
        paddingBottom: 60,
    },
    notificationContainer: {
        marginBottom: 12,
    },
    notification: {
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconContainer: {
        marginRight: 8,
    },
    icon: {
        fontSize: 16,
    },
    type: {
        fontSize: 12,
        fontWeight: "600",
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        flex: 1,
    },
    deleteButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(0,0,0,0.05)",
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#64748b",
        lineHeight: 20,
    },
    info: {
        backgroundColor: "#e0f2fe",
        borderLeftWidth: 4,
        borderLeftColor: "#3b82f6",
    },
    success: {
        backgroundColor: "#dcfce7",
        borderLeftWidth: 4,
        borderLeftColor: "#10b981",
    },
    error: {
        backgroundColor: "#fee2e2",
        borderLeftWidth: 4,
        borderLeftColor: "#ef4444",
    },
    message: {
        fontSize: 15,
        color: "#1f2937",
        lineHeight: 22,
    },
    timestamp: {
        fontSize: 12,
        color: "#64748b",
        marginTop: 8,
        textAlign: "right",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: "#6b7280",
        textAlign: "center",
        marginBottom: 24,
    },
    refreshButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "#4f46e5",
        borderRadius: 8,
    },
    refreshButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "600",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f9fafb",
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#6b7280",
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: "#f9fafb",
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#b91c1c",
        marginBottom: 8,
    },
    errorMessage: {
        fontSize: 16,
        color: "#6b7280",
        textAlign: "center",
        marginBottom: 24,
    },
    retryButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "#4f46e5",
        borderRadius: 8,
    },
    retryButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "600",
    },
});
