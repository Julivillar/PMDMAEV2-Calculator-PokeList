import { Text, View, Image, Pressable, StyleSheet } from 'react-native';
export const PokemonCard = ({ name, sprite, navigation }) => {
  return (
    <View style={{ width: '50%', alignItems: 'center' }}>
      <Pressable
        onPress={() =>
          navigation.navigate('Card', {
            name: name,
            sprite: sprite,
          })
        }>
        <Image
          style={{
            width: 120,
            height: 120,
          }}
          source={{
            uri: sprite[0],
          }}
        />
        <Text style={styles.text}>{name}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
