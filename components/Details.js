import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { ActivityIndicator, Button, PaperProvider } from "react-native-paper";
import RenderHTML from "react-native-render-html";

const Details = ({ navigation, route }) => {
  const { slug } = route.params;
  const [article, setArticles] = useState([]);

  useEffect(() => {
    fetch(`https://dev.to/api/articles/whitep4nth3r/${slug}`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);
  if (article.body_html === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  return (
    <PaperProvider>
      <SafeAreaView>
        <Button
          icon="comment"
          style={{
            width: 150,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() =>
            navigation.navigate("Comments", {
              comments: article.comments_count,
            })
          }
        >
          comments
        </Button>
        <ScrollView style={{ padding: 20 }}>
          <RenderHTML source={{ html: `${article.body_html}` }} />
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};
export default Details;
