import { Text, Image, View, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

export const Card = ({ route, navigation }) => {
  const { name, sprite } = route.params;
  const [pokeImage, setPokeImage] = useState(0);

  const handleBackBtn = () => {
    pokeImage == 0 ? setPokeImage(3) : setPokeImage(pokeImage - 1);
  };
  const handleNextBtn = () => {
    pokeImage == 3 ? setPokeImage(0) : setPokeImage(pokeImage + 1);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ width: '50%', alignItems: 'center' }}>
          <Text style={styles.text} onPress={() => navigation.goBack()}>
            {name}
          </Text>
          <Image
            style={{
              display: 'flex',
              width: 120,
              height: 120,
            }}
            source={{
              uri: sprite[pokeImage],
            }}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={handleBackBtn}>
          <Text style={styles.buttonText}>Anterior</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={handleNextBtn}>
            Siguiente
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 12,
  },
});
