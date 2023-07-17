import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { StyleSheet } from "react-native";
import Blog from "./Blog";

const Home = ({ navigation }) => {
  const [article, setArticles] = useState([]);
  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=whitep4nth3r`)
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "#5d4037" }}>
      <ScrollView>
        <View style={styles.container}>
          {article.map((article) => {
            return (
              <Blog
                article={article}
                navigaion={navigation}
                key={article._id}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5d4037",
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
});
