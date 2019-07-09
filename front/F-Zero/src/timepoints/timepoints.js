import React, { Component } from "react";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import styles from "./style";

import {Keyboard, 
        Text, 
        View, 
        TextInput, 
        TouchableWithoutFeedback, 
        KeyboardAvoidingView,
        Switch,
        Alert,
        AsyncStorage} from 'react-native';
import { Button } from 'react-native-elements';
import Divider from 'react-native-divider';
import { ScrollView } from "react-native-gesture-handler";

export default class TimePointsScreen extends Component {

    static navigationOptions = {
      header:null,
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            private: 'Public',
            game: [],
            switchValue:false,
            switchValue1:false,
            plus: 'the Highest'
        };
    }

    toggleSwitch = (value) => {
        if(value == true) {
            this.setState({private: "Private"})
        }
        else {
            this.setState({private: "Public"})
        }
        this.setState({switchValue: value})
     }

     toggleSwitch1 = (value) => {
        if(value == true) {
            this.setState({plus: "the Smallest"})
        }
        else {
            this.setState({plus: "the Highest"})
        }
        this.setState({switchValue1: value})
     }

    _storeScore = async () => {
        try{
            if (this.state.switchValue == true) {
                await AsyncStorage.multiSet([['title', this.state.name],['private', "1"]])
                .then(response => {console.log(response) })
            }else {
                await AsyncStorage.multiSet([['title', this.state.name],['private', "0"]])
                .then(response => {console.log(response) })
            }
        } catch (error) {
            console.error("Erreur Game: ",error)
        };
    }

    _storePlus = async () => {
        try{
            if (this.state.switchValue1 == true) {
                await AsyncStorage.setItem('plus', '-');
            }else {
                await AsyncStorage.setItem('plus', '+');
            }
        } catch (error) {
            console.error("Erreur Game: ",error)
        };
    }

    gamePoint = async () =>{
        if (this.state.name ==  ''){
            Alert.alert(
                'Error',
                'Give a Name',
            );
        }
        else {
            await this._storeScore()
            await this._storePlus()
            this.props.navigation.navigate('Point')
        }
    }
    gameTime  = async () => {
        if (this.state.name ==  ''){
            Alert.alert(
                'Error',
                'Give a Name',
            );
        }
        else {
            this.setState({game: [{"name": this.state.name, "private": this.state.switchValue}]})
            this._storeScore(this.state.game)
            await this._storePlus()
            this.props.navigation.navigate('Timer')
        }
    }

    render() {
        return(
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.HeaderGenerique}>
                        <Text style={styles.logoText}>
                            <Text style={{color:'white'}}>Select Your Score</Text>
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TextInput placeholder="Name of game" style={styles.GameFormTextInput}  onChange={(e) => this.setState({name: e.nativeEvent.text})}/>  
                <Text style={styles.PublicPrivate}>{this.state.private}</Text>
                <Switch
                    style={styles.switchdesign}
                    onValueChange = {this.toggleSwitch}
                    value = {this.state.switchValue}/>

                <Text style={styles.PublicPrivate}>Winner with {this.state.plus} score</Text>
                <Switch
                    style={styles.switchdesign}
                    onValueChange = {this.toggleSwitch1}
                    value = {this.state.switchValue1}/>

                <Button
                        buttonStyle={styles.GameButton}
                        title="Time"
                        onPress={() => this.gameTime() }
                />
                <View style={{marginLeft: 60,marginRight: 60}}>
                    <Divider borderColor="black" color="black" orientation="center">Or</Divider>
                </View>
                <Button
                        buttonStyle={styles.GameButton1}
                        title="Point"
                        onPress={() => this.gamePoint() }
                />
                <View style={styles.MainContainer}>
                    <Text style={styles.BackStyle} onPress={ ()=> this.props.navigation.navigate('Accueil') }>Back</Text>
                </View>
            </ScrollView>
    </KeyboardAvoidingView>
    );
  }
}