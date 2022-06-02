import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type movie = {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
  image: string;
};

function HomeScreen() {
  const [movies, setMovies] = useState<movie[]>([]);

  async function getMovies() {
    try {
      const response = await fetch("https://ghibliapi.herokuapp.com/films");
      const json: movie[] = await response.json();
      setMovies(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView>
        {Boolean(movies.length) &&
          movies.map((movie: movie) => {
            return <GhibliItem {...movie} />;
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

function GhibliItem(props: movie) {
  const { original_title, director, description, release_date, image } = props;

  return (
    <View style={styles.item}>
      <Image source={{ uri: image }} style={styles.itemImage} />
      <View style={{ ...styles.itemHeading, ...styles.itemMargin }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {original_title}
        </Text>
        <Text>監督 {director}</Text>
      </View>
      <View style={styles.itemMargin}>
        <Text>{description}</Text>
      </View>
      <View style={styles.itemMargin}>
        <Text>公開 {release_date}</Text>
      </View>
    </View>
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
