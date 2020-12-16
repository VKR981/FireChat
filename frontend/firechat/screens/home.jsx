import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import ChatroomButton from "./components/chatroomButton";
import { initSocket, sendTest, joinRoom } from "./utils";

//chat rooms
const EARTH = "Earth";
const MOON = "Moon";
const MARS = "Mars";

export default ({ navigation }) => {
  const [userName, setUserName] = useState("");

  const handleClick = (room) => {
    if (userName) {
      navigation.navigate("Chatroom", { userName, room });
    } else {
      alert("Please enter a username");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "70%",
        }}
      >
        <Text style={{ marginBottom: 5, color: "grey" }}>Enter Username:</Text>
        <TextInput
          style={{
            borderWidth: 2,
            borderColor: "grey",
            width: "100%",
            height: 40,
            borderRadius: 5,
            padding: 5,
          }}
          value={userName}
          onChangeText={(text) => setUserName(text)}
        ></TextInput>

        <ChatroomButton
          name={EARTH}
          color="#83c5be"
          handleClick={() => handleClick(EARTH)}
        />

        <ChatroomButton
          name={MOON}
          color="#073b4c"
          handleClick={() => handleClick(MOON)}
        />

        <ChatroomButton
          name={MARS}
          color="#e76f51"
          handleClick={() => handleClick(MARS)}
        />
      </View>
      <StatusBar barStyle="light-content" backgroundColor="#003049" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
