import React, { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Input from "../../src/components/Input";
import Button from "../../src/components/Button";
import Colors from "../../constant/Color";
import ModalView from "../../src/components/Modal";
import { updateProduct } from "../../helpers/database";

const EditProduct = ({ navigation, route }) => {
  const item = route.params.item;
  const [prod, setProd] = useState({
    title: "",
    price: "",
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
    setProd(item);
    navigation.setOptions({
      title: "Edit A Product",
    });
  }, []);

  const updateProductHandler = async () => {
    await updateProduct(item.id, prod)
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
        <Input value={prod.title} onChangeText={productHandler} label="Title" id="title" />
      </View>
      <Input value={prod.price.toString()} onChangeText={productHandler} keyboard="numeric" label="Price" id="price" />
      <Input value={prod.category} label="Category" id="category" editable={false} />
      <Input value={prod.image} label="Image" id="image" editable={false} />
      <View style={styles.inpCont}>
        <Text style={styles.text}>Description</Text>
        <TextInput
          onChangeText={(data) => productHandler("description", data)}
          style={styles.Input}
          numberOfLines={5}
          multiline={true}
          value={prod.description}
        />
        <Button onPress={updateProductHandler} name="Update" />
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

export default EditProduct;
