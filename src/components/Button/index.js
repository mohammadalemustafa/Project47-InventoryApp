import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../../../constant/Color";

const Button = (props) => {
  return (
    <Pressable onPress={props.onPress} style={({ pressed }) => [styles.cont, pressed ? styles.pressed : ""]}>
      <Text style={styles.text}>{props.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cont: {
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.first_color,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    fontSize: 20,
    color: Colors.white_color,
    fontWeight: "600",
  },
});

export default Button;
