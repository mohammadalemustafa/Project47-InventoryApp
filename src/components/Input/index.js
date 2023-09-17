import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../../constant/Color";

const Input = (props) => {
  return (
    <View style={styles.cont}>
      <Text style={styles.text}>{props.label}</Text>
      <TextInput
        value={props.value}
        id={props.id}
        onChangeText={(data) => props.onChangeText(props.id, data)}
        style={styles.Input}
        keyboardType={props.keyboard}
        editable={props.editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    marginBottom: 30,
  },
  Input: {
    height: 50,
    width: "100%",
    borderColor: Colors.second_color,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 20,
    backgroundColor: Colors.white_color,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
    color: Colors.third_color,
  },
});

export default Input;
