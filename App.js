import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Homescreen from "./views/Homescreen";
import Otp from "./src";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Otp />
    // </View>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Otp}
          // options={{ title: "Silent Hill" }}
        />

        <Stack.Screen
          name="Dashboard"
          component={Homescreen}
          options={{ headerShown: true, headerLeft: () => <Text></Text> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
