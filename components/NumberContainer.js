import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Card from './Card'
import Colors from "../contants/colors";


const NumberContainer = (props) => {
    return (
        <View style={styles.selectedNumberStyle}>
            <Text style={styles.number}>
                {props.selectedNumber}
            </Text>
        </View>
    )
}

export default NumberContainer;

const styles = StyleSheet.create({
    summaryContainer: {
        marginVertical: 10,
        alignItems: "center",
    },
    selectedNumberStyle: {
        borderColor: Colors.secondary,
        borderWidth: 2,
        marginVertical: 10,
        fontSize: 20,
        textAlign: "center",
        borderRadius: 10,
        padding: 10,
        color: Colors.primary,
    },
    number: {
        color: Colors.secondary,
        fontSize: 20,
    }
})
