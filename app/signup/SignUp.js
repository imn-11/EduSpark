import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import styles from "../Styles";
import Field from "../components/Field";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password != confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const userData = { username, password };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("isLoggedIn", "true");
      router.replace("/login/Login");
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.error(error);
    }
  };

  const handleLoginBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.login_conatiner}>
        <Text style={styles.large_text}>Sign Up</Text>
        <Text style={styles.medium_text}>Create your account</Text>
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
        <Field
          placeholder="Confirm Password"
          value={confirmPassword}
          isSecure={true}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.button_container}>
        <CustomButton title={"Sign Up"} onPress={handleSignUp} />
      </View>

      <View style={styles.sign_up_container}>
        <Text>Already have an account? </Text>

        <Pressable onPress={handleLoginBackPress}>
          <Text style={styles.sign_up}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;
