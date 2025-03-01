import {StyleSheet} from "react-native";

export const paymentStyles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#007bff",
        textAlign: "center",
    },
    subheading: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        color: "#007bff",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    label: {
        fontWeight: "bold",
        marginVertical: 8,
        fontSize: 16,
    },
    itemLabel: {
        fontWeight: "bold",
        marginTop: 8,
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ced4da",
        borderRadius: 4,
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    quantityButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: "#ced4da",
        borderRadius: 4,
        padding: 8,
        marginHorizontal: 10,
        fontSize: 14,
        width: 60,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 4,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    trackingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        backgroundColor: "#e9ecef",
        padding: 10,
        borderRadius: 4,
    },
    trackingValue: {
        fontWeight: "bold",
        flex: 1,
        marginLeft: 8,
    },
    changeButton: {
        padding: 4,
        backgroundColor: "#dee2e6",
        borderRadius: 4,
    },
    changeButtonText: {
        color: "#007bff",
        fontWeight: "bold",
    },
    warningText: {
        color: "#fd7e14",
        marginBottom: 15,
    },
    itemContainer: {
        backgroundColor: "#e9ecef",
        padding: 10,
        borderRadius: 4,
        marginBottom: 15,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ced4da",
        paddingBottom: 5,
        marginBottom: 5,
    },
    removeButton: {
        backgroundColor: "#dc3545",
        padding: 4,
        borderRadius: 4,
    },
    removeButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
    },
    selectButton: {
        borderWidth: 1,
        borderColor: "#ced4da",
        borderRadius: 4,
        backgroundColor: "white",
        padding: 12,
        marginVertical: 5,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: "#007bff",
        borderRadius: 4,
        marginTop: 5,
        backgroundColor: "white",
        maxHeight: 150,
    },
    dropdown: {
        width: "100%",
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ced4da",
    },
    errorInput: {
        borderColor: "#dc3545",
    },
    priceText: {
        marginTop: 5,
        fontSize: 14,
    },
    totalContainer: {
        marginVertical: 15,
        backgroundColor: "#e9ecef",
        padding: 10,
        borderRadius: 4,
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#007bff",
    },
    addItemButton: {
        backgroundColor: "#6c757d",
        padding: 10,
        borderRadius: 4,
        alignItems: "center",
        marginBottom: 15,
    },
    addItemButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    payButton: {
        backgroundColor: "#28a745",
        padding: 15,
        borderRadius: 4,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 60,
    },
    payButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    disabledButton: {
        backgroundColor: "#6c757d",
        opacity: 0.7,
    },
    errorText: {
        color: "#dc3545",
        fontSize: 12,
        marginTop: 2,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    successText: {
        color: "#28a745",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    trackingLabel: {
        fontWeight: "bold",
        marginTop: 15,
        fontSize: 16,
    },
    trackingNumber: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 5,
    },
    linkButton: {
        marginTop: 20,
        padding: 10,
    },
    linkText: {
        color: "#007bff",
        textDecorationLine: "underline",
        fontSize: 16,
    }
});