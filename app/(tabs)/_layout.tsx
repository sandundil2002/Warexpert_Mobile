import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";

function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={() => ({
                tabBarActiveTintColor: "#2563EB",
                tabBarInactiveTintColor: "#94A3B8",
                tabBarStyle: {
                    backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#FFFFFF',
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 60 + (Platform.OS === 'ios' ? insets.bottom : 0),
                    paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
                    paddingTop: 6,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                },
                tabBarItemStyle: {
                    height: 50,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "500",
                    marginBottom: 4,
                },
                tabBarBackground: () => (
                    Platform.OS === 'ios' ?
                        <BlurView tint="light" intensity={95} style={StyleSheet.absoluteFill} /> :
                        null
                ),
                headerShown: true,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "#fff",
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                },
                headerTitleStyle: {
                    fontSize: 26,
                    fontWeight: "700",
                    color: "#007AFF",
                    letterSpacing: 0.5,
                },
                animation: "fade",
                headerShadowVisible: false,
            })}
        >
            {/* Home Tab */}
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: "Warexpert Package Tracking",
                    title: "Home",
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused ? styles.activeIconContainer : null}>
                            <Ionicons
                                name="home"
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />

            {/* Payment Tab */}
            <Tabs.Screen
                name="payment"
                options={{
                    headerTitle: "Payment",
                    title: "Payment",
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused ? styles.activeIconContainer : null}>
                            <Ionicons
                                name="wallet-outline"
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />

            {/* Notifications Tab */}
            <Tabs.Screen
                name="notification"
                options={{
                    headerTitle: "Notifications",
                    title: "Notifications",
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused ? styles.activeIconContainer : null}>
                            <Ionicons
                                name="notifications-outline"
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                    tabBarBadge: 3,
                    tabBarBadgeStyle: {
                        backgroundColor: "#EF4444",
                        fontSize: 10,
                        marginTop: -2,
                    },
                }}
            />

            {/* Contact Tab */}
            <Tabs.Screen
                name="contact"
                options={{
                    headerTitle: "Contact Us",
                    title: "Contact",
                    tabBarIcon: ({ focused, color }) => (
                        <View style={focused ? styles.activeIconContainer : null}>
                            <Ionicons
                                name="chatbubble-ellipses-outline"
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    activeIconContainer: {
        backgroundColor: "#EBF5FF",
        borderRadius: 10,
        marginTop: -4,
    },
});

export default TabLayout;