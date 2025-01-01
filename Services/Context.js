import { createContext, useState } from 'react';
export const Context = createContext();
export const Provider = ({ children }) => {
    const [firstSelectedCharacter, setFirstSelectedCharacter] = useState(null);
    const [secondSelectedCharacter, setSecondSelectedCharacter] = useState(null);
    const [gameLvl, setGameLvl] = useState(1);
    const [nextLevel, setNextLevel] = useState(false);
    const [pairingCharArr, setPairingCharArr] = useState([]);
    const [attempts, setAttempts] = useState(3);
    const [isVisible, setIsVisible] = useState(true);

    return (
        <Context.Provider
            value={{
                gameLvl,
                setGameLvl,
                firstSelectedCharacter,
                setFirstSelectedCharacter,
                secondSelectedCharacter,
                setSecondSelectedCharacter,
                attempts,
                setAttempts,
                pairingCharArr,
                setPairingCharArr,
                nextLevel, setNextLevel,
                isVisible, setIsVisible
            }}>
            {children}
        </Context.Provider>
    );
};
