import { Chip } from "react-native-paper";
import * as React from "react";
import { Card, Text } from "react-native-paper";
import { Button, PaperProvider } from "react-native-paper";

const Blog = ({ article, navigaion }) => {
  return (
    <PaperProvider>
      <Card
        style={{
          width: 300,
          margin: 20,
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <Card.Title title={article.title} />
        <Card.Content>
          <Text variant="titleLarge" style={{ fontSize: 10 }}>
            {article.description}
          </Text>
        </Card.Content>
        <Card.Cover source={{ uri: article.social_image }} />
        <Card.Actions>
          <Button
            icon="information"
            style={{
              width: 200,
              borderRadius: 10,
            }}
            onPress={() => {
              navigaion.navigate("Details", {
                slug: article.slug,
              });
            }}
          >
            <Text style={{ fontWeight: 800 }}>Унших</Text>
          </Button>
        </Card.Actions>
      </Card>
    </PaperProvider>
  );
};
export default Blog;
