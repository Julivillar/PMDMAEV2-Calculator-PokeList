import { Text, View, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { getRickAPI } from '../Services/Calls';
import { Context } from '../Services/Context';
import { CharacterCard } from '../Components/CharacterCard';

export default function Ejercicio1() {
  const { gameLvl, setGameLvl } = useContext(Context);
  const { nextLevel, setNextLevel } = useContext(Context);
  const [game, setGame] = useState([[]]);
  const { setFirstSelectedCharacter } = useContext(Context);
  const { setSecondSelectedCharacter } = useContext(Context);
  const { setPairingCharArr } = useContext(Context);
  const { attempts, setAttempts } = useContext(Context);
  const { setIsVisible } = useContext(Context);

  const handleStartGame = async () => {
    const apiResults = await getRickAPI(gameLvl);
    setTimeout(() => {
      setGame(apiResults);
    }, 1000);
  };

  useEffect(() => {
    if (attempts === 0) {
      alert('Game Over');
      setAttempts(3);
      setGame([[]]);
      setNextLevel(false);
      setGameLvl(1);
      setFirstSelectedCharacter(null);
      setSecondSelectedCharacter(null);
      setPairingCharArr([]);
    }
  }, [attempts, game]);

  const setVariables = () => {
    setIsVisible(true);
    setNextLevel(false);
    setFirstSelectedCharacter(null);
    setSecondSelectedCharacter(null);
    setPairingCharArr([]);
  };

  useEffect(() => {
    if (nextLevel) {
      if (gameLvl < 4) {
        setVariables()
        handleStartGame();
      } else {
        setVariables()
        setGameLvl(1);
        setGame([]);
        alert('you win');
      }
    }
  }, [gameLvl]);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 80,
      }}>
      <Text
        style={{ fontSize: 45, fontWeight: 'bold' }}
        onPress={handleStartGame}>
        Memory
      </Text>
      <Text>
        Attemps left: {attempts} - Level: {gameLvl}
      </Text>
      <View style={{ marginTop: 5 }}>
        {game.map((r, i) => (
          <View style={{ flexDirection: 'row' }}>
            {r.map((g, j) => (
              <View style={{ padding: 3 }}>
                <CharacterCard
                  key={g + i + j}
                  order={i + '' + j}
                  id={g.id}
                  image={g.image}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
