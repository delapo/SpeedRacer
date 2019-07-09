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
sectionHeader: {
  margintop:10,
  paddingTop: 2,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 2,
  fontSize: 14,
  fontWeight: 'bold',
  backgroundColor: '#eeeeee',
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
GameButton: {
  marginTop: 20,
  marginLeft: 30,
  marginRight: 30,
  marginBottom: 20,
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'white',
  backgroundColor: 'black',
  borderRadius: 15,
  borderWidth: 1.2,
},
GameButton1: {
  marginTop: 20,
  marginLeft: 30,
  marginRight: 30,
  marginBottom: 40,
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'white',
  backgroundColor: 'black',
  borderRadius: 15,
  borderWidth: 1.2,
},
GameFormTextInput: {
  height: 44,
  fontSize: 20,
  borderRadius: 8,
  borderWidth: 1.2,
  borderColor: 'black',
  color: 'black',
  marginLeft: 35,
  marginRight: 35,
  marginTop: 180,
  marginBottom: 20,
  fontWeight: 'bold',
  textAlign: 'center',
},
PublicPrivate: {
  fontSize: 20,
  textAlign: 'center',
  color: 'black',
  fontWeight: 'bold',
},
switchdesign: {
  marginLeft: 50,
  marginRight: 156,
  marginTop: 10,
  marginBottom: 50,
},
BackStyle: {
  color: 'black',
  fontSize: 18,
  textDecorationLine: 'underline'
},
}
