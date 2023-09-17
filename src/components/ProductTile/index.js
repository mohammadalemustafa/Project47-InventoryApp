import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constant/Color";
import Icon from "../Icon";
import { useNavigation } from "@react-navigation/native";
import { deleteProduct } from "../../../helpers/database";
import ModalView from "../Modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductTile = ({ items }) => {
  const navigation = useNavigation();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [user, setUser] = useState();
  const fetchData = async () => {
    const user = await AsyncStorage.getItem("userDetails");
    const parseData = JSON.parse(user);
    setUser(parseData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateToEdit = () => {
    navigation.navigate("EditProduct", { item: items });
  };
  const deleteHandler = async () => {
    await deleteProduct(items.id)
      .then(() => {
        setModalIsVisible(true);
      })
      .catch((err) => console.log(err));
  };

  const backToHome = () => {
    setModalIsVisible(false);
    navigation.navigate("Home");
  };
  return (
    <>
      <View style={styles.tile}>
        {user?.role === "store manager" && (
          <View style={styles.icon}>
            <Icon onPress={navigateToEdit} name="create" color="green" />
            <Icon onPress={deleteHandler} name="close-circle-sharp" color="#d70026" />
          </View>
        )}
        <View style={{ height: 140, width: "100%", backgroundColor: "#fff" }}>
          <Image style={{ objectFit: "contain", height: "100%", width: "100%" }} source={{ uri: items.image }} />
        </View>
        <Text style={styles.title}>{items.title.length > 15 ? items.title.slice(0, 13).trim() + "..." : items.title}</Text>
        <Text style={styles.price}>${items.price}</Text>
      </View>
      <ModalView visible={modalIsVisible} onPress={backToHome} />
    </>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: "100%",
    height: 200,
    borderColor: Colors.second_color,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "relative",
  },
  title: {
    fontSize: 16,
    color: Colors.third_color,
    textAlign: "justify",
  },
  price: {
    fontSize: 16,
    color: Colors.third_color,
  },
  icon: {
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 10,
    left: 10,
    width: "100%",
  },
});

export default ProductTile;
