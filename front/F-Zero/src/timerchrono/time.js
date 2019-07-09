import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import React, { Component } from 'react';
import styles from "./style";

import { AppRegistry, 
         Text,
         View, 
         TouchableHighlight, 
         AsyncStorage, 
         TouchableOpacity,
         TouchableWithoutFeedback,
         Keyboard,
         KeyboardAvoidingView } from 'react-native';

import { Icon } from 'native-base';
import { Button } from 'react-native-elements';
import Divider from 'react-native-divider';

export default class TimerChronoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timerStart: false,
            stopwatchStart: false,
            totalDuration: 90000,
            timerReset: false,
            stopwatchReset: false,
            temps: '00:00:00:000',
            player: [],
            maxi: 0,
            score: []
        };
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.toggleStopwatch = this.toggleStopwatch.bind(this);
        this.resetStopwatch = this.resetStopwatch.bind(this);
    }

    toggleTimer() {
        this.setState({timerStart: !this.state.timerStart, timerReset: false});
    }

    resetTimer() {
        this.setState({timerStart: false, timerReset: true});
    }

     toggleStopwatch() {
        this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    }

    resetStopwatch() {
        this.setState({stopwatchStart: false, stopwatchReset: true});
    }

    getFormattedTime(time) {
        this.currentTime = time;
    };
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
        this.resetStopwatch()
        if (this.state.maxi < this.state.player.length-1) {
            this.setState({maxi: this.state.maxi+1})
        }
        else {
            this._storeScore(this.state.score)
            this.props.navigation.navigate('Leader')
        }

    };

    addScore() {
        this.state.score.push({username: this.state.player[this.state.maxi], type : 'timer', score: this.state.temps})
    }

    componentDidMount() {
        this._recupPlayer()
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.HeaderGenerique}>
                        <Text style={styles.logoText}>
                            <Text style={{color:'white'}}>Attribute time</Text>
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <View style={styles.chrono}>
                        <Stopwatch laps msecs start={this.state.stopwatchStart}
                            reset={this.state.stopwatchReset}
                            getTime={time => {this.getFormattedTime(time)}}
                            getMsecs={time => {this.getFormattedTime(time); this.recupTime(time)}}
                            options={styles.options}/>
                    </View>
                    {!this.state.stopwatchStart ? <Icon name="md-play" style={styles.logo} onPress={this.toggleStopwatch}/> : <Icon name="md-pause" style={styles.logo} onPress={this.toggleStopwatch}/>}
                    
                    <Icon name="md-stopwatch" style={styles.logo} onPress={this.resetStopwatch}/>

                    <View style={{marginTop: 20}}>
                        <Divider borderColor="black" color="black" orientation="center" marginTop='20'>Score save</Divider>
                    </View>
                    <Text style={styles.Name}>{this.state.player[this.state.maxi]}</Text>
                    <Text style={styles.ChronoSave}>{this.state.temps}</Text>
                    <Button 
                        buttonStyle={styles.NextButton}
                        title='Next'
                        onPress={() => this.Max()}
                        />
                </View>
            </KeyboardAvoidingView>    
        );
    }
}