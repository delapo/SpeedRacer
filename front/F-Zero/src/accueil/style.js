const React = require("react-native");

const { StyleSheet } = React;

export default {

containerView: {
  flex: 1,
},
loginScreenContainer: {
  flex: 1,
},
logoText: {
  fontSize: 30,
  fontWeight: "800",
  marginTop: 30,
  marginBottom: 10,
  marginLeft: 20,
},
logoName: {
  fontSize: 30,
  fontWeight: "800",
  marginTop: -50,
  marginLeft: 250,
  marginBottom: 10,
  color: 'white'
},
HeaderGenerique: {
  backgroundColor: 'black',
  opacity: 0.9,
},
body:{
  marginTop:40,
},
bodyContent: { 
  flex: 1,
  alignItems: 'center',
  padding:30,
},
item: {
  padding: 10,
  fontSize: 18,
  height: 44,
},
MainContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
},
mainButton: {
  marginRight: 15,
},
addcateButton: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    borderColor: 'white',
    backgroundColor: 'black',
    borderRadius: 15,
    borderWidth: 1.2,
},
FirstLetter: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
},
listItems: {
    fontSize: 18,
    fontWeight: 'bold',
},
}
