import axios from 'axios';
const RICKAPI = 'https://rickandmortyapi.com/api/character/';

export const getRickAPI = async (gameLvl) => {
  let neededCharacters;
  if (gameLvl == 1) {
    neededCharacters = 6;
  } else if (gameLvl == 2) {
    neededCharacters = 8;
  } else if (gameLvl == 3) {
    neededCharacters = 4;
  }
  let selectedCharacters = [];

  for (let i = 0; i < neededCharacters; i++) {
    selectedCharacters.push(Math.floor(Math.random() * 826) + 1);
  }

  const apiRes = await axios.get(RICKAPI + selectedCharacters);

  let filteredApiRES = apiRes.data.map((char) => {
    return {
      id: `${char.id}`,
      image: char.image,
    };
  });

  if (gameLvl == 3) {
    filteredApiRES = filteredApiRES.concat(filteredApiRES).concat(filteredApiRES);
  } else {
    filteredApiRES = filteredApiRES.concat(filteredApiRES);
  }

  const shuffledArr = shuffle(filteredApiRES);

  let formattedArray = [];
  if (gameLvl == 1 || gameLvl == 3) {
    formattedArray = [[], [], []];
  } else {
    formattedArray = [[], [], [], []];
  }

  let counter = 0;
  shuffledArr.map((elem, i) => {
    if (i == 3 || i == 7 || i == 11) {
      formattedArray[counter].push(elem);
      counter++;
    } else {
      formattedArray[counter].push(elem);
    }
  });
  return formattedArray;
};

const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};
