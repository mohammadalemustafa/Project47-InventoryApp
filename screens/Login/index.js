import React, { useContext, useEffect, useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../../src/components/Input";
import Button from "../../src/components/Button";
import { AllContext } from "../../src/store/context";
import Colors from "../../constant/Color";
import { getAllUsers } from "../../helpers/user";

const Login = ({ navigation }) => {
  const [allUser, setAllUser] = useState([]);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const ctx = useContext(AllContext);

  const inputHandler = (id, data) => {
    setInput({
      ...input,
      [id]: data,
    });
  };

  useEffect(() => {
    const loadData = async () => {
      await getAllUsers()
        .then((res) => {
          setAllUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loadData();
  }, []);

  const signUpScreenHandler = () => {
    navigation.replace("SIGNUP");
  };

  const loginHandler = async () => {
    const superadmin = {
      storeMan: "mustafa@gmail.com",
      password: "123456",
      role: "store manager",
    };

    const user = allUser.find((u) => u.email === input.email && u.password === input.password);
    if (user) {
      const newDet = {
        username: user.username,
        role: user.role,
      };
      await AsyncStorage.setItem("userDetails", JSON.stringify(newDet));
      ctx.login(input.email, input.password);
    } else if (superadmin.storeMan === input.email && superadmin.password === input.password) {
      const newDet = {
        username: superadmin.storeMan,
        role: superadmin.role,
      };
      await AsyncStorage.setItem("userDetails", JSON.stringify(newDet));
      ctx.login(input.email, input.password);
    } else {
      Alert.alert("Login Failed", "Invalid Credentials Try Again!");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.loginCont}>
        <Input onChangeText={inputHandler} label="Email" id="email" />
        <Input onChangeText={inputHandler} label="Password" id="password" />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button onPress={loginHandler} name="Login" />
        </View>
        <View style={styles.press}>
          <Text style={styles.signUpText}>Create Account</Text>
          <Pressable onPress={signUpScreenHandler}>
            <Text style={styles.pressText}>Sign Up</Text>
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

export default Login;
