import React, { useState, useRef, useEffect } from 'react'
import { Alert, Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
}


const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    // console.log("The current guess is: ", currentGuess);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [rounds, setRounds] = useState(0);
    const {userChoice, onGameOver} = props;
    useEffect(()=>{
        if(currentGuess === userChoice){
            onGameOver(rounds);
        }
    }, [currentGuess , userChoice, onGameOver])
    const nextGuessHandler = (direction) => {
        if ((direction === "lower" && currentGuess < props.userChoice) || (direction === "higher" && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie!", "You know this is wrong...",[
                {
                    text: "Sorry!",
                    style: "cancel",
                }
            ]);
            return;
        }
        if(direction === "lower"){
            currentHigh.current = currentGuess;
        }else{
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds((prevRounds)=> prevRounds + 1);
        setPastGuesses((curPastGuess)=>[nextNumber, ...curPastGuess]);
        console.log(pastGuesses);
    }
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer selectedNumber={currentGuess} />
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(null, "lower")} >
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(null, "higher")} >
                    <Ionicons name="md-add" size={24} color="white"/> 
                </MainButton>
            </Card>
            <View style={styles.listContainer}> 
                <ScrollView contentContainerStyle={styles.list}>
                    {
                        pastGuesses.map((guess, index)=>{
                            return <View key={index} style={styles.listItem}>
                                <BodyText>#{pastGuesses.length - index}</BodyText>
                                <Text>{guess}</Text>
                            </View>
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
        width: 300,
        maxWidth: "90%",
    },
    prevGuess: {

    },
    listContainer: {
        width: "80%",
        flex: 1,
    },
    list: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        justifyContent: "space-around",
        marginHorizontal: 20,
        width: "60%",
    }
})
