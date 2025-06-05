import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Send } from "lucide-react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";

//INSERT YOUR API KEY HERE :)
const API_KEY = "";

const genAI = new GoogleGenerativeAI(API_KEY);

const customResponses = {
  "what's your name": "I'm Sparkle, your study buddy!",
  "who are you":
    "I'm Sparkle, here to help you with your studies and answer your questions!",
  "who created you":
    "I was created by a team of awesome developers to assist students like you!",
};

async function getGeminiResponse(prompt) {
  try {
    const normalizedPrompt = prompt.toLowerCase().trim();
    for (const [question, response] of Object.entries(customResponses)) {
      if (normalizedPrompt.includes(question)) {
        return response;
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I couldn't generate a response.";
  }
}

const StudyAssistantScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      const newUserMessage = { text: input, sender: "user" };
      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);
      setInput("");

      try {
        const reply = await getGeminiResponse(input);
        const assistantReply = { text: reply, sender: "assistant" };
        setMessages((prev) => [...prev, assistantReply]);
      } catch (error) {
        const errorReply = {
          text: "Something went wrong",
          sender: "assistant",
        };
        setMessages((prev) => [...prev, errorReply]);
      }

      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Initial Welcome Section */}
        {messages.length === 0 && (
          <View style={styles.initialWelcomeContainer}>
            <Image
              source={require("../../images/bot.png")}
              style={styles.welcomeImage}
              resizeMode="contain"
            />
            <Text style={styles.helloText}>Hello, Alex</Text>
            <Text style={styles.howCanIHelpText}>How can I help?</Text>
          </View>
        )}

        <ScrollView
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          ref={scrollViewRef}
          onContentSizeChange={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }
          }}
        >
          {messages.map((message, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                message.sender === "user"
                  ? styles.userMessage
                  : styles.assistantMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Enter your prompt..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Send size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffeff3",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingBottom: 10,
    marginTop: 20,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FF9EB5",
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  initialWelcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 200,
  },
  welcomeImage: {
    width: 200,
    height: 200,
    marginBottom: 5,
  },
  helloText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  howCanIHelpText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#FF9EB5",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StudyAssistantScreen;
