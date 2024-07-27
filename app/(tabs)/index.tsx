import Pdf from "react-native-pdf";
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  Modal,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";

interface MaterialData {
  id: string;
  title: string;
  pdfUrl: string;
  cover: ImageSourcePropType;
}

const bibleComments: MaterialData[] = [
  {
    id: "1",
    title: "Introduçã à Bíblia",
    cover: require("@/assets/images/book-covers/intro-to-bible.png"),
    pdfUrl:
      "https://connect-ancionato.s3.eu-central-1.amazonaws.com/CBIASD-ge%CC%82nesis.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaDGV1LWNlbnRyYWwtMSJIMEYCIQDVnJupFoG4cUgnFeKPjfroIF%2FJLpmkS7t%2BJs5HR7Z2ugIhAKQwAXCic39S9ppCcOBQ%2Be97ZRPfhZsGU4Q5u1YO0%2BpIKvECCN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNTc4MjgxOTM0MjY2Igx6IO9rOOpV45%2FBwWUqxQK2W2Wbq58ZMQrCmZ2OVIN9bOIMR6dngKID1mpiacqeEnij825Q%2BVT8PpVO9b%2BUzdx3xwdIA4ADVmEVYtgyX3ePfnhsovi6angxtSbsskjVsK4DZIFAwWxVeIG1g5K%2F8DVOHLe4PdQ%2FpsK%2FhpgClpJP96ewlLrotzoud%2BWxFIhsCI8Y69TfDHENEZ9xgjt%2BM6Fulwb%2BbLveAZ87stqb0FtsZqPGK8hl3Gr7wLcSNU5mZyj8GSmUg3STI0XTL9iCaH9egmPDvv4GZds5J1%2BuMfgx4qpekwBYqAO53GY2jk61SGmsuSKGXI4Jpm4vQMnwrDqvgxRc6Obz6wG3CioNgsaL3P6fC17jHPZYBerKaSDKHWrH034bPwNeNMgQ3FfVHkomUbdLCGEJKwfN%2Fjz5rXi3SHdV8Rfh%2B0zZklCz%2BMfhhpx7PDUFMPn4j7UGOrICOcWyF0XnOWcfm952u8g%2FqiITidaIirbmF1Aa5ta9ELOYX8KPbBJ%2FgMlGs1iXF4%2FbG9eNwU3qqus0ZGKPEsufsfmZ3EW4%2Fa9stuhNISLlT0ViUqYom6XQpEA1K4Ei38XAUXq1mrsctI8JU5NsorLg4WGRKA%2Bh0qjkweNv7j8T1XNCCWH82815SjOnfZjO0SMz0hi1h7fxHl856YqY267roGCTIktLnO3QnFCLksplgyBlSnrCzOSnAEBuAPczK3qsef2VRvoyxTPsNd4UrZBlx9atIEuHbdb9%2FJ2Mz%2F8FgQUBibGM%2B%2BG%2FoxEoRj3EYDk72KhV1Bbgt2XdyCCG4CNWuTqaiPa3U3vLnAmm3JC8a8obNQ7O3GFYyYz2iouzVAYzEfP5UM2gxdmcDNZtvShlRT%2F1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240726T194745Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYNJCKBW5OWFVYU4U%2F20240726%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=69eddb71258b728c903b531646097a35ce7a6af722149da5fa5ef8fb9300ec89",
  },
  {
    id: "2",
    title: "C. B. internacional",
    cover: require("@/assets/images/book-covers/comentario-biblico-internacional.png"),
    pdfUrl:
      "https://connect-ancionato.s3.eu-central-1.amazonaws.com/CBIASD-ge%CC%82nesis.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaDGV1LWNlbnRyYWwtMSJIMEYCIQDVnJupFoG4cUgnFeKPjfroIF%2FJLpmkS7t%2BJs5HR7Z2ugIhAKQwAXCic39S9ppCcOBQ%2Be97ZRPfhZsGU4Q5u1YO0%2BpIKvECCN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNTc4MjgxOTM0MjY2Igx6IO9rOOpV45%2FBwWUqxQK2W2Wbq58ZMQrCmZ2OVIN9bOIMR6dngKID1mpiacqeEnij825Q%2BVT8PpVO9b%2BUzdx3xwdIA4ADVmEVYtgyX3ePfnhsovi6angxtSbsskjVsK4DZIFAwWxVeIG1g5K%2F8DVOHLe4PdQ%2FpsK%2FhpgClpJP96ewlLrotzoud%2BWxFIhsCI8Y69TfDHENEZ9xgjt%2BM6Fulwb%2BbLveAZ87stqb0FtsZqPGK8hl3Gr7wLcSNU5mZyj8GSmUg3STI0XTL9iCaH9egmPDvv4GZds5J1%2BuMfgx4qpekwBYqAO53GY2jk61SGmsuSKGXI4Jpm4vQMnwrDqvgxRc6Obz6wG3CioNgsaL3P6fC17jHPZYBerKaSDKHWrH034bPwNeNMgQ3FfVHkomUbdLCGEJKwfN%2Fjz5rXi3SHdV8Rfh%2B0zZklCz%2BMfhhpx7PDUFMPn4j7UGOrICOcWyF0XnOWcfm952u8g%2FqiITidaIirbmF1Aa5ta9ELOYX8KPbBJ%2FgMlGs1iXF4%2FbG9eNwU3qqus0ZGKPEsufsfmZ3EW4%2Fa9stuhNISLlT0ViUqYom6XQpEA1K4Ei38XAUXq1mrsctI8JU5NsorLg4WGRKA%2Bh0qjkweNv7j8T1XNCCWH82815SjOnfZjO0SMz0hi1h7fxHl856YqY267roGCTIktLnO3QnFCLksplgyBlSnrCzOSnAEBuAPczK3qsef2VRvoyxTPsNd4UrZBlx9atIEuHbdb9%2FJ2Mz%2F8FgQUBibGM%2B%2BG%2FoxEoRj3EYDk72KhV1Bbgt2XdyCCG4CNWuTqaiPa3U3vLnAmm3JC8a8obNQ7O3GFYyYz2iouzVAYzEfP5UM2gxdmcDNZtvShlRT%2F1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240726T194745Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYNJCKBW5OWFVYU4U%2F20240726%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=69eddb71258b728c903b531646097a35ce7a6af722149da5fa5ef8fb9300ec89",
  },
];

