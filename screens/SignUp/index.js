import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Input from "../../src/components/Input";
import Button from "../../src/components/Button";
import Colors from "../../constant/Color";
import { addUser } from "../../helpers/user";

const SignUp = ({ navigation }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const inputHandler = (id, data) => {
    setInput({
      ...input,
      [id]: data,
    });
  };

  const loginScreenHandler = () => {
    navigation.replace("LOGIN");
  };

  const signUpHandler = async () => {
    await addUser(input.name, input.password, input.email, input.role);
    navigation.replace("LOGIN");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.loginCont}>
        <Input onChangeText={inputHandler} label="Username" id="name" />
        <Input onChangeText={inputHandler} label="Email" id="email" />
        <Input onChangeText={inputHandler} label="Password" id="password" />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button onPress={signUpHandler} name="Sign Up" />
        </View>
        <View style={styles.press}>
          <Text style={styles.signUpText}>Have Account</Text>
          <Pressable onPress={loginScreenHandler}>
            <Text style={styles.pressText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginCont: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },

  signUpText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },

  press: {
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
  },

  pressText: {
    fontSize: 20,
    color: Colors.first_color,
    fontWeight: "600",
    marginLeft: 5,
  },
});

export default SignUp;
