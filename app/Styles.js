import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    gap: 10,
  },

  login_conatiner: {
    marginBottom: 50,
  },
  input_container: {
    marginBottom: 20,
    gap: 20,
  },

  large_text: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Circular-Bold",
  },

  medium_text: {
    fontSize: 15,
    color: "#949494",
    textAlign: "center",
    fontFamily: "Circular",
  },

  button_container: {
    width: 200,
    borderRadius: 10,
  },

  sign_up_container: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 35,
    marginTop: 25,
    width: "100%",
  },

  sign_up: {
    color: "#DF4879",
    textDecorationLine: 'underline',
    fontFamily: "Circular",
  },
});

export default styles;
