import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ProductTile from "../../src/components/ProductTile";
import Loader from "../../src/components/Loader";
import { fetchData } from "../../helpers/database";
import { useIsFocused } from "@react-navigation/native";

const ProductList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    setLoader(true);
    const fetchedData = async () => {
      await fetchData()
        .then((res) => {
          setData(res);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (isFocused) {
      fetchedData();
    }
  }, [isFocused]);

  const onProductDetailHandler = (items) => {
    navigation.navigate("Details", { items: items });
  };

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <>
          {data.length == 0 && (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 20 }}>No Data!</Text>
            </View>
          )}
          {data.length >= 1 && (
            <View style={styles.mainCont}>
              <FlatList
                data={data}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={(itemData) => {
                  return (
                    <Pressable
                      onPress={() => onProductDetailHandler(itemData.item)}
                      style={({ pressed }) => [styles.tileCont, pressed ? styles.pressed : ""]}>
                      <ProductTile items={itemData.item} />
                    </Pressable>
                  );
                }}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  },
  tileCont: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 4,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default ProductList;
