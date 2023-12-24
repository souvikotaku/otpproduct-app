import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Homescreen from "./views/Homescreen";
import Detailscreen from "./views/Detailscreen";
import Cartscreen from "./views/Cartscreen";
import Categoryscreen from "./views/Categoryscreen";
import Favoritescreen from "./views/Favoritescreen";
import Morescreen from "./views/Morescreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categoryscreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" color={color} size={size} />
          ),
          headerShown: true,
          headerTitleStyle: {
            fontSize: 22,
            lineHeight: 30,
            color: "white",
            fontFamily: "Helvetica Neue",
          },
          headerStyle: {
            backgroundColor: "#2A4BA0",
          },
          title: "Categories",
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favoritescreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-border" color={color} size={size} />
          ),
          headerShown: true,
          headerTitleStyle: {
            fontSize: 22,
            lineHeight: 30,
            color: "white",
            fontFamily: "Helvetica Neue",
          },
          headerStyle: {
            backgroundColor: "#2A4BA0",
          },
          title: "Favorites",
        }}
      />
      <Tab.Screen
        name="More"
        component={Morescreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="dots-three-vertical" color={color} size={size} />
          ),
          headerShown: false,
          headerTitleStyle: {
            fontSize: 22,
            lineHeight: 30,
            color: "white",
            fontFamily: "Helvetica Neue",
          },
          headerStyle: {
            backgroundColor: "#2A4BA0",
          },
          title: "More",
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Homescreen />
    // </View>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={TabNav}

          // options={{ title: "Silent Hill" }}
        />
        <Stack.Screen
          name="Details"
          component={Detailscreen}
          // options={{ tabBarStyle: { display: "none" } }}
          // options={{ title: "Silent Hill" }}
        />
        <Stack.Screen
          name="Cart"
          component={Cartscreen}
          // options={{ tabBarStyle: { display: "none" } }}
          // options={{ title: "Silent Hill" }}
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
