import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const ToolItem = ({ imageBackgroundColor, imageUrl, toolName, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.toolItem, { backgroundColor: imageBackgroundColor }]}
      onPress={onPress}
    >
      <Image source={imageUrl} style={styles.toolIconImage} />
      <Text style={styles.toolNameText}>{toolName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toolItem: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "47%",
    justifyContent: "center",
    alignItems: "center",
    height: 180,
    position: "relative",
  },
  toolIconImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  toolNameText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 5,
    textAlign: "center",
  },
});

export default ToolItem;
