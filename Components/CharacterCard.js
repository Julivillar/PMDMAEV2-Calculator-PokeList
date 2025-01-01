import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useContext, useEffect } from 'react';
import { Context } from '../Services/Context';

export const CharacterCard = ({ id, image, order }) => {
  const { isVisible, setIsVisible } = useContext(Context);
  const { gameLvl, setGameLvl } = useContext(Context);
  const { setNextLevel } = useContext(Context);
  const { firstSelectedCharacter, setFirstSelectedCharacter } =
    useContext(Context);
  const { secondSelectedCharacter, setSecondSelectedCharacter } =
    useContext(Context);
  const { pairingCharArr, setPairingCharArr } = useContext(Context);
  const { attempts, setAttempts } = useContext(Context);

  const amount = gameLvl == 1 || gameLvl == 3 ? 12 : 16;

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  }, [isVisible]);

  useEffect(() => {
    if (pairingCharArr.length === amount) {
      setNextLevel(true);
      setGameLvl(gameLvl + 1);
      setIsVisible(false);
    }
  }, [pairingCharArr]);

  const handlePressedCharacter = (id, order) => {
    if (firstSelectedCharacter === null) {
      setFirstSelectedCharacter({ id, order });
    } else {
      if (
        firstSelectedCharacter?.id === id &&
        firstSelectedCharacter?.order !== order
      ) {
        setSecondSelectedCharacter({ id, order });
        if (gameLvl == 3) {
          if (
            secondSelectedCharacter?.id === id &&
            secondSelectedCharacter?.order !== order
          ) {
            setPairingCharArr([
              ...pairingCharArr,
              firstSelectedCharacter,
              secondSelectedCharacter,
              { id, order },
            ]);
            setFirstSelectedCharacter(null);
            setSecondSelectedCharacter(null);
          }
        } else {
          setPairingCharArr([
            ...pairingCharArr,
            firstSelectedCharacter,
            { id, order },
          ]);
          setFirstSelectedCharacter(null);
          setSecondSelectedCharacter(null);
        }
      } else {
        setSecondSelectedCharacter(null);
        setFirstSelectedCharacter(null);
        setAttempts(attempts - 1);
      }
    }
  };
  const imageStyle = (id, order) => {
    if (
      pairingCharArr?.some((char) => char.id === id || char.order === order)
    ) {
      return styles.tinyPhoto;
    }
    return isVisible ? styles.tinyPhoto : styles.tinyHiddenPhoto;
  };

  return (
    <>
      <View style={{ padding: 3 }}>
        <Pressable
          order={order}
          style={styles.characterCard}
          onPress={() => {
            handlePressedCharacter(id, order);
          }}>
          <Image
            id={id}
            style={imageStyle(id, order)}
            source={{
              uri: image,
            }}
          />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tinyPhoto: {
    width: 80,
    height: 80,
  },
  tinyHiddenPhoto: {
    width: 80,
    height: 80,
    /* opacity: 0.6, recomended use for practising*/
    display: 'none',
  },
  characterCard: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'blue',
  },
});
