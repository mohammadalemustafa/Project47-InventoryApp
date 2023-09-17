import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../../constant/Color";

const Icon = (props) => {
  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => [styles.add, pressed ? styles.pressed : ""]}>
      <Ionicons name={props.name} color={props.color} size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  add: {
    backgroundColor: Colors.white_color,
    height: 35,
    width: 35,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});

export default Icon;
