import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/home";
import Chatroom from "./screens/chatroom";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="Chatroom"
          options={{ headerShown: false }}
          component={Chatroom}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
