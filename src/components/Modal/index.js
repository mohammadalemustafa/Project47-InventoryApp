import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import Colors from "../../../constant/Color";

const ModalView = (props) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={false} visible={props.visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.success} source={require("../../../assets/success.gif")} />

            <Pressable onPress={props.onPress} style={[styles.button, styles.buttonClose]}>
              <Text style={styles.textStyle}>Back To Home</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 35,
    paddingBottom: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.first_color,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  success: {
    height: 150,
    width: 150,
  },
});

export default ModalView;
