import {
  DefaultTheme,
  NavigationContainer,
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type Movie = {
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
  movie_banner: string;
};

type ItemProp = {
  isBannerVisible: boolean;
  isShortDescription: boolean;
} & Movie;

type RootStackParamsList = {
  Home: undefined;
  Detail: ItemProp;
};

type HomeProps = NativeStackScreenProps<RootStackParamsList, "Home">;
type DetailProps = NativeStackScreenProps<RootStackParamsList, "Detail">;

function HomeScreen({ navigation }: HomeProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  async function getMovies() {
    try {
      const response = await fetch("https://ghibliapi.herokuapp.com/films");
      const json: Movie[] = await response.json();
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
          movies.map((movie: Movie, index: number) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Detail", {
                    ...movie,
                    isBannerVisible: true,
                    isShortDescription: false,
                  })
                }
                activeOpacity={1}
                key={index}
              >
                <GhibliItem
                  {...movie}
                  isBannerVisible={false}
                  isShortDescription={true}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

function GhibliItem(props: ItemProp) {
  const {
    original_title,
    director,
    description,
    release_date,
    image,
    movie_banner,
    isBannerVisible,
    isShortDescription,
  } = props;
  const fixedDescription = isShortDescription
    ? `${description.slice(0, 100)} ...`
    : description;

  return (
    <View style={styles.item}>
      <Image source={{ uri: image }} style={styles.itemImage} />
      <View style={{ ...styles.itemHeading, ...styles.itemMargin }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {original_title}
        </Text>
        <Text>?????? {director}</Text>
      </View>
      <View style={styles.itemMargin}>
        <Text>{fixedDescription}</Text>
      </View>
      <View style={styles.itemMargin}>
        <Text>?????? {release_date}</Text>
      </View>
      {isBannerVisible && (
        <View style={styles.itemMargin}>
          <Image source={{ uri: movie_banner }} style={styles.itemImage} />
        </View>
      )}
    </View>
  );
}

function Detail() {
  const route = useRoute<DetailProps["route"]>();

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView>
        <GhibliItem {...route.params} />
      </ScrollView>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator<RootStackParamsList>();
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
            title: "????????????",
            headerStyle: {
              backgroundColor: "#029AAA",
            },
            headerTintColor: "#fefefe",
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={({ route }) => ({
            title: route.params.original_title,
            headerStyle: {
              backgroundColor: "#029AAA",
            },
            headerTintColor: "#fefefe",
          })}
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
    borderBottomColor: "#DADADA",
    borderBottomWidth: 1,
  },
  itemImage: {
    width: "100%",
    height: 200,
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
