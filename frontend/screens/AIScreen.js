import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import sendMessageToGPT from "../api/gptApi";

const AIScreen = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const reply = await sendMessageToGPT(input);
    setResponse(reply);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.header}>
        AI Help <Text style={styles.emoji}>🤖</Text>
      </Text>

      <View style={styles.chatBox}>
        <ScrollView>
          {response ? (
            <Text style={styles.responseText}>{response}</Text>
          ) : (
            <Text style={styles.placeholderText}>Ask me anything about Disasters!</Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color="white" style={styles.icon} />
        <TextInput
          placeholder="What would you like to know?"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={handleSend}>
          <Icon name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0621",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  emoji: {
    fontSize: 32,
  },
  chatBox: {
    flex: 1,
    backgroundColor: "#1D0B4B",
    borderWidth: 2,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
  },
  responseText: {
    color: "white",
    fontSize: 16,
  },
  placeholderText: {
    color: "#888",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#29186A",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
});

export default AIScreen;
