import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { BookOpen, CheckCircle2 } from "lucide-react-native";
import ToolItem from "../../components/ToolItem";

const WorkCheckInScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Hi, Alex 👋</Text>
            <Text style={styles.welcomeText}>Welcome back!</Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View>
            <Text style={styles.sectionTitle}>Progress</Text>
            <View style={styles.progressBarContainer}>
              <Text style={styles.progressBarText}>Overall Progress: 75%</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill}></View>
              </View>
            </View>
          </View>
          <Image
            source={require("../../images/progress.png")}
            style={styles.progressImage}
            resizeMode="contain"
          />
        </View>

        {/* Today's Work Section */}
        <View style={styles.todaysWorkContainer}>
          <Text style={styles.sectionTitle}>Today's Work</Text>
          <View style={styles.workContent}>
            <View style={styles.workItem}>
              <View style={styles.workIcon}>
                <BookOpen size={24} color="#FF9EB5" />
              </View>
              <View style={styles.workDetails}>
                <Text style={styles.workTitle}>Study Session</Text>
                <Text style={styles.workTime}>2 hours 30 minutes</Text>
              </View>
            </View>
            <View style={styles.workItem}>
              <View style={styles.workIcon}>
                <CheckCircle2 size={24} color="#FF9EB5" />
              </View>
              <View style={styles.workDetails}>
                <Text style={styles.workTitle}>Quick Tasks</Text>
                <Text style={styles.workTime}>5 tasks completed</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tools Section */}
        <View style={styles.toolsSection}>
          <Text style={styles.sectionTitle}>Tools</Text>
          <View style={styles.toolsGrid}>
            <ToolItem
              toolName="Work Check-In"
              imageBackgroundColor="#F3E5F5"
              imageUrl={require("../../images/work.png")}
              onPress={() => {}}
            />
            <ToolItem
              toolName="Tasks"
              imageBackgroundColor="#E0F7FA"
              imageUrl={require("../../images/tasks.png")}
              onPress={() => {}}
            />
            <ToolItem
              toolName="Time Tracker"
              imageBackgroundColor="#FFE4E1"
              imageUrl={require("../../images/timer.png")}
              onPress={() => {}}
            />
            <ToolItem
              toolName="Schedule"
              imageBackgroundColor="#E8F5E9"
              imageUrl={require("../../images/schedule.png")}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
  },
  overlayContent: {
    position: "relative",
    zIndex: 1,
    paddingHorizontal: 0,
    marginTop: 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: -10,
  },
  greetingContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeSection: {
    margin: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 35,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: 80,
  },
  progressSection: {
    margin: 10,
    marginTop: -70,
    paddingLeft: 20,
    paddingVertical: 5,
    backgroundColor: "#f5d0d8",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  progressBarContainer: {
    marginBottom: 0,
  },
  progressBarText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  progressFill: {
    width: "65%",
    height: "100%",
    backgroundColor: "#E57373",
    borderRadius: 5,
  },
  progressImage: {
    width: 120,
    height: 120,
  },
  toolsSection: {
    margin: 10,
    marginTop: 5,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  todaysWorkContainer: {
    margin: 10,
    marginTop: 5,
    padding: 20,
    paddingBottom:-5,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workContent: {
    marginTop: 15,
  },
  workItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  workIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff5f7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  workDetails: {
    flex: 1,
  },
  workTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  workTime: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  share_button_text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WorkCheckInScreen;
