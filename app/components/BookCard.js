import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const BookCard = ({ title, author, coverImage, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {coverImage ? (
          <Image
            source={coverImage}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage} />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    marginRight: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  
  },
  imageContainer: {
    width: "100%",
    height: 130,
    backgroundColor: "#f0f0f0",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
  },
  infoContainer: {
    padding: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 1,
  },
  author: {
    fontSize: 11,
    color: "#7f8c8d",
  },
});

export default BookCard; 