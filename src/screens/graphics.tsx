import { SafeAreaView, StyleSheet, Text, ScrollView, Image, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCustomFonts } from '../hooks/useCustomFonts'
import Cards from '../components/cards'
import GoBack from '../components/go-back'
import colors from '../assets/themes/colors'
import { getFontSize } from '../utils/getFontSize'

// assets
import graphics1 from "../assets/images/graphics-1.png";
import graphics2 from "../assets/images/graphics-2.png";
import graphics3 from "../assets/images/graphics-3.png";

const Graphics = () => {
  const { fontsLoaded, onLayoutRootView } = useCustomFonts();
  const cardDetails = [
    { img: graphics1, header: "Sexual activity", subText: "Here, you can track your protected sexual activity" },
    { img: graphics2, header: "Check ups", subText: "Here, you can track your unprotected sexual activity" },
    { img: graphics3, header: "Regular Check ups", subText: "Here, you can track your regular check ups" },
    { img: graphics3, header: "Emergency Check ups", subText: "Here, you can track your emergency check ups" }
  ]

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
      <StatusBar style='auto' />

      <ScrollView showsVerticalScrollIndicator={false}>
       <GoBack />

        <Text style={styles.text}>
          Sexual activity charts/graphics
        </Text>

        {cardDetails.map((item, index)=> {
          const { header, img, subText } = item;
          const words = subText.split(" "); 

          const formattedWords: any = [];

          words.forEach((word, index) => {
            if (index === 5) {
              formattedWords.push(<Text key={index} style={{ fontFamily: "pro-black" }}>{word}</Text>);
            } else {
              formattedWords.push(<Text key={index}>{word}</Text>);
            }

            // Add a space after each word except the last one
            if (index < words.length - 1) {
              formattedWords.push(" "); // Space as a string
            }
          });

          return(
            <View key={index} style={styles.card_container}>
              <Cards>
                <View style={{ flexDirection: "row", alignItems: "center", columnGap: 25 }}>
                  <Image style={{ width: "15%", objectFit: "cover" }} source={img} />
                  <Text style={styles.header}>{header}</Text>
                </View>

                <Text style={{ paddingVertical: "2%", fontSize: getFontSize(0.019), fontFamily: "pro-light" }}>{formattedWords}</Text>
              </Cards>
            </View>
          );
        })}
        <View style={{ marginVertical: "2%" }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Graphics

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%"
  },
  text: {
    color: colors.black, 
    fontFamily: "pro-black", 
    textTransform: "uppercase",
    fontSize: getFontSize(0.045), 
    paddingVertical: "5%", 
    marginBottom: "4%"
  },
  card_container: {
    marginBottom: "5%"
  },
  header: {
    fontFamily: "pro-bold",
    fontSize: getFontSize(0.023)
  }
})