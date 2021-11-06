import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from "../contants/colors";
import TitleText from './TitleText';
const Header = (props) => {
    return (
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        color: "black",
        fontSize: 18,
        fontFamily: "open-sans-bold",
    }
})
