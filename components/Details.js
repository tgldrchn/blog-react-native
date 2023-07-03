import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
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
    <SafeAreaView>
      <ScrollView style={{ padding: 20 }}>
        <RenderHTML source={{ html: `${article.body_html}` }} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Details;
