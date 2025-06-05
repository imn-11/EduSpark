import { StyleSheet, Text, View, TextInput, Animated, FlatList} from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";
import BookCard from "../../components/BookCard";

const BOTTOM_SECTION_H = 600; 

export default function StudyHubScreen() {
  const books = [
    {
      id: 1,
      title: "Book 1",
      author: "Author",
      coverImage: require("../../images/book.jpeg"),
    },
    {
      id: 2,
      title: "Book 2",
      author: "Author",
      coverImage: require("../../images/book.jpeg"),
    },
    {
      id: 3,
      title: "Book 3",
      author: "Author",
      coverImage: require("../../images/book.jpeg"),
    },
    {
      id: 4,
      title: "Book 4",
      author: "Author",
      coverImage: require("../../images/book.jpeg"),
    },

    {
      id: 5,
      title: "Book 5",
      author: "Author",
      coverImage: require("../../images/book.jpeg"),
    },

    {
      id: 6,
      title: "Book 6",
      author: "Author",
      coverImage: require("../../images/book.jpeg"),
    },
  ];

  const scrollY = useRef(new Animated.Value(0)).current;

  const renderTopItem = ({ item }) => (
    <BookCard
      title={item.title}
      author={item.author}
      coverImage={item.coverImage}
      onPress={() => console.log(`Pressed book: ${item.title}`)}
    />
  );

  const renderBottomItem = ({ item, index }) => (
    <View style={styles.bookItemContainer}>
      <BookCard
        title={item.title}
        author={item.author}
        coverImage={item.coverImage}
        onPress={() => console.log(`Pressed book: ${item.title}`)}
      />
      <View style={styles.bookInfoContainer}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookDescription}>
          A fascinating journey through the world of knowledge. Perfect for curious minds and avid readers.
        </Text>
      </View>
      {index < books.length - 1 && <View style={styles.divider} />}
    </View>
  );

  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Static Top Pink Section */}
        <View style={styles.topSection}>
          <Text style={styles.welcomeText}>Library</Text>
          <View style={styles.searchContainer}>
            <Search size={20} color="#FFFFFF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for books, notes..."
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
            />
          </View>

          {/* Books Horizontal Scroll */}
          <View style={styles.booksSection}>
            <Text style={styles.sectionTitle}>New Collection</Text>
            <FlatList 
              horizontal
              data={books}
              renderItem={renderTopItem}
              keyExtractor={keyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.booksScrollContent}
            />
          </View>
        </View>

        {/* Bottom Section with Expanding Animation */}
        <Animated.View
          style={[
            styles.bottomSection,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, BOTTOM_SECTION_H],
                    outputRange: [BOTTOM_SECTION_H * 0.45, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.FlatList
            data={books}
            renderItem={renderBottomItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={5}
            removeClippedSubviews={true}
            bounces={false}
            overScrollMode="never"
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FF9EB5",
  },
  container: {
    flex: 1,
  },
  topSection: {
    height: '65%',
    backgroundColor: "#ffb8c8",
    paddingLeft: 20,
    paddingTop: 50,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginBottom: 25,
    marginRight: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },
  booksSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 15,
    marginLeft: 5,
  },
  booksScrollContent: {
    paddingLeft: 5,
    paddingRight: 20,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BOTTOM_SECTION_H,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 15,
  },
  bookItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bookInfoContainer: {
    flex: 1,
    marginLeft: 15,
    paddingRight: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  bookDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});