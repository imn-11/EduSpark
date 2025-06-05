import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { User, Lock } from "lucide-react-native";

const Field = ({ placeholder, value, isSecure = false, onChangeText }) => {
  const IconComponent = placeholder === "Username" ? User : Lock;

  return (
    <View style={styles.container}>
      <IconComponent color="#666" size={22} style={styles.icon} />
      <TextInput
        style={styles.placeholder_style}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        secureTextEntry={isSecure}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Field;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 7,
    width: 300,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },

  placeholder_style: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#000",
    fontFamily: "Circular",
  },
});
