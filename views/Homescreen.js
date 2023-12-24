import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";

const Homescreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
        }}
      >
        Welcome, this is the dashboard
      </Text>
      <View>
        <TouchableOpacity
          style={styles.sendVerification}
          // onPress={confirmCode}
          onPress={() => {
            Alert.alert(
              "Confirmation",
              "Would you like to sign out?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    // Navigate to the new screen here
                    navigation.navigate("Login");
                  },
                },
              ]
              // { cancelable: false }
            );
          }}
        >
          <Text style={styles.buttonText2}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  sendVerification: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#e44533",
    borderRadius: 70,
  },
  buttonText2: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
