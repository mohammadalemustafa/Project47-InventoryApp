import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Pressable } from "react-native";

import { getAllUsers, updateInventoryItem } from "../../helpers/user";
import Colors from "../../constant/Color";
import Icon from "../../src/components/Icon";

function DashboardScreen() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [active, setActive] = useState();
  const [isActive, setIsActive] = useState(false);

  const loadInventoryItems = async () => {
    const items = await getAllUsers();
    setInventoryItems(items);
  };

  useEffect(() => {
    loadInventoryItems();
  }, []);

  const handleApprove = async (itemId) => {
    setIsActive(false);
    await updateInventoryItem(itemId, "department manager");
    loadInventoryItems();
  };

  const handleDisApproved = async (itemId) => {
    setIsActive(false);
    await updateInventoryItem(itemId, "user");
    loadInventoryItems();
  };

  const activeHandler = (name) => {
    setActive(name);
    setIsActive(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={inventoryItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => activeHandler(item.username)}
            style={[styles.inventoryItem, active === item.username && isActive ? styles.activeCont : ""]}>
            <View>
              <Text style={active === item.username && isActive ? styles.activeCont : ""}>{item.email}</Text>
              <Text style={[styles.capital, active === item.username && isActive ? styles.activeCont : ""]}>
                Vendor: {item.username}
              </Text>
              <Text style={[styles.capital, active === item.username && isActive ? styles.activeCont : ""]}>
                Status: {item.role}
              </Text>
            </View>
            {active === item.username && (
              <View style={styles.iconCont}>
                {item.role === "user" && (
                  <Icon name="checkmark" onPress={() => handleApprove(item.id)} color={Colors.third_color} />
                )}
                {item.role === "department manager" && (
                  <Icon name="ios-close-outline" onPress={() => handleDisApproved(item.id)} color={Colors.third_color} />
                )}
              </View>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inventoryItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activeCont: {
    color: Colors.third_color,
  },
  iconCont: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  capital: {
    textTransform: "capitalize",
  },
});

export default DashboardScreen;
