import React, { Component } from "react";
import styles from './style'
import Leaderboard from 'react-native-leaderboard';
import { Button } from 'react-native-elements';
import { Icon, List, ListItem } from 'native-base';
import {Keyboard,
        Text,
        View,
        TouchableWithoutFeedback,
        TouchableOpacity,
        KeyboardAvoidingView,
        AsyncStorage,
        BackHandler} from 'react-native';
import Divider from 'react-native-divider';
import annexe from '../../annexe'

export default class LeaderScreen extends Component {

    static navigationOptions = {
      header:null,
    };

    constructor(props){
        super(props)
        this.state = {
            plus: '',
            gamer: {score: '', name: ''},
            user: '',
            unit: undefined,
            title: undefined,
            priv: undefined,
            data: [
            {username: '', score: ''},
            ]
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('backPress');
      }
      
      // some more code
      
      componentWillUnmount() {
        BackHandler.removeEventListener('backPress');
      }

    _recupInfo = async () =>{
        try {
            const value = await AsyncStorage.multiGet(['title', 'private', 'unit', 'plus']).then(response => {
                this.setState({title: response[0][1]})
                this.setState({priv: response[1][1]})
                this.setState({unit: response[2][1]})
                this.setState({plus: response[3][1]})
                console.log(response[0][0]) // Key1
                console.log(response[0][1]) // Value1
                console.log(response[1][0]) // Key2
                console.log(response[1][1]) // Value2
                console.log(response[3][0]) // Key2
                console.log(response[3][1]) // Value2
            })
            if (value !== null) {
                //this.setState({data: JSON.parse(value)})
                
            }
        } catch (error) {
            console.error("Erreur Recuperation Info: ",error)
        }
    }
    _recupScore = async () => {
        try {
            const value = await AsyncStorage.getItem('score');
            if (value !== null) {
                this.setState({data: JSON.parse(value)})
                console.log("Score", value);
            }
        } catch (error) {
            console.error("Erreur Tableau Player: ",error)
        }
    };

    tri() {
        if (this.state.plus == '+') {
            const datas = this.state.data.sort(function (a, b) {
                return b.score - a.score;
            })
            this.setState({data: datas})
        } else {
            const datas = this.state.data.sort(function (a, b) {
                return a.score - b.score;
            })
            this.setState({data: datas})
        }
    }
    sortByPoint(key1, key2){
          return key1.point > key2.point;
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

    NewGame() {
        console.log(this.state.plus)
        console.log(this.state.data)
        const game = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ this.state.user.token
            },
            body: JSON.stringify({
                title: this.state.title,
                type_pts: this.state.unit,
                isPrivate: this.state.priv,
                data: this.state.data
            }),
        };
        console.log("GAME: ", game)
        fetch(annexe.ip+"createGame", game)
        .then(res => res.json())
        .then(res => {
            console.log(res)
                //this._storeData(JSON.stringify(res))
                //this.props.navigation.navigate('Accueil')
        }).catch((error) => console.error("Erreur Log: " ,error));

    }

    componentDidMount = async () => {
        const info = await this._recupInfo()
        const user = await this._recupUser()
        const score = await this._recupScore()
        await this.tri()
        console.log("Separation")
        this.NewGame()
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
                <List>
                    {  this.state.data.map((item,index ) => ( 
                    item !== undefined && item !== null
                    ?  
                    <ListItem >
                        <TouchableOpacity style={{ flexDirection: 'row' }}  onPress={() =>  {console.log(item.username, item.score, item), this.setState({gamer: {score: item.score , name: item.username }})}} title="0">
                        <View style={{ width: '50%' }}>
                                <Text>
                                    <Text  style={{ fontSize: 18, fontWeight: 'bold' }}>{index+1}</Text> 
                                    <Text  style={{ fontSize: 18, }}>: {item.username} </Text>
                                </Text>
                            </View>
                            <View style={{ width: '50%', marginLeft: 50 }}>
                                <Text  style={{ fontWeight: 'bold', fontSize: 22, }}>{item.score}</Text>
                            </View>
                        </TouchableOpacity>
                    </ListItem>
                    : <View></View>
                    ) ) }
                </List>
            </KeyboardAvoidingView>
        );
    }
}

