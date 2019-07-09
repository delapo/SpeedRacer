import React, { Component } from "react";
import styles from './style'
import Leaderboard from 'react-native-leaderboard';
import { Button } from 'react-native-elements';
import Divider from 'react-native-divider';

import {Icon,
        Item,
        List,
         ListItem} from 'native-base';

import {Keyboard,
        Text,
        View,
        TextInput,
        TouchableWithoutFeedback,
        KeyboardAvoidingView,
        AsyncStorage} from 'react-native';
import annexe from '../../annexe'
import { TouchableOpacity } from "react-native-gesture-handler";

export default class LeaderGameScreen extends Component {

    static navigationOptions = {
      header:null,
    };

    constructor(props){
        super(props)
        this.state = {
            gamer: {score: '', name: ''},
            id : this.props.navigation.state.params.id,
            user: '',
            unit: undefined,
            title: undefined,
            priv: undefined,
            data: [
            {username: '', points: ''},
            ]
        }
    }

    onGame() {
        const game = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ this.state.user.token
            },
        };
        console.log("GAME: ", game)
        fetch(annexe.ip+"getDataByGame/"+this.state.id, game)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({data : res.usernames})
                //this._storeData(JSON.stringify(res))
                //this.props.navigation.navigate('Accueil')
        }).catch((error) => console.error("Erreur Game: " ,error));

    }

    _recupUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                this.setState({user: JSON.parse(value)})
                console.log("User: ",this.state.user);

            }
        } catch (error) {
            console.error("Erreur User: ",error)
        }
    };

    renderLeaderBoard() {
        if ( this.state.data[0].points != null) {
            return(
                <View>
                <List>
                    {  this.state.data.map((item,index ) => ( 
                        item !== undefined && item !== null
                        ?  
                    <ListItem >
                        <TouchableOpacity  style={{ flexDirection: 'row' }} onPress={() =>  {console.log(item.username, item.score, item), this.setState({gamer: {score: item.points , name: item.username }})}} title="0">
                            <View style={{ width: '50%' }}>
                                <Text>
                                    <Text  style={{ fontSize: 18, fontWeight: 'bold' }}>{index+1}</Text> 
                                    <Text  style={{ fontSize: 18, }}>: {item.username} </Text>
                                </Text>
                            </View>
                            <View style={{ width: '50%', marginLeft: 50 }}>
                                <Text  style={{ fontWeight: 'bold', fontSize: 22, }}>{item.points}</Text>
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                    :
                    <View></View>
                    ) ) }
                </List>
             </View>
          )
        } else {
            return(
                <View>
                <List>
                    {  this.state.data.map((item,index ) => (
                        item !== undefined && item !== null
                        ?  
                    <ListItem >
                        <TouchableOpacity  style={{ flexDirection: 'row' }} onPress={() =>  {console.log(item.username, item.score, item), this.setState({gamer: {score: item.timer , name: item.username }})}} title="0">
                            <View style={{ width: '50%' }}>
                                <Text>
                                    <Text  style={{ fontSize: 18, fontWeight: 'bold' }}>{index+1}</Text> 
                                    <Text  style={{ fontSize: 18, }}>: {item.username} </Text>
                                </Text>
                            </View>
                            <View style={{ width: '50%', marginLeft: 50 }}>
                                <Text  style={{ fontWeight: 'bold', fontSize: 22, }}>{item.timer}</Text>
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                    :
                    <View></View>
                    ) ) }
                </List>
            </View>
            )
        }
    }

    componentDidMount = async () => {
        const user = await this._recupUser()
        this.onGame()
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.HeaderGenerique}>
                        <Text style={styles.logoText}>
                            <Text style={{color:'white'}}>LeaderBoard</Text>
                        </Text>
                        <Icon name="home" style={styles.logo} onPress={() => this.props.navigation.navigate('Accueil')}></Icon>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{flexDirection: 'row', justifyContent:'space-around', height: 50}}>
                    <Text style={styles.Score}>{this.state.gamer.score}</Text>
                    <Text style={styles.Topname}>{this.state.gamer.name}</Text>
                    {/* <Text style={styles.Topname}>{this.state.gamer.name}</Text> */}
                </View>
                <Divider borderColor="black" color="black" orientation="center"><Icon name="trophy"/></Divider>
                
                    {this.renderLeaderBoard()}
            </KeyboardAvoidingView>
      );
    }
  }

