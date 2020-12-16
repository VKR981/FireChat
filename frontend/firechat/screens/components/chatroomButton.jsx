import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function ChatroomButton({ handleClick, name, color }) {
  return (
    <TouchableOpacity
      onPress={() => {
        handleClick();
      }}
    >
      <View
        style={{
          marginTop: 30,
          backgroundColor: color,
          width: "100%",
          height: 40,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
