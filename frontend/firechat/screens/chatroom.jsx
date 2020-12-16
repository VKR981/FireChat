// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { initSocket, sendMessage, socket } from "./utils";

export default function Chatroom(props) {
  const { navigation } = props;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const appendMessage = (msg) => {
    // let temp = messages;
    // temp.push(msg);

    setMessages([...messages, msg]);
  };

  useEffect(() => {
    initSocket();
    const { userName, room } = props.route.params;
    socket.emit("joinRoom", { username: userName, room });
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return true;
    socket.on("message", (msg) => {
      appendMessage(msg);
    });
  }, [messages]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#003049" />
      <View
        style={{
          backgroundColor: "#003049",

          flex: 0.8,
          paddingBottom: 10,
        }}
      >
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ margin: 10, marginTop: 0 }}>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#eae2b7",
                  marginTop: 20,
                  borderRadius: 10,
                  marginRight: "auto",
                  paddingLeft: 20,
                  paddingRight: 40,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#d62828", fontSize: 12 }}>
                    {msg.username}
                  </Text>
                  <Text
                    style={{
                      color: "#003049",
                      marginLeft: "auto",
                      fontSize: 10,
                    }}
                  >
                    {msg.time}
                  </Text>
                </View>
                <Text style={{ color: "#003049", fontWeight: "700" }}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          zIndex: 2,
          width: "100%",
          height: "20%",
          backgroundColor: "#003049",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            borderWidth: 2,
            width: "80%",
            borderColor: "white",
            height: "80%",
            borderRadius: 20,
            color: "white",
            padding: 5,
          }}
          value={messageInput}
          textBreakStrategy="highQuality"
          multiline
          maxLength={250}
          onChangeText={(text) => setMessageInput(text)}
        ></TextInput>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <TouchableOpacity
            style={{
              marginBottom: 10,
            }}
            onPress={() => {
              if (messageInput) {
                sendMessage(messageInput);
                setMessageInput("");
              }
            }}
          >
            <View
              style={{
                backgroundColor: "#fcbf49",
                padding: 10,
                borderRadius: 20,
                marginLeft: 20,
                marginBottom: "auto",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#003049" }}>Send</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                backgroundColor: "#fcbf49",
                padding: 10,
                borderRadius: 20,
                marginLeft: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#003049" }}>Leave</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