const discipleship: MaterialData[] = [
  {
    id: "1",
    title: "D. que transforma",
    cover: require("@/assets/images/book-covers/discipulado-que-transforma.png"),
    pdfUrl:
      "https://connect-ancionato.s3.eu-central-1.amazonaws.com/CBIASD-ge%CC%82nesis.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaDGV1LWNlbnRyYWwtMSJIMEYCIQDVnJupFoG4cUgnFeKPjfroIF%2FJLpmkS7t%2BJs5HR7Z2ugIhAKQwAXCic39S9ppCcOBQ%2Be97ZRPfhZsGU4Q5u1YO0%2BpIKvECCN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNTc4MjgxOTM0MjY2Igx6IO9rOOpV45%2FBwWUqxQK2W2Wbq58ZMQrCmZ2OVIN9bOIMR6dngKID1mpiacqeEnij825Q%2BVT8PpVO9b%2BUzdx3xwdIA4ADVmEVYtgyX3ePfnhsovi6angxtSbsskjVsK4DZIFAwWxVeIG1g5K%2F8DVOHLe4PdQ%2FpsK%2FhpgClpJP96ewlLrotzoud%2BWxFIhsCI8Y69TfDHENEZ9xgjt%2BM6Fulwb%2BbLveAZ87stqb0FtsZqPGK8hl3Gr7wLcSNU5mZyj8GSmUg3STI0XTL9iCaH9egmPDvv4GZds5J1%2BuMfgx4qpekwBYqAO53GY2jk61SGmsuSKGXI4Jpm4vQMnwrDqvgxRc6Obz6wG3CioNgsaL3P6fC17jHPZYBerKaSDKHWrH034bPwNeNMgQ3FfVHkomUbdLCGEJKwfN%2Fjz5rXi3SHdV8Rfh%2B0zZklCz%2BMfhhpx7PDUFMPn4j7UGOrICOcWyF0XnOWcfm952u8g%2FqiITidaIirbmF1Aa5ta9ELOYX8KPbBJ%2FgMlGs1iXF4%2FbG9eNwU3qqus0ZGKPEsufsfmZ3EW4%2Fa9stuhNISLlT0ViUqYom6XQpEA1K4Ei38XAUXq1mrsctI8JU5NsorLg4WGRKA%2Bh0qjkweNv7j8T1XNCCWH82815SjOnfZjO0SMz0hi1h7fxHl856YqY267roGCTIktLnO3QnFCLksplgyBlSnrCzOSnAEBuAPczK3qsef2VRvoyxTPsNd4UrZBlx9atIEuHbdb9%2FJ2Mz%2F8FgQUBibGM%2B%2BG%2FoxEoRj3EYDk72KhV1Bbgt2XdyCCG4CNWuTqaiPa3U3vLnAmm3JC8a8obNQ7O3GFYyYz2iouzVAYzEfP5UM2gxdmcDNZtvShlRT%2F1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240726T194745Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYNJCKBW5OWFVYU4U%2F20240726%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=69eddb71258b728c903b531646097a35ce7a6af722149da5fa5ef8fb9300ec89",
  },
];

