import React, { Component } from "react";
import styles from './style'
import {Keyboard, 
        Text, 
        View, 
        TextInput, 
        TouchableWithoutFeedback, 
        KeyboardAvoidingView,
        RefreshControl,
        TouchableOpacity,
        AsyncStorage} from 'react-native';
import { Button } from 'react-native-elements';

export default class GamePointScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            player: [],
            maxi: 0,
            score: []
        };
    }

    recupTime(time) {
        if (this.state.temps != time && this.state.stopwatchStart == false) {
            this.setState({temps: time})
        }
    };

    _storeScore = async (data) => {
        try{
            await AsyncStorage.setItem('score', JSON.stringify(data))
        } catch (error) {
            console.error(error)
        };
    }
    _recupPlayer = async () => {
        try {
            const value = await AsyncStorage.getItem('player');
            if (value !== null) {
                this.setState({player: JSON.parse(value)})
                console.log(this.state.player);
            }
        } catch (error) {
            console.error("Erreur Tableau Player: ",error)
        }
    };

    Max(){
        this.addScore()
        this.setState({points: 0})
        if (this.state.maxi < this.state.player.length-1) {
            this.setState({maxi: this.state.maxi+1})
        }
        else {
            this._storeScore(this.state.score)
            this.props.navigation.navigate('Leader')
        }

    };

    addScore() {
        this.state.score.push({"username": this.state.player[this.state.maxi], type : 'points', "score": this.state.points})
    }

    componentDidMount() {
        this._recupPlayer()
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior='padding'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.HeaderGenerique}>
                        <Text style={styles.logoText}>
                            <Text style={{color:'white'}}>Attribute score</Text>
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.Name}>Player - {this.state.player[this.state.maxi]}</Text>
                <TextInput keyboardType='numeric' placeholder='Player points' placeholderTextColor='black' style={styles.PointFormTextInput} value={this.state.points}
                                onChange={(e) => this.setState({points: e.nativeEvent.text})}/>
                <Button 
                        buttonStyle={styles.NextButton}
                        title='Next'
                        onPress={() => this.Max()}
                        />
            </KeyboardAvoidingView>
        );
    }
}