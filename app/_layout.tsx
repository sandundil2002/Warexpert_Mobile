import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { View } from "react-native";

function RootLayout() {
    return (
        <Provider store={store}>
            <View style={{ flex: 1 }}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </View>
        </Provider>
    );
}

export default RootLayout;