const leadership: MaterialData[] = [
  {
    id: "1",
    title: "S. estão me seguindo",
    cover: require("@/assets/images/book-covers/socorro-estao-me-seguindo.png"),
    pdfUrl:
      "https://connect-ancionato.s3.eu-central-1.amazonaws.com/CBIASD-ge%CC%82nesis.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaDGV1LWNlbnRyYWwtMSJIMEYCIQDVnJupFoG4cUgnFeKPjfroIF%2FJLpmkS7t%2BJs5HR7Z2ugIhAKQwAXCic39S9ppCcOBQ%2Be97ZRPfhZsGU4Q5u1YO0%2BpIKvECCN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNTc4MjgxOTM0MjY2Igx6IO9rOOpV45%2FBwWUqxQK2W2Wbq58ZMQrCmZ2OVIN9bOIMR6dngKID1mpiacqeEnij825Q%2BVT8PpVO9b%2BUzdx3xwdIA4ADVmEVYtgyX3ePfnhsovi6angxtSbsskjVsK4DZIFAwWxVeIG1g5K%2F8DVOHLe4PdQ%2FpsK%2FhpgClpJP96ewlLrotzoud%2BWxFIhsCI8Y69TfDHENEZ9xgjt%2BM6Fulwb%2BbLveAZ87stqb0FtsZqPGK8hl3Gr7wLcSNU5mZyj8GSmUg3STI0XTL9iCaH9egmPDvv4GZds5J1%2BuMfgx4qpekwBYqAO53GY2jk61SGmsuSKGXI4Jpm4vQMnwrDqvgxRc6Obz6wG3CioNgsaL3P6fC17jHPZYBerKaSDKHWrH034bPwNeNMgQ3FfVHkomUbdLCGEJKwfN%2Fjz5rXi3SHdV8Rfh%2B0zZklCz%2BMfhhpx7PDUFMPn4j7UGOrICOcWyF0XnOWcfm952u8g%2FqiITidaIirbmF1Aa5ta9ELOYX8KPbBJ%2FgMlGs1iXF4%2FbG9eNwU3qqus0ZGKPEsufsfmZ3EW4%2Fa9stuhNISLlT0ViUqYom6XQpEA1K4Ei38XAUXq1mrsctI8JU5NsorLg4WGRKA%2Bh0qjkweNv7j8T1XNCCWH82815SjOnfZjO0SMz0hi1h7fxHl856YqY267roGCTIktLnO3QnFCLksplgyBlSnrCzOSnAEBuAPczK3qsef2VRvoyxTPsNd4UrZBlx9atIEuHbdb9%2FJ2Mz%2F8FgQUBibGM%2B%2BG%2FoxEoRj3EYDk72KhV1Bbgt2XdyCCG4CNWuTqaiPa3U3vLnAmm3JC8a8obNQ7O3GFYyYz2iouzVAYzEfP5UM2gxdmcDNZtvShlRT%2F1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240726T194745Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYNJCKBW5OWFVYU4U%2F20240726%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=69eddb71258b728c903b531646097a35ce7a6af722149da5fa5ef8fb9300ec89",
  },
];

