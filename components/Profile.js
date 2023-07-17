import { Avatar, Button, Card, Text } from "react-native-paper";
import { TextInput } from "react-native";
import { Modal, Portal, PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { SignOut } from "./SignOut";
import { useState } from "react";

const Profile = () => {
  const { user } = useUser();
  const [visible, setVisible] = useState(false);
  const [lastName, setlastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const email = user.emailAddresses.find((e) => e.emailAddress);

  if (!user) {
    return null;
  }

  const updateUser = async () => {
    await user.update({
      firstName: firstName,
      lastName: lastName,
    });
    user.reload();
    setVisible(false);
  };
  return (
    <PaperProvider>
      <SafeAreaView
        style={{
          backgroundColor: "#5d4037",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ backgroundColor: "white" }}>
          <Card.Content
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              size={150}
              source={{
                url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              }}
            />
            <Button icon="camera" onPress={showModal} />
          </Card.Content>
          <Card.Content
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              padding: 10,
              flexDirection:
                "column                                                                                                              ",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              style={{
                borderRadius: 10,
                flexDirection: "row",
                width: 300,
                height: 50,
                margin: 10,
              }}
            >
              <Card.Content style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#5d4037",
                    fontWeight: 700,
                  }}
                >
                  email:
                </Text>
                <Text> {email.emailAddress}</Text>
              </Card.Content>
            </Card>
            <Card
              style={{
                borderRadius: 10,
                flexDirection: "row",
                width: 300,
                height: 50,
                margin: 10,
              }}
            >
              <Card.Content style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#5d4037",
                    fontWeight: 700,
                  }}
                >
                  firstname:
                </Text>
                <Text> {user.firstName}</Text>
              </Card.Content>
            </Card>
            <Card
              style={{
                borderRadius: 10,
                flexDirection: "row",
                width: 300,
                height: 50,
                margin: 10,
              }}
            >
              <Card.Content style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#5d4037",
                    fontWeight: 700,
                  }}
                >
                  lastname:
                </Text>
                <Text> {user.lastName}</Text>
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>
        <SignOut />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <TextInput
              placeholder="firstname"
              onChangeText={(e) => setFirstName(e)}
              style={{
                width: 300,
                height: 50,
                margin: 10,
                backgroundColor: "white",
                borderWidth: 2,
                padding: 10,
                borderColor: "#5d4037",
                borderRadius: 10,
              }}
            ></TextInput>
            <TextInput
              placeholder="lastname"
              onChangeText={(e) => setlastName(e)}
              style={{
                width: 300,
                height: 50,
                margin: 10,
                backgroundColor: "white",
                borderWidth: 2,
                padding: 10,
                borderColor: "#5d4037",
                borderRadius: 10,
              }}
            ></TextInput>
            <Button
              onPress={updateUser}
              style={{
                width: 200,
                margin: 10,
                backgroundColor: "#5d4037",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "white" }}>edit</Text>
            </Button>
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};
export default Profile;
