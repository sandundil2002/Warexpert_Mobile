import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator, ScrollView} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchPackageDetails } from "../../store/slices/package-slice";
import { format } from "date-fns";
import {trackingStyles} from "../../styles/tracking-styles";

function PackageTracking() {
    const dispatch = useDispatch<AppDispatch>();
    const { packageDetails, loading, error } = useSelector((state: RootState) => state.package);
    const [trackingId, setTrackingNumber] = useState("");

    const handleTrackPackage = () => {
        if (!trackingId.trim()) {
            Alert.alert("Error", "Please enter a valid tracking number.");
            return;
        }
        dispatch(fetchPackageDetails(trackingId));
    };

    const formatDate = (dateString: any) => {
        if (!dateString) return "N/A";
        try {
            return format(new Date(dateString), "MMM dd, yyyy");
        } catch (error) {
            return dateString;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "available":
                return "#10b981";
            case "in transit":
                return "#3b82f6";
            case "returned":
                return "#ef4444";
            default:
                return "#6b7280";
        }
    };

    return (
        <ScrollView style={trackingStyles.scrollView}>
            <View style={trackingStyles.container}>
                {/* Input for Tracking Number */}
                <View style={trackingStyles.inputContainer}>
                    <TextInput
                        style={trackingStyles.input}
                        placeholder="Enter Tracking Number"
                        value={trackingId}
                        onChangeText={setTrackingNumber}
                        keyboardType="default"
                    />
                    <TouchableOpacity
                        style={trackingStyles.button}
                        onPress={handleTrackPackage}
                        activeOpacity={0.8}
                    >
                        <Text style={trackingStyles.buttonText}>Track</Text>
                    </TouchableOpacity>
                </View>

                {/* Loading State */}
                {loading && (
                    <View style={trackingStyles.loadingContainer}>
                        <ActivityIndicator size="large" color="#4f46e5" />
                        <Text style={trackingStyles.loadingText}>Retrieving package information...</Text>
                    </View>
                )}

                {/* Error State */}
                {error && (
                    <View style={trackingStyles.errorContainer}>
                        <Text style={trackingStyles.errorText}>Unable to find package: {error}</Text>
                        <Text style={trackingStyles.errorHint}>Please check your tracking number and try again</Text>
                    </View>
                )}

                {/* Display Package Details */}
                {packageDetails && (
                    <View style={trackingStyles.card}>
                        <View style={trackingStyles.cardHeader}>
                            <View>
                                <Text style={trackingStyles.cardTitle}>{packageDetails.name}</Text>
                                <View style={trackingStyles.statusContainer}>
                                    <View
                                        style={[
                                            trackingStyles.statusDot,
                                            { backgroundColor: getStatusColor(packageDetails.status) }
                                        ]}
                                    />
                                    <Text style={trackingStyles.statusText}>{packageDetails.status}</Text>
                                </View>
                            </View>
                            <View style={trackingStyles.idBadge}>
                                <Text style={trackingStyles.idText}>{packageDetails.id}</Text>
                            </View>
                        </View>

                        {/* If there's an image */}
                        {packageDetails.image && (
                            <View style={trackingStyles.imageContainer}>
                                <Image
                                    source={{ uri: packageDetails.image }}
                                    style={trackingStyles.image}
                                    resizeMode="cover"
                                />
                            </View>
                        )}

                        <View style={trackingStyles.divider} />

                        <View style={trackingStyles.detailsGrid}>
                            <View style={trackingStyles.detailItem}>
                                <Text style={trackingStyles.detailLabel}>Category</Text>
                                <Text style={trackingStyles.detailValue}>{packageDetails.category}</Text>
                            </View>

                            <View style={trackingStyles.detailItem}>
                                <Text style={trackingStyles.detailLabel}>Quantity</Text>
                                <Text style={trackingStyles.detailValue}>{packageDetails.quantity}</Text>
                            </View>

                            <View style={trackingStyles.detailItem}>
                                <Text style={trackingStyles.detailLabel}>Tracking #</Text>
                                <Text style={trackingStyles.detailValue}>{packageDetails.trackingNumber}</Text>
                            </View>

                            <View style={trackingStyles.detailItem}>
                                <Text style={trackingStyles.detailLabel}>Expiry</Text>
                                <Text style={trackingStyles.detailValue}>{formatDate(packageDetails.expiry)}</Text>
                            </View>

                            <View style={trackingStyles.detailItem}>
                                <Text style={trackingStyles.detailLabel}>Warehouse Name</Text>
                                <Text style={trackingStyles.detailValue}>{packageDetails.warehouseName}</Text>
                            </View>

                            <View style={trackingStyles.detailItem}>
                                <Text style={trackingStyles.detailLabel}>Location</Text>
                                <Text style={trackingStyles.detailValue}>{packageDetails.location}</Text>
                            </View>

                            <View style={trackingStyles.detailItem}>
                                <Text style={trackingStyles.detailLabel}>Customer</Text>
                                <Text style={trackingStyles.detailValue}>{packageDetails.customerName}</Text>
                            </View>

                            <View style={trackingStyles.detailItem}>
                                <Text style={trackingStyles.detailLabel}>Customer Address</Text>
                                <Text style={trackingStyles.detailValue}>{packageDetails.customerAddress}</Text>
                            </View>
                        </View>

                        <View style={trackingStyles.timelineContainer}>
                            <View style={trackingStyles.timelineHeader}>
                                <Text style={trackingStyles.timelineTitle}>Package Timeline</Text>
                            </View>

                            <View style={trackingStyles.timelineItem}>
                                <View style={trackingStyles.timelineIconContainer}>
                                    <View style={trackingStyles.timelineIcon} />
                                    <View style={trackingStyles.timelineLine} />
                                </View>
                                <View style={trackingStyles.timelineContent}>
                                    <Text style={trackingStyles.timelineEvent}>Package Created</Text>
                                    <Text style={trackingStyles.timelineDate}>
                                        {formatDate(packageDetails.createdAt)}
                                    </Text>
                                </View>
                            </View>

                            <View style={trackingStyles.timelineItem}>
                                <View style={trackingStyles.timelineIconContainer}>
                                    <View style={trackingStyles.timelineIcon} />
                                    <View style={[trackingStyles.timelineLine, trackingStyles.lastLine]} />
                                </View>
                                <View style={trackingStyles.timelineContent}>
                                    <Text style={trackingStyles.timelineEvent}>Last Updated</Text>
                                    <Text style={trackingStyles.timelineDate}>
                                        {formatDate(packageDetails.updatedAt)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

export default PackageTracking;