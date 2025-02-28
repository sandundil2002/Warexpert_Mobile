import {StyleSheet} from "react-native";

export const contactStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#F9FAFB",
        paddingLeft: 20,
        paddingRight: 20,
    },
    headerContainer: {
        marginBottom: 15,
        alignItems: "center",
    },
    headerTitle: {
        paddingTop: 8,
        fontSize: 20,
        fontWeight: "600",
        color: "#111827",
    },
    formContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingLeft: 24,
        paddingRight: 24,
        marginTop: 10,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        paddingBottom: 20,
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        overflow: "hidden",
    },
    textAreaWrapper: {
        alignItems: "flex-start",
    },
    inputIcon: {
        padding: 12,
        width: 42,
    },
    textAreaIcon: {
        paddingTop: 12,
    },
    input: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        color: "#1F2937",
    },
    textArea: {
        height: 120,
        textAlignVertical: "top",
    },
    buttonIcon: {
        marginRight: 8,
    },
    submitButton: {
        flexDirection: "row",
        backgroundColor: "#2563EB",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    socialContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    socialTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 20,
        textAlign: "center",
    },
    socialIcons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginHorizontal: 10,
    },
    socialButton: {
        width: 54,
        height: 54,
        borderRadius: 27,
        justifyContent: "center",
        alignItems: "center",
    },
    directContactContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        marginBottom: 80,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    directContactTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 20,
        textAlign: "center",
    },
    contactInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    contactInfoIcon: {
        width: 30,
    },
    contactInfoText: {
        fontSize: 16,
        color: "#4B5563",
    },
    socialText: {
        color: "#FFFFFF", fontWeight: "bold"
    },
});