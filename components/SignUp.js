import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useContext } from "react";
import { Button, DefaultTheme, PaperProvider } from "react-native-paper";
import { Main } from "../App";
import { StyleSheet } from "react-native";
export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const { sign, setSign } = useContext(Main);

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
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
      {!pendingVerification && (
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#5d4037",
              margin: 20,
            }}
          >
            Бүртгүүлэх
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
            onPress={onSignUpPress}
            style={styles.button}
            theme={{ roundness: 1 }}
          >
            <Text style={{ color: "white" }}>Бүртгүүлэх</Text>
          </Button>
          <View style={{ flexDirection: "row" }}>
            <Button>
              <Text>Шинэ хэрэглэгч болох бол</Text>
            </Button>
            <Button onPress={() => setSign(!sign)}>
              <Text style={{ fontWeight: 800 }}>Нэвтрэх</Text>
            </Button>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View style={styles.miniContainer}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#5d4037",
              margin: 20,
            }}
          >
            Баталгаажуулах
          </Text>
          <View>
            <TextInput
              mode="outlined"
              style={styles.input}
              value={code}
              placeholder="Баталгаажуулах код"
              onChangeText={(code) => setCode(code)}
              theme={{ colors: { placeholder: styles.color } }}
            />
          </View>
          <Button
            mode="outlined"
            style={styles.button}
            theme={{ roundness: 1 }}
            onPress={onPressVerify}
          >
            <Text style={{ color: "white" }}>Баталгаажуулах</Text>
          </Button>
          <Button onPress={() => setSign(!sign)}>
            <Text style={{ fontWeight: 800 }}>Буцах</Text>
          </Button>
        </View>
      )}
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
  miniContainer: {
    marginTop: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: 350,
    height: 300,
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
    placeholder: "rgb(181, 236, 253)",
  },
});
