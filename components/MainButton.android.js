import React from 'react'
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import Colors from "../contants/colors";

const MainButton = (props) => {

    return (
        <View style={styles.buttonContainer}>
            <TouchableNativeFeedback onPress={props.onPress} activeOpacity={0.5}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default MainButton;

const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius: 25,
        overflow: "hidden",
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: "white",
        fontFamily: "open-sans",
    },
})
