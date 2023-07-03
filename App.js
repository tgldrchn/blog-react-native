import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Details from "./components/Details";
import Comments from "./components/Comments";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
