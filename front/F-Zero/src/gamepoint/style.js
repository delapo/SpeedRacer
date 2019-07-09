
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
PointFormTextInput: {
  height: 44,
  fontSize: 18,
  borderRadius: 8,
  borderWidth: 1.2,
  borderColor: '#000000',
  backgroundColor: '#eeeeee',
  marginLeft: 35,
  marginRight: 35,
  marginTop: 50,
  marginBottom: 50,
  opacity:0.7,
  fontWeight: 'bold',
  textAlign: 'center',
},
NextButton: {
  marginTop: 250,
  marginLeft: 80,
  marginRight: 80,
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'white',
  backgroundColor: 'black',
  borderRadius: 15,
  borderWidth: 1.2,
},
Name: {
  marginTop: 40,
  fontSize: 26,
  fontWeight: 'bold',
  textAlign: 'center',
}
}