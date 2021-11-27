import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import Card from '../components/Card'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import Colors from "../contants/colors"
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton';
import { Dimensions } from 'react-native'


const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width/4);
    let confirmedOutput = null;
    const numberInputHandler = (inputValue) => {
        setEnteredValue(inputValue.replace(/[^0-9]/g, ""));
    }
    const resetInputHandler = () => {
        confirmedOutput = null;
        setConfirmed(false);
        setEnteredValue("");
    }
    const confirmInputHandler = () => {
        // if(enteredValue === ""){
        //     Alert.alert(
        //         "Invalid Input!!",
        //         "Please enter a value.",
        //         [{
        //             text: "Okay",
        //             style: "destructive",
        //             onPress: resetInputHandler,
        //         }]       
        //     )
        // }
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                "Invalid input!",
                "Input has to be a number.",
                [{
                    text: "Okay",
                    style: "destructive",
                    onPress: resetInputHandler,
                }]
            );
            return;
        }
        setConfirmed(true);
        setEnteredValue("");
        setSelectedNumber(chosenNumber);
    }
    useEffect(()=>{
        const updateLayout = ()=> {
            setButtonWidth(Dimensions.get("window").width / 4);
        }
        Dimensions.addEventListener("change",updateLayout);
        return ()=>{
            Dimensions.removeEventListener("change",updateLayout);
        }
    })
    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text>
                    You Selected :
                </Text>
                <NumberContainer selectedNumber={selectedNumber} />
                {/* <Button title="Start Game" onPress={() => props.onStartGame(selectedNumber)} /> */}
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
            </Card>
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType='number-pad' maxLength={2} onChangeText={numberInputHandler} value={enteredValue} />
                            <View style={styles.buttonContainer}>
                                <View style={{...styles.button, width: buttonWidth}}>
                                    <Button title="Reset" color={Colors.secondary} onPress={resetInputHandler} />
                                </View>
                                <View style={{...styles.button, width: buttonWidth}}>
                                    <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler} />
                                </View>
                            </View>
                        </Card>
                        {
                            confirmed &&
                            confirmedOutput
                        }
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "open-sans-bold",
    },
    inputContainer: {
        minWidth: 300,
        maxWidth: "95%",
        width: "80%",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    button: {
        width: Dimensions.get("window").width/4,
        borderRadius: 30,

        overflow: 'hidden',
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: "white",
        elevation: 5,
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginVertical: 10,
        alignItems: "center",
    },
    selectedNumberStyle: {
        backgroundColor: Colors.primary,
        // width: 60,
        marginVertical: 10,
        fontSize: 20,
        textAlign: "center",
    }
})
