import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";

export default class Morescreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          This app is made by Souvik Das
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          souvikdasotaku@gmail.com
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: 40,

    // width: "100%",
  },
});
