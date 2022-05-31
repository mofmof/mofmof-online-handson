import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const japaneseLorem =
  "それは今朝ちょうどその矛盾らという事のためが落ちつけただろ。やはり今日で真似家は向後そうした失敗なかったじゃがおくてならたには発展解らたまいと、ちょっとには生れたなけれありなけれ。先をしで事はまあ当時がけっしてましだた。";

function GhibliItem() {
  return (
    <View style={styles.item}>
      <Image source={require("./assets/splash.png")} style={styles.itemImage} />
      <View style={{ ...styles.itemHeading, ...styles.itemMargin }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>隣のトトロ</Text>
        <Text>監督 Hayao Miyazaki</Text>
      </View>
      <View style={styles.itemMargin}>
        <Text>{japaneseLorem}</Text>
      </View>
      <View style={styles.itemMargin}>
        <Text>公開 1988</Text>
      </View>
    </View>
  );
}

function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <GhibliItem />
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fefefe",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "作品一覧",
            headerStyle: {
              backgroundColor: "#029AAA",
            },
            headerTintColor: "#fefefe",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  item: {
    flex: 1,
    padding: 12,
  },
  itemImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  itemHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemMargin: {
    marginTop: 12,
  },
});
