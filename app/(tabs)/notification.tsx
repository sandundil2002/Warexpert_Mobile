import React, { useEffect, useState } from "react";
import {View, Text, FlatList, ActivityIndicator, TouchableOpacity, Animated, Dimensions, StatusBar} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {fetchNotifications, removeNotification} from "../../store/slices/notification-slice";
import { AppDispatch, RootState } from "../../store/store";
import {notificationStyles} from "../../styles/notification-styles";

const { width } = Dimensions.get("window");

function Notification() {
    const dispatch = useDispatch<AppDispatch>();
    const { notifications, loading, error } = useSelector((state: RootState) => state.notification);
    const [refreshing, setRefreshing] = useState(false);

    const [animatedValues] = useState(() =>
        notifications.map(() => new Animated.Value(0))
    );

    useEffect(() => {
        loadNotifications();
    }, [dispatch]);

    useEffect(() => {
        animatedValues.length = 0;
        notifications.forEach(() => {
            animatedValues.push(new Animated.Value(0));
        });
    }, [notifications.length]);

    const loadNotifications = async () => {
        try {
            await dispatch(fetchNotifications());
        } catch (error) {
            console.error("Failed to load notifications:", error);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadNotifications();
        setRefreshing(false);
    };

    const handleDeleteNotification = (id: string, index: number) => {
        Animated.timing(animatedValues[index], {
            toValue: -width,
            duration: 350,
            useNativeDriver: false
        }).start(() => {
            dispatch(removeNotification(id));
        });
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "info":
                return "ℹ️";
            case "success":
                return "✅";
            case "error":
                return "❌";
            default:
                return "📢";
        }
    };

    if (loading && !refreshing) {
        return (
            <View style={notificationStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#4f46e5" />
                <Text style={notificationStyles.loadingText}>Loading notifications...</Text>
            </View>
        );
    }

    if (error && !refreshing) {
        return (
            <View style={notificationStyles.errorContainer}>
                <Text style={notificationStyles.errorTitle}>Something went wrong</Text>
                <Text style={notificationStyles.errorMessage}>{error}</Text>
                <TouchableOpacity
                    style={notificationStyles.retryButton}
                    onPress={loadNotifications}
                >
                    <Text style={notificationStyles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const renderNotificationItem = ({ item, index }: {item:any, index: number}) => {
        const translateX = animatedValues[index] || new Animated.Value(0);

        return (
            <Animated.View
                style={[
                    notificationStyles.notificationContainer,
                    { transform: [{ translateX }] }
                ]}
            >
                <View
                    style={[
                        notificationStyles.notification,
                        item.type === "info"
                            ? notificationStyles.info
                            : item.type === "success"
                                ? notificationStyles.success
                                : notificationStyles.error,
                    ]}
                >
                    <View style={notificationStyles.notificationHeader}>
                        <View style={notificationStyles.iconContainer}>
                            <Text style={notificationStyles.icon}>{getNotificationIcon(item.type)}</Text>
                        </View>
                        <Text style={notificationStyles.type}>{item.type.toUpperCase()}</Text>
                        <TouchableOpacity
                            style={notificationStyles.deleteButton}
                            onPress={() => handleDeleteNotification(item.id, index)}
                        >
                            <Text style={notificationStyles.deleteButtonText}>×</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={notificationStyles.message}>{item.message}</Text>
                    {item.timestamp && (
                        <Text style={notificationStyles.timestamp}>
                            {new Date(item.timestamp).toLocaleString()}
                        </Text>
                    )}
                </View>
            </Animated.View>
        );
    };

    return (
        <View style={notificationStyles.container}>
            <StatusBar backgroundColor="#f9fafb" barStyle="dark-content" />

            {notifications.length === 0 ? (
                <View style={notificationStyles.emptyContainer}>
                    <Text style={notificationStyles.emptyIcon}>🔔</Text>
                    <Text style={notificationStyles.emptyTitle}>No notifications</Text>
                    <Text style={notificationStyles.emptySubtitle}>
                        You're all caught up! New notifications will appear here.
                    </Text>
                    <TouchableOpacity
                        style={notificationStyles.refreshButton}
                        onPress={handleRefresh}
                    >
                        <Text style={notificationStyles.refreshButtonText}>Refresh</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNotificationItem}
                    contentContainerStyle={notificationStyles.listContent}
                    showsVerticalScrollIndicator={false}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                />
            )}
        </View>
    );
}
export default Notification;