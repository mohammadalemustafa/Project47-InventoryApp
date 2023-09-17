import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { AllContext } from "../../src/store/context";
import Login from "../../screens/Login";
import ProductList from "../../screens/ProductList";
import SignUp from "../../screens/SignUp";
import ProductDetail from "../../screens/ProductDetail";
import Icon from "../../src/components/Icon";
import AddProduct from "../../screens/AddProduct";
import Colors from "../../constant/Color";
import EditProduct from "../../screens/EditProduct";
import DashboardScreen from "../../screens/Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

const BottomTabs = () => {
  const navigation = useNavigation();
  const ctx = useContext(AllContext);

  const addProductHandler = () => {
    navigation.navigate("AddProduct");
  };
  const logoutHandler = () => {
    AsyncStorage.removeItem("userDetails");
    ctx.logout();
  };
  return (
    <Bottom.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#4c669f" },
        headerTitleStyle: { color: "#fff" },
      }}>
      <Bottom.Screen
        name="Product Lists"
        component={ProductList}
        options={{
          headerRight: () => {
            return (
              <View style={{ position: "relative", marginRight: 15 }}>
                <Icon onPress={addProductHandler} name="add" color={Colors.black_color} />
              </View>
            );
          },
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Bottom.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="list" size={size} color={color} />;
          },
          headerRight: () => {
            return (
              <View style={{ position: "relative", marginRight: 15 }}>
                <Pressable style={({ pressed }) => [styles.logout, pressed ? styles.pressed : ""]} onPress={logoutHandler}>
                  <Text style={{ color: Colors.white_color, fontSize: 14 }}>Logout</Text>
                </Pressable>
              </View>
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};

const AppContent = () => {
  const ctx = useContext(AllContext);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem("userDetails");
      const parseData = JSON.parse(userData);
      setUser(parseData);
    };
    fetchData();
  }, [ctx.isLoggedIn]);

  const logoutHandler = () => {
    AsyncStorage.removeItem("userDetails");
    ctx.logout();
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#4c669f" },
        headerTitleStyle: { color: "#fff" },
      }}>
      {ctx.isLoggedIn === false && <Stack.Screen name="LOGIN" component={Login} />}
      {ctx.isLoggedIn === false && <Stack.Screen name="SIGNUP" component={SignUp} />}

      {ctx.isLoggedIn === true && (
        <>
          {user?.role === "store manager" && (
            <Stack.Screen
              name="Home"
              component={BottomTabs}
              options={{
                headerShown: false,
              }}
            />
          )}
          {user?.role !== "store manager" && (
            <Stack.Screen
              name="Home"
              component={ProductList}
              options={{
                headerRight: () => {
                  return (
                    <View style={{ position: "relative" }}>
                      <Pressable style={({ pressed }) => [styles.logout, pressed ? styles.pressed : ""]} onPress={logoutHandler}>
                        <Text style={{ color: Colors.white_color, fontSize: 14 }}>Logout</Text>
                      </Pressable>
                    </View>
                  );
                },
              }}
            />
          )}
          <Stack.Screen name="Details" component={ProductDetail} />
          <Stack.Screen name="AddProduct" component={AddProduct} />
          <Stack.Screen name="EditProduct" component={EditProduct} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  logout: {
    backgroundColor: "#d70026",
    height: 30,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default AppContent;
