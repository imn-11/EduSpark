import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Volume2, Youtube, X } from "lucide-react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function StudyRoomScreen() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [thumbnailQualities, setThumbnailQualities] = useState({});

  const studyVideos = [
    {
      id: "1",
      title: "Study With Me - Session 1",
      url: "https://youtu.be/TA9SZawYm2k?si=VOsaACT-XNxiFeyY",
      videoId: "TA9SZawYm2k",
    },
    {
      id: "2",
      title: "Study With Me - Session 2",
      url: "https://youtu.be/hWSVHt4BJWE?si=0ynA1piFNsaiGqEO",
      videoId: "hWSVHt4BJWE",
    },
    {
      id: "3",
      title: "Study With Me - Session 3",
      url: "https://youtu.be/R1r9nLYcqBU?si=D0AMb8VTWSMX32On",
      videoId: "R1r9nLYcqBU",
    },
  ];

  const getThumbnailUrl = (videoId, quality = "maxresdefault") => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  const handleThumbnailError = (videoId) => {
    const qualities = [
      "maxresdefault",
      "sddefault",
      "hqdefault",
      "mqdefault",
      "default",
    ];
    const currentQuality = thumbnailQualities[videoId] || "maxresdefault";
    const currentIndex = qualities.indexOf(currentQuality);

    if (currentIndex < qualities.length - 1) {
      const nextQuality = qualities[currentIndex + 1];
      setThumbnailQualities((prev) => ({
        ...prev,
        [videoId]: nextQuality,
      }));
      return getThumbnailUrl(videoId, nextQuality);
    }
    return getThumbnailUrl(videoId, "default");
  };

  const handleVideoPress = (video) => {
    setSelectedVideo(video);
    setIsVideoModalVisible(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalVisible(false);
    setSelectedVideo(null);
  };

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      minutes: mins.toString().padStart(2, "0"),
      seconds: secs.toString().padStart(2, "0"),
    };
  };

  const time = formatTime(timeLeft);

  const adjustTime = (minutes) => {
    const newTime = timeLeft + minutes * 60;
    if (newTime >= 0) {
      setTimeLeft(newTime);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Main Content Container (White Section) */}
      <ScrollView style={styles.mainContentContainer}>
        {/* Motivational Header (Now inside ScrollView) */}
        <View style={styles.motivationalContainer}>
          <Image
            source={require("../../images/focus.png")}
            style={styles.timerImage}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text style={styles.motivationalText}>It's time to focus!</Text>
            <Text style={styles.subText}>
              Your journey to excellence starts here
            </Text>
          </View>
        </View>

        {/* Timer Section */}
        <View style={styles.timerSection}>
          <View style={styles.timerBox}>
            {/* Removed Orbit Image Background */}

            <View style={styles.timeContainer}>
              <View style={styles.timeUnitContainer}>
                <Text style={styles.timeUnitText}>{time.minutes}</Text>
              </View>
              <Text style={styles.colon}>:</Text>
              <View style={styles.timeUnitContainer}>
                <Text style={styles.timeUnitText}>{time.seconds}</Text>
              </View>
            </View>

            {/* Timer Controls inside the box again */}
            <View style={styles.timerControls}>
              <TouchableOpacity 
                style={[styles.timerButton, styles.playPauseButton]}
                onPress={() => setIsRunning(!isRunning)}
              >
                <Text style={styles.buttonText}>
                  {isRunning ? "Pause" : "Start"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.timerButton, styles.resetButton]}
                onPress={() => {
                  setTimeLeft(25 * 60);
                  setIsRunning(false);
                }}
              >
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Study Tools Section */}
        <View style={styles.toolsSection}>
          <Text style={styles.sectionTitle}>Study Tools</Text>
          <View style={styles.toolsGrid}>
            <TouchableOpacity style={styles.toolCard}>
              <Image
                source={require("../../images/notes.png")}
                style={styles.toolImage}
                resizeMode="contain"
              />
              <Text style={styles.toolText}>Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolCard}>
              <Image
                source={require("../../images/flashcards.png")}
                style={styles.toolImage}
                resizeMode="contain"
              />
              <Text style={styles.toolText}>Flashcards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolCard}>
              <Image
                source={require("../../images/todolist.png")}
                style={styles.toolImage}
                resizeMode="contain"
              />
              <Text style={styles.toolText}>ToDo List</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Study With Me Videos Section */}
        <View style={styles.videosSection}>
          <Text style={styles.sectionTitle}>Study With Me</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search study videos..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.videosScroll}
          >
            {studyVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={[
                  styles.videoCard,
                  selectedVideo?.id === video.id && styles.selectedVideoCard,
                ]}
                onPress={() => handleVideoPress(video)}
              >
                <View style={styles.videoThumbnail}>
                  <Image
                    source={{
                      uri: getThumbnailUrl(
                        video.videoId,
                        thumbnailQualities[video.videoId] || "maxresdefault"
                      ),
                    }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                    onError={() => handleThumbnailError(video.videoId)}
                  />
                  <View style={styles.playButton}>
                  <Youtube size={24} color="#FF9EB5" />
                  </View>
                </View>
                <Text style={styles.videoTitle}>{video.title}</Text>
                {selectedVideo?.id === video.id && (
                  <View style={styles.playingIndicator}>
                    <Volume2 size={16} color="#FF9EB5" />
                    <Text style={styles.playingText}>Now Playing</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Video Player Modal */}
      <Modal
        visible={isVideoModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeVideoModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeVideoModal}
            >
              <X size={24} color="#FF9EB5" />
            </TouchableOpacity>
            {selectedVideo && (
              <View style={styles.videoPlayerContainer}>
                <YoutubePlayer
                  height={220}
                  width={Dimensions.get("window").width - 40}
                  play={true}
                  videoId={selectedVideo.videoId}
                  initialPlayerParams={{
                    controls: true,
                    modestbranding: true,
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
  },
  mainContentContainer: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    marginTop: 0,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  motivationalContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffde8e",
    padding: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    height: "35%",
  },
  timerImage: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  textContainer: {
    alignItems: "center",
  },
  motivationalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 2,
  },
  subText: {
    fontSize: 15,
    color: "#7f8c8d",
    lineHeight: 20,
  },
  timerSection: {
    marginHorizontal: 10,
    marginVertical: 8,
    marginTop: -85,
  },
  timerBox: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 360,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  timeUnitContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    minWidth: 0,
    alignItems: "center",
  },
  timeUnitText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  colon: {
    fontSize: 60,
    fontWeight: "900",
    color: "#2c3e50",
    marginHorizontal: 5,
  },
  timerControls: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
  },
  timerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    width: 120,
  },
  playPauseButton: {
    backgroundColor: "#2c3e50",
  },
  resetButton: {
    backgroundColor: "#ced2d9",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  timerOptions: {
    display: "none",
  },
  timerOption: {
    display: "none",
  },
  selectedTimer: {
    display: "none",
  },
  timerOptionText: {
    display: "none",
  },
  selectedTimerText: {
    display: "none",
  },
  toolsSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 360,
    alignSelf: "center",
  },
  toolsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  toolCard: {
    width: "30%",
    height: 100,
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  toolImage: {
    width: 50,
    height: 50,
  },
  toolText: {
    marginTop: 10,
    color: "#2c3e50",
    fontWeight: "500",
  },
  videosSection: {
    backgroundColor: "#ffeff3",
    padding: 20,
    marginBottom: 120,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 360,
    alignSelf: "center",
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: "#fdfafb",
    padding: 10,
    borderRadius: 10,
    color: "#2c3e50",
  },
  videosScroll: {
    flexDirection: "row",
  },
  videoCard: {
    width: 200,
    marginRight: 15,
    backgroundColor: "#fdfafb",
    borderRadius: 10,
    padding: 10,
  },
  selectedVideoCard: {
    backgroundColor: "#fff5f7",
    borderColor: "#FF9EB5",
    borderWidth: 2,
  },
  videoThumbnail: {
    width: "100%",
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: 5,
  },
  playingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  playingText: {
    fontSize: 12,
    color: "#FF9EB5",
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  videoPlayerContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
  },
  playButton: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 25,
    padding: 8,
  },
});