const coaching: MaterialData[] = [
  {
    id: "1",
    title: "Guia do ancionato",
    cover: require("@/assets/images/book-covers/guia-do-ancionato.png"),
    pdfUrl:
      "https://connect-ancionato.s3.eu-central-1.amazonaws.com/CBIASD-ge%CC%82nesis.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaDGV1LWNlbnRyYWwtMSJIMEYCIQDVnJupFoG4cUgnFeKPjfroIF%2FJLpmkS7t%2BJs5HR7Z2ugIhAKQwAXCic39S9ppCcOBQ%2Be97ZRPfhZsGU4Q5u1YO0%2BpIKvECCN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNTc4MjgxOTM0MjY2Igx6IO9rOOpV45%2FBwWUqxQK2W2Wbq58ZMQrCmZ2OVIN9bOIMR6dngKID1mpiacqeEnij825Q%2BVT8PpVO9b%2BUzdx3xwdIA4ADVmEVYtgyX3ePfnhsovi6angxtSbsskjVsK4DZIFAwWxVeIG1g5K%2F8DVOHLe4PdQ%2FpsK%2FhpgClpJP96ewlLrotzoud%2BWxFIhsCI8Y69TfDHENEZ9xgjt%2BM6Fulwb%2BbLveAZ87stqb0FtsZqPGK8hl3Gr7wLcSNU5mZyj8GSmUg3STI0XTL9iCaH9egmPDvv4GZds5J1%2BuMfgx4qpekwBYqAO53GY2jk61SGmsuSKGXI4Jpm4vQMnwrDqvgxRc6Obz6wG3CioNgsaL3P6fC17jHPZYBerKaSDKHWrH034bPwNeNMgQ3FfVHkomUbdLCGEJKwfN%2Fjz5rXi3SHdV8Rfh%2B0zZklCz%2BMfhhpx7PDUFMPn4j7UGOrICOcWyF0XnOWcfm952u8g%2FqiITidaIirbmF1Aa5ta9ELOYX8KPbBJ%2FgMlGs1iXF4%2FbG9eNwU3qqus0ZGKPEsufsfmZ3EW4%2Fa9stuhNISLlT0ViUqYom6XQpEA1K4Ei38XAUXq1mrsctI8JU5NsorLg4WGRKA%2Bh0qjkweNv7j8T1XNCCWH82815SjOnfZjO0SMz0hi1h7fxHl856YqY267roGCTIktLnO3QnFCLksplgyBlSnrCzOSnAEBuAPczK3qsef2VRvoyxTPsNd4UrZBlx9atIEuHbdb9%2FJ2Mz%2F8FgQUBibGM%2B%2BG%2FoxEoRj3EYDk72KhV1Bbgt2XdyCCG4CNWuTqaiPa3U3vLnAmm3JC8a8obNQ7O3GFYyYz2iouzVAYzEfP5UM2gxdmcDNZtvShlRT%2F1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240726T194745Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYNJCKBW5OWFVYU4U%2F20240726%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=69eddb71258b728c903b531646097a35ce7a6af722149da5fa5ef8fb9300ec89",
  },
];

const onlineSource = {
  cache: true,
  uri: "https://connect-ancionato.s3.eu-central-1.amazonaws.com/CBIASD-ge%CC%82nesis.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaDGV1LWNlbnRyYWwtMSJIMEYCIQDVnJupFoG4cUgnFeKPjfroIF%2FJLpmkS7t%2BJs5HR7Z2ugIhAKQwAXCic39S9ppCcOBQ%2Be97ZRPfhZsGU4Q5u1YO0%2BpIKvECCN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQAhoMNTc4MjgxOTM0MjY2Igx6IO9rOOpV45%2FBwWUqxQK2W2Wbq58ZMQrCmZ2OVIN9bOIMR6dngKID1mpiacqeEnij825Q%2BVT8PpVO9b%2BUzdx3xwdIA4ADVmEVYtgyX3ePfnhsovi6angxtSbsskjVsK4DZIFAwWxVeIG1g5K%2F8DVOHLe4PdQ%2FpsK%2FhpgClpJP96ewlLrotzoud%2BWxFIhsCI8Y69TfDHENEZ9xgjt%2BM6Fulwb%2BbLveAZ87stqb0FtsZqPGK8hl3Gr7wLcSNU5mZyj8GSmUg3STI0XTL9iCaH9egmPDvv4GZds5J1%2BuMfgx4qpekwBYqAO53GY2jk61SGmsuSKGXI4Jpm4vQMnwrDqvgxRc6Obz6wG3CioNgsaL3P6fC17jHPZYBerKaSDKHWrH034bPwNeNMgQ3FfVHkomUbdLCGEJKwfN%2Fjz5rXi3SHdV8Rfh%2B0zZklCz%2BMfhhpx7PDUFMPn4j7UGOrICOcWyF0XnOWcfm952u8g%2FqiITidaIirbmF1Aa5ta9ELOYX8KPbBJ%2FgMlGs1iXF4%2FbG9eNwU3qqus0ZGKPEsufsfmZ3EW4%2Fa9stuhNISLlT0ViUqYom6XQpEA1K4Ei38XAUXq1mrsctI8JU5NsorLg4WGRKA%2Bh0qjkweNv7j8T1XNCCWH82815SjOnfZjO0SMz0hi1h7fxHl856YqY267roGCTIktLnO3QnFCLksplgyBlSnrCzOSnAEBuAPczK3qsef2VRvoyxTPsNd4UrZBlx9atIEuHbdb9%2FJ2Mz%2F8FgQUBibGM%2B%2BG%2FoxEoRj3EYDk72KhV1Bbgt2XdyCCG4CNWuTqaiPa3U3vLnAmm3JC8a8obNQ7O3GFYyYz2iouzVAYzEfP5UM2gxdmcDNZtvShlRT%2F1&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240726T194745Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYNJCKBW5OWFVYU4U%2F20240726%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=69eddb71258b728c903b531646097a35ce7a6af722149da5fa5ef8fb9300ec89",
};

