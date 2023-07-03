import { View, SafeAreaView, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";

const Blog = ({ article, navigaion }) => {
  return (
    <Card style={{ width: 300, margin: 20, padding: 10 }}>
      <Card.Title title={article.title} />
      <Card.Content>
        <Text variant="titleLarge" style={{ fontSize: 10 }}>
          {article.description}
        </Text>
      </Card.Content>
      <Card.Cover source={{ uri: article.social_image }} />
      <Card.Actions>
        <Chip
          icon="information"
          style={{ width: 200 }}
          onPress={() => {
            navigaion.navigate("Details", {
              slug: article.slug,
            });
          }}
        >
          Read More
        </Chip>
      </Card.Actions>
    </Card>
  );
};
export default Blog;
