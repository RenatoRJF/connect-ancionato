import Pdf from "react-native-pdf";
import { Image, StyleSheet, View, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const bibleComments = [
  {
    id: "1",
    title: "Introduçã à Bíblia",
    cover: require("@/assets/images/book-covers/intro-to-bible.png"),
  },
  {
    id: "2",
    title: "C. B. internacional",
    cover: require("@/assets/images/book-covers/comentario-biblico-internacional.png"),
  },
];

const discipleship = [
  {
    id: "1",
    title: "D. que transforma",
    cover: require("@/assets/images/book-covers/discipulado-que-transforma.png"),
  },
];

const leadership = [
  {
    id: "1",
    title: "S. estão me seguindo",
    cover: require("@/assets/images/book-covers/socorro-estao-me-seguindo.png"),
  },
];

const coaching = [
  {
    id: "1",
    title: "Guia do ancionato",
    cover: require("@/assets/images/book-covers/guia-do-ancionato.png"),
  },
];

const onlineSource = {
  uri: "../../assets/pdfs/CBIASD-gênesis.pdf",
};

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#000000", dark: "#000000" }}
      headerImage={
        <Image
          style={styles.banner}
          source={require("@/assets/images/impacto_2024.jpg")}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">Connect Ancionato</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Comentário bíblico</ThemedText>

        <FlatList
          horizontal
          data={bibleComments}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.materialCard}>
              <ThemedText style={styles.coverImageContainer}>
                <Image source={item.cover} style={styles.coverImage} />
              </ThemedText>

              <ThemedText type="defaultSemiBold" style={styles.materialTitle}>
                {item.title}
              </ThemedText>
            </View>
          )}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Discipulado</ThemedText>

        <FlatList
          horizontal
          data={coaching}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.materialCard}>
              <ThemedText style={styles.coverImageContainer}>
                <Image source={item.cover} style={styles.coverImage} />
              </ThemedText>

              <ThemedText type="defaultSemiBold" style={styles.materialTitle}>
                {item.title}
              </ThemedText>
            </View>
          )}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Liderança</ThemedText>

        <FlatList
          horizontal
          data={leadership}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.materialCard}>
              <ThemedText style={styles.coverImageContainer}>
                <Image source={item.cover} style={styles.coverImage} />
              </ThemedText>

              <ThemedText type="defaultSemiBold" style={styles.materialTitle}>
                {item.title}
              </ThemedText>
            </View>
          )}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Treinamento</ThemedText>

        <FlatList
          horizontal
          data={discipleship}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.materialCard}>
              <ThemedText style={styles.coverImageContainer}>
                <Image source={item.cover} style={styles.coverImage} />
              </ThemedText>

              <ThemedText type="defaultSemiBold" style={styles.materialTitle}>
                {item.title}
              </ThemedText>
            </View>
          )}
        />
      </ThemedView>

      <ThemedView style={styles.pdfContainerHeight}>
        <Pdf style={styles.pdfStyle} source={onlineSource} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 16,
    marginBottom: 16,
  },
  banner: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  materialCard: {
    width: 200,
    height: 300,
    marginRight: 16,
  },
  coverImageContainer: {
    width: 200,
    flex: 1,
    shadowOpacity: 0.15,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 2,
    },
  },
  coverImage: {
    width: 200,
    height: "100%",
  },
  materialTitle: {
    marginTop: 8,
  },
  pdfContainerHeight: {
    height: 300
  },
  pdfStyle: {
    flex: 1,
    alignSelf: 'stretch'
  }
});
