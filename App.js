import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
//components
import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameOver from './screens/GameOver';


const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
}

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);
    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    }
    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    }
    const gameOverHandler = (numOfRounds) => {
        setGuessRounds(numOfRounds);
    }
    if(!dataLoaded){
        return <AppLoading startAsync={fetchFonts} onFinish={()=>setDataLoaded(true)} onError={(err)=> console.log(err)}/>
    }
    let content = <StartGameScreen onStartGame={startGameHandler} />;
    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
    } else if (guessRounds > 0) {
        content = <GameOver numRounds={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
    }
    return (
        <View style={styles.screen}>
            <Header title="Guess a Number." />
            {
                content
                // <GameOver numRounds={1} userNumber={1} onRestart={configureNewGameHandler} />
            }
            {/* <StartGameScreen />
            <GameScreen /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
});
