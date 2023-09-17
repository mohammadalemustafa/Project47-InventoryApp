import React, { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Input from "../../src/components/Input";
import Button from "../../src/components/Button";
import Colors from "../../constant/Color";
import axios from "axios";
import ModalView from "../../src/components/Modal";
import { insertData } from "../../helpers/database";

const AddProduct = ({ navigation }) => {
  const [prod, setProd] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const productHandler = (id, value) => {
    setProd({
      ...prod,
      [id]: value,
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add A New Product",
    });
  }, []);

  const addProductHandler = async () => {
    await insertData(prod)
      .then((res) => {
        setModalIsVisible(true);
      })
      .catch((err) => console.log(err));
  };

  const backToHome = () => {
    setModalIsVisible(false);
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.cont}>
      <View style={{ marginTop: 10 }}>
        <Input onChangeText={productHandler} label="Title" id="title" />
      </View>
      <Input onChangeText={productHandler} keyboard="numeric" label="Price" id="price" />
      <Input onChangeText={productHandler} label="Category" id="category" />
      <Input onChangeText={productHandler} label="Image" id="image" />
      <View style={styles.inpCont}>
        <Text style={styles.text}>Description</Text>
        <TextInput
          onChangeText={(data) => productHandler("description", data)}
          style={styles.Input}
          numberOfLines={5}
          multiline={true}
        />
        <Button onPress={addProductHandler} name="Save" />
      </View>
      <ModalView visible={modalIsVisible} onPress={backToHome} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    marginHorizontal: 10,
  },
  inpCont: {
    marginBottom: 10,
  },
  Input: {
    height: "auto",
    width: "100%",
    borderColor: Colors.second_color,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 20,
    backgroundColor: Colors.white_color,
    borderRadius: 5,
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
    color: Colors.third_color,
  },
});

export default AddProduct;
