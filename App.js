import { PaperProvider, Text } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "./components/Home";
import Details from "./components/Details";
import Comments from "./components/Comments";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import SignUpScreen from "./components/SignUp";
import SignInScreen from "./components/SignIn";
import { SignOut } from "./components/SignOut";

export default function App() {
  const Stack = createNativeStackNavigator();
  const StackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Comments" component={Comments} />
      </Stack.Navigator>
    );
  };

  const Tab = createBottomTabNavigator();
  const TabNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => (
              <Ionicons name="md-checkmark-circle" size={32} color="green" />
            ),
          }}
        />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  };

  const Drawer = createDrawerNavigator();
  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          component={StackNavigator}
          name="Home"
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Setting" component={Settings} />
      </Drawer.Navigator>
    );
  };
  return (
    <ClerkProvider publishableKey="pk_test_bWVhc3VyZWQtZ25hdC00Ni5jbGVyay5hY2NvdW50cy5kZXYk">
      <SignedIn>
        <PaperProvider>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </PaperProvider>
        <SignOut />
      </SignedIn>
      <SignedOut>
        <SignUpScreen />
        <SignInScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
