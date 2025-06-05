import { Tabs } from "expo-router";
import { User, Library, BookOpen, NotebookPen, Bot } from "lucide-react-native";

export default function TabsLayout() {
  return ( 
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "flex",
          height: 58,
        },
        tabBarActiveTintColor: "#DF4879",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
          marginBottom: 3,
        },
      }}
    >

      <Tabs.Screen
        name="workCheckInScreen"
        options={{
          tabBarLabel: "Work",
          tabBarIcon: ({ color }) => <NotebookPen color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="studyRoomScreen"
        options={{
          tabBarLabel: "Study Room",
          tabBarIcon: ({ color }) => <BookOpen color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="studyHubScreen"
        options={{
          tabBarLabel: "Library",
          tabBarIcon: ({ color }) => <Library color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="studyAssistantScreen"
        options={{
          tabBarLabel: "Assistant",
          tabBarIcon: ({ color }) => <Bot color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="profileScreen"
        options={{
          tabBarLabel: "My Profile",
          tabBarIcon: ({ color }) => <User color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
