import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";

const EmailValidation = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const validateEmail = async () => {
    if (!email) {
      setError("Please enter an email address.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.get("https://api.zerobounce.net/v2/validate", {
        params: {
          api_key: "a4abba098837489fa7147e1b3e1d85ad",
          email,
        },
      });

      setResult(response.data);
    } catch (err) {
      setError("Failed to validate email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        colors={["#2c3e50", "#bdc3c7"]}
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Email Validator</Text>
            <Text style={styles.subtitle}>Check if the email mailbox exists</Text>

            <View style={styles.inputContainer}>
              <Icon name="email" size={20} color="#666" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={styles.button}
              onPress={validateEmail}
              disabled={loading}
            >
              <LinearGradient
                colors={["#6a11cb", "#2575fc"]}
                style={styles.buttonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Validate Email</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {result && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultTitle}>Validation Result</Text>
                <View style={styles.resultItem}>
                  <Icon name="email" size={18} color="#6a11cb" />
                  <Text style={styles.resultText}>Email: {result.email}</Text>
                </View>
                <View style={styles.resultItem}>
                  <Icon name="check-circle" size={18} color="#6a11cb" />
                  <Text style={styles.resultText}>Status: {result.status}</Text>
                </View>
                <View style={styles.resultItem}>
                  <Icon name="info" size={18} color="#6a11cb" />
                  <Text style={styles.resultText}>Sub-status: {result.sub_status}</Text>
                </View>
                <View style={styles.resultItem}>
                  <Icon name="public" size={18} color="#6a11cb" />
                  <Text style={styles.resultText}>Domain: {result.domain}</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  button: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonGradient: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    color: "#ff6b6b",
    textAlign: "center",
    marginBottom: 15,
  },
  resultContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
  },
});

export default EmailValidation;