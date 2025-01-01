import { View, Pressable, ScrollView, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { PokemonCard } from '../Components/PokemonCard';

export default function Ejercicio2({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [prevPage, setPrevPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [currentURL, setCurrentURL] = useState(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
  );
  const [existingPokeList, setExistingPokeList] = useState(false);

  useEffect(() => {
    const getList = async () => {
      const listData = await getPokeAPI(currentURL);
      setExistingPokeList(true);
      setPokemonList(listData.results);
      if (listData.previous != null) {
        setPrevPage(listData.previous);
      } else {
        setPrevPage('https://pokeapi.co/api/v2/pokemon?offset=1282&limit=20')
      }
      if (listData.next != null) {
        setNextPage(listData.next);
      } else {
        setNextPage('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      }
    };
    getList();
  }, [currentURL]);

  const getPokeAPI = async (url) => {
    return await fetch(url).then((r) => r.json());
  };

  const getImages = async (url) => {
    const pokeImages = await getPokeAPI(url);
    return [
      pokeImages.sprites.front_default,
      pokeImages.sprites.back_default,
      pokeImages.sprites.front_shiny,
      pokeImages.sprites.back_shiny,
    ];
  };

  const movePage = async () => {
    setCurrentURL(nextPage);
  };
  const backPage = async () => {
    setCurrentURL(prevPage);
  };

  return (
    <ScrollView>
      <View style={styles.page}>
        <Text style={{ fontSize: 30 }}>Pókemon</Text>
        <View style={styles.container}>
          {existingPokeList
            ? pokemonList.map(async (poke, index) => (
              <PokemonCard
                name={poke.name}
                sprite={await getImages(poke.url)}
                navigation={navigation}
              />
            ))
            : ''}
        </View>

        <View style={styles.containerButtons}>
          <Pressable style={styles.button} onPress={backPage}>
            <Text style={styles.buttonText}>Anterior</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={movePage}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    marginTop: 35,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: '30%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  containerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
