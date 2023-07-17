import React, { useContext } from "react";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Main } from "../App";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { sign, setSign } = useContext(Main);
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(signIn);
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#5d4037",
      accent: "#f1c40f",
    },
  };
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "#5d4037",
            margin: 20,
          }}
        >
          Нэвтрэх
        </Text>
        <View>
          <TextInput
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="майл хаяг"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            style={styles.input}
            value={password}
            placeholder="Нууц үг"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            theme={{ colors: { placeholder: styles.color } }}
          />
        </View>
        <Button
          icon=""
          mode="outlined"
          onPress={onSignInPress}
          style={styles.button}
          theme={{ roundness: 1 }}
        >
          <Text style={{ color: "white" }}>Нэвтрэх</Text>
        </Button>
        <View style={{ flexDirection: "row" }}>
          <Button>
            <Text>Бүртгүүлж амжаагүй бол</Text>
          </Button>
          <Button onPress={() => setSign(!sign)}>
            <Text style={{ fontWeight: 800 }}>Бүртгүүлэх</Text>
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 350,
    height: 450,
    borderRadius: 10,
  },
  input: {
    width: 300,
    height: 50,
    margin: 10,
    backgroundColor: "white",
    borderWidth: 2,
    padding: 10,
    borderColor: "#5d4037",
    borderRadius: 10,
  },
  button: {
    width: 200,
    margin: 10,
    backgroundColor: "#5d4037",
    borderRadius: 10,
  },
  color: {
    placeholder: "#5d4037",
  },
});
