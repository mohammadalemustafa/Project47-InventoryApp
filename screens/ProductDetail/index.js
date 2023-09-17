import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Loader from "../../src/components/Loader";
import Colors from "../../constant/Color";

const ProductDetail = ({ navigation, route }) => {
  const [detail, setDetail] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const items = route.params.items;
    setDetail(items);
    setLoader(false);
  }, []);

  useLayoutEffect(() => {
    const items = route.params.items;
    navigation.setOptions({
      title: items.title,
    });
  }, []);

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <View style={styles.mainCont}>
          <View style={styles.imageCont}>
            <View style={styles.imageCont1}>
              <Image style={styles.img} source={{ uri: detail?.image }} />
            </View>
            <View style={styles.imageCont2}>
              <Image style={styles.img} source={{ uri: detail?.image }} />
            </View>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.title}>{detail?.title}</Text>
            <Text style={styles.desc}>{detail?.description}</Text>
            <Text style={styles.category}>Category: {detail?.category.toUpperCase()}</Text>
            <Text style={styles.price}>${detail?.price}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageCont: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 10,
  },
  imageCont1: {
    borderWidth: 2,
    borderColor: Colors.third_color,
    height: 60,
    width: 60,
    padding: 5,
    backgroundColor: Colors.white_color,
    opacity: 0.5,
  },
  imageCont2: {
    borderWidth: 1,
    borderColor: Colors.third_color,
    height: 300,
    width: 60,
    padding: 5,
    backgroundColor: Colors.white_color,
    flexGrow: 1,
  },
  img: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  bottom: {
    marginTop: 10,
  },

  title: {
    fontSize: 30,
    textDecorationLine: "underline",
    marginBottom: 10,
    color: Colors.third_color,
  },
  desc: {
    fontSize: 16,
    textAlign: "justify",
  },
  category: {
    marginTop: 10,
    fontSize: 20,
  },
  price: {
    marginTop: 20,
    fontSize: 30,
    color: Colors.third_color,
    fontWeight: "600",
  },
});

export default ProductDetail;
