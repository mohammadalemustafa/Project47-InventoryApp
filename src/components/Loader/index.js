import React from "react";
import { Image, StyleSheet, View } from "react-native";

const Loader = () => {
  return (
    <View style={styles.cont}>
      <Image style={styles.loader} source={require("../../../assets/loader.gif")} />
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loader: {
    height: 70,
    width: 70,
  },
});

export default Loader;
