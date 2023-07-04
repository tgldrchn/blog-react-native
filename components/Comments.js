import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import ActivityIndicator from "react-native-paper";

const Comments = ({ navigation, route }) => {
  const { comments } = route.params;
  console.log(comments);
  if (comments === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Text>{comments} comments</Text>
    </SafeAreaView>
  );
};

export default Comments;