export default function HomeScreen() {
  const [currentPdfUrl, setCurrentPdfUrl] = useState<MaterialData | null>(null);

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
      <ThemedText type="title" style={styles.sectionTitle}>
        Connect Ancionato
      </ThemedText>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Comentário bíblico
        </ThemedText>

        <FlatList
          horizontal
          data={bibleComments}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<View style={{ width: 16 }} />}
          ListFooterComponent={<View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <View style={styles.materialCard}>
              <Pressable
                style={styles.coverImageContainer}
                onPress={() => setCurrentPdfUrl(item)}
              >
                <Image source={item.cover} style={styles.coverImage} />
              </Pressable>

              <ThemedText type="defaultSemiBold" style={styles.materialTitle}>
                {item.title}
              </ThemedText>
            </View>
          )}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Discipulado
        </ThemedText>

        <FlatList
          horizontal
          data={coaching}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<View style={{ width: 16 }} />}
          ListFooterComponent={<View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <View style={styles.materialCard}>
              <Pressable
                style={styles.coverImageContainer}
                onPress={() => setCurrentPdfUrl(item)}
              >
                <Image source={item.cover} style={styles.coverImage} />
              </Pressable>

              <ThemedText type="defaultSemiBold" style={styles.materialTitle}>
                {item.title}
              </ThemedText>
            </View>
          )}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Liderança
        </ThemedText>

        <FlatList
          horizontal
          data={leadership}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<View style={{ width: 16 }} />}
          ListFooterComponent={<View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <View style={styles.materialCard}>
              <Pressable
                style={styles.coverImageContainer}
                onPress={() => setCurrentPdfUrl(item)}
              >
                <Image source={item.cover} style={styles.coverImage} />
              </Pressable>

              <ThemedText type="defaultSemiBold" style={styles.materialTitle}>
                {item.title}
              </ThemedText>
            </View>
          )}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Treinamento
        </ThemedText>

        <FlatList
          horizontal
          data={discipleship}
          keyExtractor={({ id }) => id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={<View style={{ width: 16 }} />}
          ListFooterComponent={<View style={{ width: 16 }} />}
          renderItem={({ item }) => (
            <View style={styles.materialCard}>
              <Pressable
                style={styles.coverImageContainer}
                onPress={() => setCurrentPdfUrl(item)}
              >
                <Image source={item.cover} style={styles.coverImage} />
              </Pressable>

              <ThemedText type="defaultSemiBold" style={styles.materialTitle}>
                {item.title}
              </ThemedText>
            </View>
          )}
        />
      </ThemedView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={Boolean(currentPdfUrl)}
        onRequestClose={() => setCurrentPdfUrl(null)}
      >
        <View style={styles.modalHeader}>
          <View style={styles.headerContent}>
            <ThemedText type="subtitle" style={styles.headerTitle}>
              Hello World!
            </ThemedText>

            <Pressable onPress={() => setCurrentPdfUrl(null)}>
              <Ionicons name="close-circle" size={32} />
            </Pressable>
          </View>
        </View>

        <View style={styles.modalContent}>
          <Pdf style={styles.pdfStyle} source={onlineSource} />
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    paddingHorizontal: 32,
  },
  banner: {
    left: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  materialCard: {
    width: 200,
    height: 300,
    marginLeft: 16,
  },
  coverImageContainer: {
    flex: 1,
    width: 200,
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
    height: 400,
  },
  pdfStyle: {
    flex: 1,
    alignSelf: "stretch",
  },
  modalContent: {
    flex: 1,
  },
  modalHeader: {
    height: 100,
    paddingBottom: 12,
    paddingHorizontal: 16,
    justifyContent: "flex-end",
    backgroundColor: "#ffffff",
  },
  headerContent: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
  },
});
