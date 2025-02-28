import React, { useState, useEffect } from "react";
import {View, Text,  ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, Linking} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { resetContactState, sendContactMessage } from "../../store/slices/contact-slice";
import { FontAwesome } from "@expo/vector-icons";
import {contactStyles} from "../../styles/contact-styles";

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface SocialMediaItem {
    name: string;
    icon: string;
    url: string;
    color: string;
}

const Contact = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, success } = useSelector((state: RootState) => state.contact);

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: ""
    });

    const socialMedia: SocialMediaItem[] = [
        { name: "Facebook", icon: "facebook", url: "https://facebook.com/yourcompany", color: "#1877F2" },
        { name: "Twitter", icon: "twitter", url: "https://twitter.com/yourcompany", color: "#1DA1F2" },
        { name: "Instagram", icon: "instagram", url: "https://instagram.com/yourcompany", color: "#E1306C" },
        { name: "LinkedIn", icon: "linkedin-square", url: "https://linkedin.com/company/yourcompany", color: "#0A66C2" },
    ];

    useEffect(() => {
        if (success) {
            Alert.alert("Success", "Your message has been sent successfully!");
            setFormData({ name: "", email: "", message: "" });
            dispatch(resetContactState());
        }

        if (error) {
            Alert.alert("Error", error);
            dispatch(resetContactState());
        }
    }, [success, error, dispatch]);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        if (!formData.name.trim()) {
            Alert.alert("Error", "Please enter your name");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        if (!formData.message.trim()) {
            Alert.alert("Error", "Please enter your message");
            return;
        }

        dispatch(sendContactMessage(formData));
    };

    const openSocialMedia = (url: string) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert("Error", "Cannot open this URL");
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={contactStyles.container}>
            <StatusBar style="auto" />
            <View style={contactStyles.formContainer}>
                <View style={contactStyles.headerContainer}>
                    <Text style={contactStyles.headerTitle}>
                        Get in touch with our support team
                    </Text>
                </View>
                <View style={contactStyles.inputGroup}>
                    <Text style={contactStyles.label}>Full Name</Text>
                    <View style={contactStyles.inputWrapper}>
                        <FontAwesome name="user" size={18} color="#9CA3AF" style={contactStyles.inputIcon} />
                        <TextInput
                            style={contactStyles.input}
                            placeholder="Enter your name"
                            placeholderTextColor="#9CA3AF"
                            value={formData.name}
                            onChangeText={(text) => handleInputChange("name", text)}
                        />
                    </View>
                </View>

                <View style={contactStyles.inputGroup}>
                    <Text style={contactStyles.label}>Email Address</Text>
                    <View style={contactStyles.inputWrapper}>
                        <FontAwesome name="envelope" size={18} color="#9CA3AF" style={contactStyles.inputIcon} />
                        <TextInput
                            style={contactStyles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.email}
                            onChangeText={(text) => handleInputChange("email", text)}
                        />
                    </View>
                </View>

                <View style={contactStyles.inputGroup}>
                    <Text style={contactStyles.label}>Message</Text>
                    <View style={[contactStyles.inputWrapper, contactStyles.textAreaWrapper]}>
                        <FontAwesome
                            name="comment"
                            size={18}
                            color="#9CA3AF"
                            style={[contactStyles.inputIcon, contactStyles.textAreaIcon]}
                        />
                        <TextInput
                            style={[contactStyles.input, contactStyles.textArea]}
                            placeholder="Type your message here..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={6}
                            textAlignVertical="top"
                            value={formData.message}
                            onChangeText={(text) => handleInputChange("message", text)}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={contactStyles.submitButton}
                    onPress={handleSubmit}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <>
                            <FontAwesome name="paper-plane" size={16} color="#FFFFFF" style={contactStyles.buttonIcon} />
                            <Text style={contactStyles.submitButtonText}>Send Message</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>

            <View style={contactStyles.socialContainer}>
                <Text style={contactStyles.socialTitle}>Connect With Us</Text>
                <View style={contactStyles.socialIcons}>
                    {socialMedia.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[contactStyles.socialButton, { backgroundColor: item.color }]}
                            onPress={() => openSocialMedia(item.url)}
                            activeOpacity={0.7}
                        >
                            {/*@ts-ignore*/}
                            <FontAwesome name={item.icon} size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={contactStyles.directContactContainer}>
                <Text style={contactStyles.directContactTitle}>Direct Contact</Text>
                <View style={contactStyles.contactInfoRow}>
                    <FontAwesome name="phone" size={18} color="#4B5563" style={contactStyles.contactInfoIcon} />
                    <Text style={contactStyles.contactInfoText}>+1 (123) 456-7890</Text>
                </View>
                <View style={contactStyles.contactInfoRow}>
                    <FontAwesome name="envelope" size={18} color="#4B5563" style={contactStyles.contactInfoIcon} />
                    <Text style={contactStyles.contactInfoText}>support@yourcompany.com</Text>
                </View>
                <View style={contactStyles.contactInfoRow}>
                    <FontAwesome name="map-marker" size={18} color="#4B5563" style={contactStyles.contactInfoIcon} />
                    <Text style={contactStyles.contactInfoText}>123 Business Street, City, Country</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default Contact;