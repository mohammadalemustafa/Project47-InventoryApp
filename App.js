import AllContextProvider from "./src/store/context";
import AppContent from "./helpers/AppContent";
import { useEffect, useState } from "react";
import { init } from "./helpers/database";
import Loader from "./src/components/Loader";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { initializeUserTable } from "./helpers/user";

export default function App() {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    init()
      .then(setLoader(true))
      .catch((err) => {
        console.log(err);
      });

    initializeUserTable()
      .then(setLoader(true))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!loader) {
    return <Loader />;
  }

  return (
    <AllContextProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AllContextProvider>
  );
}
