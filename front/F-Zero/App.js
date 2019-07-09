import React from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';

import LoginScreen from './src/login/login.js';
import RegisterScreen from './src/register/register.js';
import AccueilScreen from './src/accueil/accueil.js';
import LeaderScreen from './src/leaderboard/leaderboard.js';
import LeaderGameScreen from './src/leaderboard/leaderboardGame.js';
import TimePointsScreen from './src/timepoints/timepoints.js';
import TimerScreen from './src/timer/timer.js';
import TimerChronoScreen from './src/timerchrono/time.js';
import PointScreen from './src/point/point.js';
import GamePointScreen from './src/gamepoint/gamepoint.js';


export default class App extends React.Component {

  render() {
    return (
      <Root />
    );
  }
}

const RootStack = createStackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  Accueil: { screen: AccueilScreen},
  Leader: { screen: LeaderScreen},
  LeaderBoardGame: { screen: LeaderGameScreen},
  TimePoints: { screen: TimePointsScreen},
  Timer: { screen: TimerScreen},
  TimerChrono: { screen: TimerChronoScreen},
  Point: { screen: PointScreen},
  GamePoint: { screen: GamePointScreen}
},{
  initialRouteName: 'Login',
  headerMode: 'none',
});

console.disableYellowBox = true;

const Root = createAppContainer(RootStack);
