import React, { useEffect, useState } from "react";
import {Alert, View, Text, ActivityIndicator, TextInput, TouchableOpacity, ScrollView,} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {setPaymentComplete, resetPaymentState, CATEGORY_PRICES, createPaymentIntent} from "../../store/slices/payment-slice";
import { fetchPackageDetails } from "../../store/slices/package-slice";
import { paymentStyles } from "../../styles/payment-styles";

interface Inventory {
    id: string;
    name: string;
    category: string;
    customerId: string;
    quantity: number;
    status?: string;
}

const Payment = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, paymentComplete } = useSelector(
        (state: RootState) => state.payment
    );

    const packageState = useSelector((state: RootState) => state.package);
    const inventory: Inventory[] = Array.isArray(packageState?.packageDetails)
        ? packageState?.packageDetails
        : packageState?.packageDetails
            ? [packageState?.packageDetails]
            : [];
    const packageLoading = packageState?.loading || false;
    const packageError = packageState?.error || null;

    const [trackingNumber, setTrackingNumber] = useState("");
    const [trackingSubmitted, setTrackingSubmitted] = useState(false);
    const [inventoryItems, setInventoryItems] = useState<
        { inventoryItemId: string; quantity: number }[]
    >([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [filteredInventory, setFilteredInventory] = useState<Inventory[]>([]);
    const [selectingItem, setSelectingItem] = useState<number | null>(null);

    useEffect(() => {
        if (trackingSubmitted && trackingNumber) {
            dispatch(fetchPackageDetails(trackingNumber));
        }
    }, [dispatch, trackingSubmitted, trackingNumber]);

    const calculateTotalAmount = () => {
        let total = 0;
        inventoryItems.forEach((item) => {
            const selectedItem = inventory.find(
                (inv) => inv.id === item.inventoryItemId
            );
            if (selectedItem) {
                const pricePerUnit = CATEGORY_PRICES[selectedItem.category] || 0;
                total += pricePerUnit * item.quantity;
            }
        });
        setTotalAmount(total);
    };

    useEffect(() => {
        calculateTotalAmount();
    }, [inventoryItems, inventory]);

    useEffect(() => {
        if (!trackingSubmitted || !inventory.length) {
            setFilteredInventory([]);
            return;
        }

        const availableItems = inventory.filter((item) => item.quantity > 0);
        if (JSON.stringify(filteredInventory) !== JSON.stringify(availableItems)) {
            setFilteredInventory(availableItems);
        }
    }, [trackingSubmitted, inventory.length]);

    const handleTrackingSubmit = () => {
        if (!trackingNumber.trim()) {
            Alert.alert("Error", "Please enter a valid tracking number");
            return;
        }
        dispatch(resetPaymentState());
        setTrackingSubmitted(true);
        setInventoryItems([]);
    };

    const handleChangeTracking = () => {
        setTrackingSubmitted(false);
        setTrackingNumber("");
        setInventoryItems([]);
        dispatch(resetPaymentState());
    };

    const handleAddItem = () => {
        const defaultItemId =
            filteredInventory.length > 0 ? filteredInventory[0].id : "";
        setInventoryItems([
            ...inventoryItems,
            { inventoryItemId: defaultItemId, quantity: 1 },
        ]);
    };

    const handleItemChange = (
        index: number,
        field: string,
        value: string | number
    ) => {
        const updatedItems = [...inventoryItems];
        if (field === "inventoryItemId") {
            updatedItems[index].inventoryItemId = value as string;
        } else if (field === "quantity") {
            const numValue = Number(value);
            updatedItems[index].quantity = numValue > 0 ? numValue : 1;
        }
        setInventoryItems(updatedItems);
    };

    const removeItem = (index: number) => {
        const updatedItems = [...inventoryItems];
        updatedItems.splice(index, 1);
        setInventoryItems(updatedItems);
    };

    const hasInsufficientQuantity = (
        inventoryItemId: string,
        requestedQuantity: number
    ) => {
        const item = inventory.find((inv) => inv.id === inventoryItemId);
        return item && item.quantity < requestedQuantity;
    };

    const handlePayment = async () => {
        try {
            if (!trackingNumber || inventoryItems.length === 0) {
                Alert.alert("Error", "Missing required payment information");
                return;
            }

            const invalidItems = inventoryItems.filter(
                (item) =>
                    !item.inventoryItemId ||
                    hasInsufficientQuantity(item.inventoryItemId, item.quantity)
            );

            if (invalidItems.length > 0) {
                Alert.alert(
                    "Error",
                    "Please check your selections. Some items have invalid quantities."
                );
                return;
            }

            const customerId = inventory.length > 0 ? inventory[0].customerId : null;

            if (!customerId) {
                Alert.alert(
                    "Error",
                    "Customer ID is missing. Please ensure the package details include a customer ID."
                );
                return;
            }

            const result = await dispatch(
                createPaymentIntent({
                    customerId,
                    inventoryItems,
                    totalAmount,
                })
            ).unwrap();

            if (result && result.status === "SUCCESS") {
                dispatch(setPaymentComplete(true));
                Alert.alert(
                    "Payment Successful",
                    `Your payment for tracking number ${trackingNumber} was successful!`,
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                setTrackingNumber("");
                                setInventoryItems([]);
                                setTotalAmount(0);
                                setTrackingSubmitted(false);
                            },
                        },
                    ]
                );
            }
        } catch (err) {
            console.error("Error processing payment:", err);
            Alert.alert(
                "Payment Error",
                "There was a problem processing your payment. Please try again."
            );
        }
    };

    if (!trackingSubmitted) {
        return (
            <View style={paymentStyles.container}>
                <View style={paymentStyles.inputContainer}>
                    <TextInput
                        style={paymentStyles.input}
                        value={trackingNumber}
                        onChangeText={setTrackingNumber}
                        placeholder="Enter Your Tracking Number"
                        autoCapitalize="characters"
                    />
                    <TouchableOpacity
                        style={paymentStyles.button}
                        onPress={handleTrackingSubmit}
                    >
                        <Text style={paymentStyles.buttonText}>
                            Continue to Payment
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if ((packageLoading || loading) && (!inventory || !inventory.length)) {
        return (
            <View style={paymentStyles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={paymentStyles.loadingText}>
                    Loading inventory details...
                </Text>
            </View>
        );
    }

    if (packageError || error) {
        return (
            <View style={paymentStyles.container}>
                <Text style={paymentStyles.errorText}>
                    Error: {packageError || error}
                </Text>
                <TouchableOpacity
                    style={paymentStyles.button}
                    onPress={handleChangeTracking}
                >
                    <Text style={paymentStyles.buttonText}>
                        Try Different Tracking Number
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (paymentComplete) {
        return (
            <View style={paymentStyles.container}>
                <Text style={paymentStyles.successText}>Payment Complete!</Text>
                <Text>Your inventory payment is now processed.</Text>
                <Text style={paymentStyles.trackingLabel}>Tracking Number:</Text>
                <Text style={paymentStyles.trackingNumber}>
                    {trackingNumber}
                </Text>
                <TouchableOpacity
                    style={paymentStyles.linkButton}
                    onPress={handleChangeTracking}
                >
                    <Text style={paymentStyles.linkText}>Make Another Payment</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={paymentStyles.scrollView}>
            <View style={paymentStyles.container}>
                <View style={paymentStyles.trackingRow}>
                    <Text style={paymentStyles.label}>Tracking Number:</Text>
                    <Text style={paymentStyles.trackingValue}>
                        {trackingNumber}
                    </Text>
                    <TouchableOpacity
                        onPress={handleChangeTracking}
                        style={paymentStyles.changeButton}
                    >
                        <Text style={paymentStyles.changeButtonText}>Change</Text>
                    </TouchableOpacity>
                </View>

                <Text style={paymentStyles.subheading}>Inventory Items</Text>

                {filteredInventory.length === 0 && (
                    <Text style={paymentStyles.warningText}>
                        No available inventory items for this tracking number.
                    </Text>
                )}

                {inventoryItems.map((item, index) => {
                    const selectedItem = inventory.find(
                        (inv: any) => inv.id === item.inventoryItemId
                    );
                    const pricePerUnit = selectedItem
                        ? CATEGORY_PRICES[selectedItem.category] || 0
                        : 0;
                    const maxAvailable = selectedItem ? selectedItem.quantity : 0;
                    const isInsufficient = hasInsufficientQuantity(
                        item.inventoryItemId,
                        item.quantity
                    );

                    return (
                        <View key={index} style={paymentStyles.itemContainer}>
                            <View style={paymentStyles.itemHeader}>
                                <Text style={paymentStyles.itemLabel}>
                                    Item #{index + 1}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => removeItem(index)}
                                    style={paymentStyles.removeButton}
                                >
                                    <Text style={paymentStyles.removeButtonText}>
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={paymentStyles.itemLabel}>Select Item:</Text>
                            <TouchableOpacity
                                style={paymentStyles.selectButton}
                                onPress={() => setSelectingItem(index)}
                            >
                                <Text>
                                    {selectedItem
                                        ? `${selectedItem.name} (${selectedItem.category}) - Available: ${selectedItem.quantity}`
                                        : "Select an item"}
                                </Text>
                            </TouchableOpacity>

                            {selectingItem === index && (
                                <View style={paymentStyles.dropdownContainer}>
                                    <ScrollView
                                        style={paymentStyles.dropdown}
                                        nestedScrollEnabled={true}
                                    >
                                        {filteredInventory.map((invItem) => (
                                            <TouchableOpacity
                                                key={invItem.id}
                                                style={paymentStyles.dropdownItem}
                                                onPress={() => {
                                                    handleItemChange(
                                                        index,
                                                        "inventoryItemId",
                                                        invItem.id
                                                    );
                                                    setSelectingItem(null);
                                                }}
                                            >
                                                <Text>
                                                    {invItem.name} ({invItem.category}) -
                                                    Available: {invItem.quantity}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            <Text style={paymentStyles.itemLabel}>Quantity:</Text>
                            <View style={paymentStyles.quantityContainer}>
                                <TouchableOpacity
                                    style={paymentStyles.quantityButton}
                                    onPress={() => {
                                        if (item.quantity > 1) {
                                            handleItemChange(
                                                index,
                                                "quantity",
                                                item.quantity - 1
                                            );
                                        }
                                    }}
                                >
                                    <Text style={paymentStyles.quantityButtonText}>
                                        -
                                    </Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={[
                                        paymentStyles.quantityInput,
                                        isInsufficient ? paymentStyles.errorInput : null,
                                    ]}
                                    value={item.quantity.toString()}
                                    onChangeText={(value) => {
                                        const numValue = parseInt(value);
                                        if (!isNaN(numValue)) {
                                            handleItemChange(index, "quantity", numValue);
                                        } else if (value === "") {
                                            handleItemChange(index, "quantity", 1);
                                        }
                                    }}
                                    keyboardType="numeric"
                                />

                                <TouchableOpacity
                                    style={paymentStyles.quantityButton}
                                    onPress={() => {
                                        if (
                                            !maxAvailable ||
                                            item.quantity < maxAvailable
                                        ) {
                                            handleItemChange(
                                                index,
                                                "quantity",
                                                item.quantity + 1
                                            );
                                        }
                                    }}
                                >
                                    <Text style={paymentStyles.quantityButtonText}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {isInsufficient && (
                                <Text style={paymentStyles.errorText}>
                                    Insufficient quantity available
                                </Text>
                            )}

                            <Text
                                style={[
                                    paymentStyles.priceText,
                                    isInsufficient ? paymentStyles.errorText : null,
                                ]}
                            >
                                Price per unit: ${pricePerUnit.toFixed(2)} | Subtotal: $
                                {(pricePerUnit * item.quantity).toFixed(2)}
                                {maxAvailable > 0 && ` | Available: ${maxAvailable}`}
                            </Text>
                        </View>
                    );
                })}

                {filteredInventory.length > 0 && (
                    <TouchableOpacity
                        style={paymentStyles.addItemButton}
                        onPress={handleAddItem}
                    >
                        <Text style={paymentStyles.addItemButtonText}>Add Item</Text>
                    </TouchableOpacity>
                )}

                <View style={paymentStyles.totalContainer}>
                    <Text style={paymentStyles.label}>Total Amount:</Text>
                    <Text style={paymentStyles.totalAmount}>
                        ${totalAmount.toFixed(2)}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        paymentStyles.payButton,
                        loading ||
                        inventoryItems.length === 0 ||
                        inventoryItems.some(
                            (item) =>
                                !item.inventoryItemId ||
                                hasInsufficientQuantity(
                                    item.inventoryItemId,
                                    item.quantity
                                )
                        )
                            ? paymentStyles.disabledButton
                            : null,
                    ]}
                    disabled={
                        loading ||
                        inventoryItems.length === 0 ||
                        inventoryItems.some(
                            (item) =>
                                !item.inventoryItemId ||
                                hasInsufficientQuantity(
                                    item.inventoryItemId,
                                    item.quantity
                                )
                        )
                    }
                    onPress={handlePayment}
                >
                    <Text style={paymentStyles.payButtonText}>
                        {loading ? "Processing..." : "Complete Payment"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Payment;