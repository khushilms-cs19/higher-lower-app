import React from 'react'
import { Button, StyleSheet, Text, View, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from "../contants/colors"
import MainButton from '../components/MainButton';

const GameOver = (props) => {
    return (
            <ScrollView>
                <View style={styles.screen}>
                    <TitleText>The Game is over</TitleText>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={require("../assets/success.png")} 
                            fadeDuration={1000}
                            // source={{uri: "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg"}}
                            style={styles.image} 
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.resultTextContainer}>
                        <BodyText style={styles.resultText}>
                            Your phone needed <Text style={styles.highlight}>{props.numRounds} </Text>
                            rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                        </BodyText>
                    </View>
                    <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
                </View>
            </ScrollView>
    )
}

export default GameOver;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: "black",
        width: Dimensions.get("window").width*0.7,
        height: Dimensions.get("window").width*0.7,
        borderRadius: Dimensions.get("window").width*0.7/2,
        overflow: 'hidden',
        marginVertical: Dimensions.get("window").height/30,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get("window").height < 400 ? 16: 20,
    },
    resultTextContainer:{
        width: "80%",
        marginVertical: Dimensions.get("window").height / 60,
    },
})
