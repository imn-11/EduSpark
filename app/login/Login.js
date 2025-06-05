import { Text, View, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import Field from "../components/Field";
import CustomButton from "../components/CustomButton";
import styles from "../Styles";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in both username and password");
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (!storedUser) {
        Alert.alert("Error", "No account found. Please sign up first.");
        return;
      }

      const userData = JSON.parse(storedUser);
      console.log("Checking username and password:", username, password);

      if (userData.username === username && userData.password === password) {
        await AsyncStorage.setItem("isLoggedIn", "true");
        router.replace("/home");
      } else {
        Alert.alert("Login Failed", "Invalid username or password");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.error(error);
    }
  };

  const handleSignUpPress = () => {
    router.push("/signup/SignUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.login_conatiner}>
        <Text style={styles.large_text}>Welcome Back</Text>
        <Text style={styles.medium_text}>Please login to continue</Text>
      </View>
      <View style={styles.input_container}>
        <Field
          placeholder="Username"
          value={username}
          isSecure={false}
          onChangeText={setUsername}
        />
        <Field
          placeholder="Password"
          value={password}
          isSecure={true}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.button_container}>
        <CustomButton title="Login" onPress={handleLogin} />
      </View>

      <View style={styles.sign_up_container}>
        <Text>Don't have an account? </Text>

        <Pressable onPress={handleSignUpPress}>
          <Text style={styles.sign_up}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;
