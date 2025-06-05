import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Edit2, X } from "lucide-react-native";

export default function profileScreen() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Ales",
    username: "@alex.123",
    major: "Computer Science",
    year: "Year 3"
  });
  const [tempProfileData, setTempProfileData] = useState(profileData);

  const handleEditPress = () => {
    setTempProfileData(profileData);
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    setProfileData(tempProfileData);
    setIsEditModalVisible(false);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header_container}>
          <TouchableOpacity 
            style={styles.edit_button}
            onPress={handleEditPress}
          >
            <Edit2 size={20} color="#FF9EB5" />
          </TouchableOpacity>
          <View style={styles.avatar_container}>
            <TouchableOpacity>
              <Image
                source={require("../../images/avatar.jpg")}
                style={styles.avatar}
              />
              <View style={styles.edit_avatar_overlay}>
                <Edit2 size={20} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <View style={styles.name_user_container}>
              <Text style={styles.name}>{profileData.name}</Text>
              <Text style={styles.username}>{profileData.username}</Text>
              <Text style={styles.student_info}>{profileData.major} • {profileData.year}</Text>
            </View>
          </View>
        </View>


        {/* Stats Section */}
        <View style={styles.stats_container}>
          <View style={styles.stat_item}>
            <Text style={styles.stat_number}>7</Text>
            <Text style={styles.stat_label}>Day Streak</Text>
          </View>
          <View style={styles.stat_item}>
            <Text style={styles.stat_number}>24</Text>
            <Text style={styles.stat_label}>Tasks Done</Text>
          </View>
          <View style={styles.stat_item}>
            <Text style={styles.stat_number}>92</Text>
            <Text style={styles.stat_label}>Study Hours</Text>
          </View>
        </View>


         {/* Streak View */}
         <View style={styles.streak_container}>
          <View style={styles.streak_content}>
            <View style={styles.streak_left}>
              <View style={styles.streak_number_container}>
                <Text style={styles.streak_number}>7</Text>
                <Text style={styles.streak_days}>days</Text>
              </View>
              <View style={styles.streak_text_container}>
                <Text style={styles.streak_label}>Study Streak</Text>
                <Text style={styles.streak_subtext}>Keep it up! You're doing great!</Text>
              </View>
            </View>
            <Image
              source={require("../../images/streak.png")}
              style={styles.streak_image}
              resizeMode="contain"
            />
          </View>
        </View>

       {/* Recent Activity */}
       <View style={styles.activityWrapper}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContent}>
            <View style={styles.dayLabelsContainer}>
              <Text style={styles.dayLabel}>Mon</Text>
              <View style={{ height: 2 * (15 + 2), justifyContent: 'flex-end' }} />
              <Text style={styles.dayLabel}>Wed</Text>
              <View style={{ height: 2 * (15 + 2), justifyContent: 'flex-end' }} />
              <Text style={styles.dayLabel}>Fri</Text>
            </View>
            <View style={styles.weeksContainer}>
              {/* Placeholder for weeks */}
              {[...Array(6)].map((_, weekIndex) => (
                <View key={weekIndex} style={styles.weekColumn}>
                  {/* Placeholder for days in a week */}
                  {[...Array(7)].map((_, dayIndex) => (
                    <View key={dayIndex} style={styles.activitySquare} />
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      
      
        {/* Share with Friends */}
        <View style={styles.share_container}>
          <Text style={styles.section_title}>Invite Friends</Text>
          <Text style={styles.section_secondary_title}>Share the link with your friends</Text>
          <TouchableOpacity style={styles.share_button}>
            <Text style={styles.share_button_text}>Share</Text>
          </TouchableOpacity>
        </View>


      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modal_overlay}>
          <View style={styles.modal_content}>
            <View style={styles.modal_header}>
              <Text style={styles.modal_title}>Edit Profile</Text>
              <TouchableOpacity onPress={handleCancel}>
                <X size={24} color="#FF9EB5" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.input_container}>
              <Text style={styles.input_label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={tempProfileData.name}
                onChangeText={(text) => setTempProfileData({...tempProfileData, name: text})}
                placeholder="Enter your full name"
              />
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_label}>Username</Text>
              <TextInput
                style={styles.input}
                value={tempProfileData.username}
                onChangeText={(text) => setTempProfileData({...tempProfileData, username: text})}
                placeholder="Enter your username"
              />
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_label}>Major</Text>
              <TextInput
                style={styles.input}
                value={tempProfileData.major}
                onChangeText={(text) => setTempProfileData({...tempProfileData, major: text})}
                placeholder="Enter your major"
              />
            </View>

            <View style={styles.input_container}>
              <Text style={styles.input_label}>Year</Text>
              <TextInput
                style={styles.input}
                value={tempProfileData.year}
                onChangeText={(text) => setTempProfileData({...tempProfileData, year: text})}
                placeholder="Enter your year"
              />
            </View>

            <View style={styles.modal_buttons}>
              <TouchableOpacity 
                style={[styles.modal_button, styles.cancel_button]}
                onPress={handleCancel}
              >
                <Text style={styles.cancel_button_text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modal_button, styles.save_button]}
                onPress={handleSaveProfile}
              >
                <Text style={styles.save_button_text}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </ScrollView>
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
    paddingBottom: 20,
  },
  header_container: {
    margin: 10,
    marginBottom: 5,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FF9EB5",
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar_placeholder: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name_user_container: {
    marginLeft: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  username: {
    fontSize: 16,
    color: "#7f8c8d",
    marginTop: 2,
  },
  student_info: {
    fontSize: 14,
    color: "#FF9EB5",
    marginTop: 4,
  },
  streak_container: {
    marginHorizontal: 10,
    marginTop: 5,
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  streak_content: {
    flexDirection: 'row',
    alignItems: 'center',

    gap:null,
  },
  streak_left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  streak_number_container: {
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 10,
  },
  streak_number: {
    fontSize: 50,
    fontWeight: "800",
    color: "#FF9EB5",
    lineHeight: 50,
  },
  streak_days: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF9EB5",
    marginTop: -5,
  },
  streak_text_container: {
    flex: 1,
    justifyContent: 'center',
  },
 streak_label: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  streak_subtext: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  streak_image: {
    width: 120,
    height: 120,
    marginLeft: 0,
    marginRight: -10,
  },
  stats_container: {
    flexDirection: "row",
    margin: 10,
    marginTop: 5,
    justifyContent: "space-between",
    gap: 10,
  },
  stat_item: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FF9EB5",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stat_number: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  stat_label: {
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 4,
    opacity: 0.9,
  },
  actions_container: {
    margin: 10,
    marginTop: 5,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section_title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
    textAlign: "center",
  },

  section_secondary_title: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "500",
    marginTop: -13,
    marginBottom: 10,
    textAlign: "center",
  },

  action_buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  action_button: {
    width: "24%",
    backgroundColor: "#f8f9fa",
    padding:10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  action_text: {
    marginTop: 8,
    color: "#2c3e50",
    fontSize: 14,
    textAlign: "center",
  },
  edit_button: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  edit_avatar_overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF9EB5',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  modal_overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modal_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modal_title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  input_container: {
    marginBottom: 15,
  },
  input_label: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  modal_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  modal_button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancel_button: {
    backgroundColor: '#f0f0f0',
  },
  cancel_button_text: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  save_button: {
    backgroundColor: '#FF9EB5',
  },
  save_button_text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  share_container: {
    margin: 10,
    marginTop: 5,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  share_button: {
    backgroundColor: "#FF9EB5",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  share_button_text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  activityWrapper: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dayLabelsContainer: {
    marginRight: 5,
    marginTop: 4,
  },
  dayLabel: {
    fontSize: 12,
    color: '#555',
    height: 15 + 2, 
    justifyContent: 'center',
  },
  weeksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  weekColumn: {
    flexDirection: 'column',
    marginHorizontal: 2, 
  },
  activitySquare: {
    width: 18, 
    height: 15, 
    margin: 2, 
    backgroundColor: '#e0e0e0', 
    borderRadius: 3,
  },
  activity_subtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: 'center',
    marginBottom: 10,
  },
  activityTitle: {
    color: '#FF9EB5',
  },
});
