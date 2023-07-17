import { useAuth } from "@clerk/clerk-expo";
import { Avatar, Button, Card, Text } from "react-native-paper";

export const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <Card
      style={{
        width: 100,
        height: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
      }}
      onPress={() => {
        signOut();
      }}
    >
      <Text style={{ color: "#5d4037", fontWeight: 800 }}>Sign Out</Text>
    </Card>
  );
};
