//import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import annexe from './annexe'
import Modal from 'react-awesome-modal';
import './assets/css/templatemo-style.css';

let colors = [
	'#FFB900',
	'#69797E',
	'#847545',
	'#E74856',
	'#0078D7',
	'#0099BC',
	'#7A7574',
	'#767676',
	'#FF8C00',
	'#E81123',
	'#0063B1',
	'#2D7D9A',
	'#5D5A58',
	'#4C4A48',
	'#F7630C',
	'#EA005E',
	'#8E8CD8',
	'#00B7C3',
	'#68768A',
	'#CA5010',
	'#C30052',
	'#6B69D6',
	'#038387',
	'#515C6B',
	'#4A5459',
	'#DA3B01',
	'#E3008C',
	'#8764B8',
	'#00B294',
	'#567C73',
	'#647C64',
	'#EF6950',
	'#BF0077',
	'#744DA9',
	'#018574',
	'#486860',
	'#525E54',
	'#D13438',
	'#C239B3',
	'#B146C2',
	'#00CC6A',
	'#498205',
	'#FF4343',
	'#9A0089',
	'#881798',
	'#10893E',
	'#107C10',
	'#7E735F'
];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {username: ""},
            hidden: true,
            login: false,
            email: "",
            password: "",
            public_game: [ {id: 0}, {isPrivate: 0}, {title: ''}, {type_pts: ''}, {user_id: 1}],
            data: [],
            unit: '',
            leaders: [],
            maxScore: 50,
            leadername: '',
            visible: false,
            username: '',
            filtered: [],
            userName: ''
        };
    }

    handleChange(e) {
        let currentList = [];
        let newList = [];

        if (e.target.value !== "") {
            currentList = this.state.public_game;
            newList = currentList.filter(item => {
                const lc = item.title.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.state.public_game;
        }
        this.setState({
            filtered: newList
        });
    }

    onLogin() {
        const login = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        };
        fetch("https://cors-anywhere.herokuapp.com/"+annexe.ip+"login", login)
        .then(res => res.json())
        .then(res => {
            localStorage.setItem('token', res.token)
            localStorage.setItem('username', res.username)
            localStorage.setItem('user_id', res.user_id)
            this.setState({user: res})
            this.setState({visible: false})
            this.setState({email: ""})
            this.setState({password: ""})
            this.setState({login: true})
        }).catch((error) => console.error("Erreur Log: " ,error));
    }

    onRegister() {
        const register = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }),
        };
        fetch("https://cors-anywhere.herokuapp.com/"+annexe.ip+"register", register)
        .then(res => res.json())
        .then(res => {
            this.onLogin()
            this.setState({log: false})
        }).catch((error) => console.error("Erreur Log: " ,error));
    }

    ongetDataPublic(event, data) {
        fetch("https://cors-anywhere.herokuapp.com/"+annexe.ip+"getDataByGameNT/"+data.id)
        .then(res => res.json())
        .then(res => {
            this.setState({data: res.usernames,
                           leadername: data.title})
            //this.tri()
        }).catch((error) => console.error("Erreur Log: " ,error));
        this.setState({unit: data.type_pts})
    }

    ongetPublicGame() {
        fetch("https://cors-anywhere.herokuapp.com/"+annexe.ip+"getPublicGameNT")
        .then(res => res.json())
        .then(res => {
            this.setState({public_game: res.public_games})
            this.setState({filtered: this.state.public_game});
        }).catch((error) => console.error("Erreur Log: " ,error));
    }

    choosePrivate() {
        if(localStorage.getItem('token') == null) {
            window.confirm("You need to be connected to acces your private game?")
        }
        else{
            const token = localStorage.getItem('token')
            const header = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+ token
                },
            };
            fetch("https://cors-anywhere.herokuapp.com/"+annexe.ip+"getPrivateGame", header)
            .then(res => res.json())
            .then(res => {
                this.setState({public_game: res.private_games})})
            this.setState({
                filtered: this.state.public_game
            });
        }
    }

    checkToken() {
        const user_id = localStorage.getItem('user_id')
        const token= localStorage.getItem('token')
        fetch("https://cors-anywhere.herokuapp.com/"+annexe.ip+"verifyUser", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ token
            },
            body: JSON.stringify({
                id: user_id,
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error == false) {
                const userNames = localStorage.getItem('username')
                if (userNames != null) {
                    this.setState({visible: false})
                    this.setState({login: true})
                }
                this.setState({userName: userNames})
            }
        }).catch((error) => console.error("Erreur Log: " ,error));
    }
    componentDidMount() {
        this.checkToken()
        this.ongetPublicGame()

    }

    tri() {
      const datas = this.state.data.sort(function (a, b) {
        //return a.title.localeCompare(b.title);
        return b.points - a.points;
      })
      this.setState({data: datas})
    }

    sortByName(key1, key2){
        return key1.username > key2.username;
    }
    sortByPoint(key1, key2){
        return key1.point > key2.point;
    }
    click(){
        //this.tri()
        if (this.state.hidden === true){
            this.setState({hidden: false})
        }
        else {
            this.setState({hidden: true})
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    onLogout() {
        this.setState({login : false})
        this.setState({user : "", userName: ''})
        localStorage.clear()
        window.location.reload();
    }

    onRegsiterorLogin() {
        if (this.state.log == true) {
        return(
            <div>
                <Modal visible={this.state.visible} width="1200" height="800" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div style={{textAlign: "center"}}>
                        <h1 style={{textAlign: "center", fontSize: 60, fontWeight: "bold", color: "#535ba0", textDecoration: "underline", marginBottom: 20}}>Create Account</h1>
                        <div>
                            <p style={{textAlign: "center", fontSize: 40, fontWeight: "bold", color: "#535ba0", textDecoration: "underline", marginTop: 40, marginBottom: 42}}>E-Mail:</p>
                            <form>
                                <input style={{textAlign: "center", fontSize: 30, height: "66px", width: "450px"}} type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                            </form>
                            <p style={{textAlign: "center", fontSize: 40, fontWeight: "bold", color: "#535ba0", textDecoration: "underline", marginTop: 40, marginBottom: 42}}>Username:</p>
                            <form>
                                <input style={{textAlign: "center", fontSize: 30, height: "66px", width: "450px"}} type="text" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                            </form>
                            <p style={{textAlign: "center", fontSize: 40, fontWeight: "bold", color: "#535ba0", textDecoration: "underline", marginTop: 40, marginBottom: 42}}>Password:</p>
                            <form>
                                <input style={{textAlign: "center", fontSize: 30, height: "66px", width: "450px"}} type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                            </form>
                            <text style={{fontSize: 34, fontWeight: "900", color: "#181818"}} onClick={(e) => { this.onRegister(e) }}>Register</text>
                        </div>
                   </div>
                </Modal>
            </div>

        )
        } else {
            return (
                <div>
                    <Modal visible={this.state.visible} width="1200" height="800" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div style={{textAlign: "center"}}>
                            <h1 style={{textAlign: "center", fontSize: 60, fontWeight: "bold", color: "#535ba0", textDecoration: "underline", marginBottom: 30}}>Your Account</h1>
                            <div>
                                <p style={{textAlign: "center", fontSize: 40, fontWeight: "bold", color: "#535ba0", textDecoration: "underline", marginTop: 40, marginBottom: 42}}>E-Mail:</p>
                                <form>
                                    <input style={{textAlign: "center", fontSize: 30, height: "66px", width: "450px"}} type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                                </form>
                                <p style={{textAlign: "center", fontSize: 40, fontWeight: "bold", color: "#535ba0", textDecoration: "underline", marginTop: 40, marginBottom: 42}}>Password:</p>
                                <form>
                                    <input style={{textAlign: "center", fontSize: 30, height: "66px", width: "450px"}} type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                                </form>
                                <text style={{fontSize: 32, fontWeight: "900", color: "#181818"}} onClick={(e) => this.onLogin(e)}>Login</text><br></br>
                                <text style={{fontSize: 34, fontWeight: "900", color: "#181818"}} onClick={(e) => this.setState({log: true})}>Register</text>
                            </div>
                            <text href="javascript:void(0);" onClick={() => this.closeModal()} style={{color: "#535ba0", fontSize: 28, fontWeight: "bold", marginTop: 20}}>Close</text>
                        </div>
                    </Modal>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="App">
                <body class="is-preload">
                <div id="wrapper">
                    <div id="main">
                        <div class="inner">
                            <header id="header">
                                <div class="logo">  
                                    <h1 style={{textAlign: "center", fontSize: 100, fontWeight: "bold", color: "white"}}>F-ZERO</h1>
                                    <div style={{marginTop: "-133px"}}>        
                                    {!this.state.login ? (<img src="https://image.flaticon.com/icons/png/512/8/8738.png" onClick={() => this.openModal()} style={{width: "50px", height: "50px", marginTop: "10px", marginRight: "10px"}}/>
                                    ) : null}
                                    {this.state.login ? (<img src="https://image.flaticon.com/icons/png/512/35/35805.png" onClick={(e) => this.onLogout()} style={{width: "50px", height: "50px", marginTop: "10px", marginRight: "10px"}}/>
                                    ) : null}
                                    </div>
                                        {this.onRegsiterorLogin()}                    
                                </div>
                            </header>
                        </div>
                        <div className="Leaderboard">
                        <h1 style={{marginTop: "-130px", fontSize: 70, color: "#535ba0", fontWeight: "bold", textAlign: 'center'}}>{this.state.leadername}</h1>
                        <hr class="shadow"></hr>
                        <div className="leaders">
                            {this.state.leaders ? (
                                this.state.data.map((el, i) => (
                                    <div className="leader" >
                                        <div className="leader-wrap">
                                            {i < 3 ? (
                                                <div
                                                    style={{
                                                        backgroundColor: colors[i]
                                                    }}
                                                    className="leader-ava"
                                                >
                                                    <svg
                                                        fill="#fff"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height={24}
                                                        width={24}
                                                        viewBox="0 0 32 32"
                                                    >
                                                        <path d="M 16 3 C 14.354991 3 13 4.3549901 13 6 C 13 7.125993 13.63434 8.112309 14.5625 8.625 L 11.625 14.5 L 7.03125 11.21875 C 7.6313215 10.668557 8 9.8696776 8 9 C 8 7.3549904 6.6450096 6 5 6 C 3.3549904 6 2 7.3549904 2 9 C 2 10.346851 2.9241199 11.470238 4.15625 11.84375 L 6 22 L 6 26 L 6 27 L 7 27 L 25 27 L 26 27 L 26 26 L 26 22 L 27.84375 11.84375 C 29.07588 11.470238 30 10.346852 30 9 C 30 7.3549901 28.645009 6 27 6 C 25.354991 6 24 7.3549901 24 9 C 24 9.8696781 24.368679 10.668557 24.96875 11.21875 L 20.375 14.5 L 17.4375 8.625 C 18.36566 8.112309 19 7.125993 19 6 C 19 4.3549901 17.645009 3 16 3 z M 16 5 C 16.564129 5 17 5.4358709 17 6 C 17 6.5641291 16.564129 7 16 7 C 15.435871 7 15 6.5641291 15 6 C 15 5.4358709 15.435871 5 16 5 z M 5 8 C 5.5641294 8 6 8.4358706 6 9 C 6 9.5641286 5.5641291 10 5 10 C 4.4358709 10 4 9.5641286 4 9 C 4 8.4358706 4.4358706 8 5 8 z M 27 8 C 27.564129 8 28 8.4358709 28 9 C 28 9.5641283 27.564128 10 27 10 C 26.435872 10 26 9.5641283 26 9 C 26 8.4358709 26.435871 8 27 8 z M 16 10.25 L 19.09375 16.4375 L 20.59375 16.8125 L 25.59375 13.25 L 24.1875 21 L 7.8125 21 L 6.40625 13.25 L 11.40625 16.8125 L 12.90625 16.4375 L 16 10.25 z M 8 23 L 24 23 L 24 25 L 8 25 L 8 23 z" />
                                                    </svg>
                                                </div>
                                            ) : null}
                                            <div className="leader-content">
                                                <div className="leader-name">{i + 1 + '. ' + el.username}</div>
                                                <div className="leader-score">
                                                    <svg
                                                        fill="currentColor"
                                                        height="20"
                                                        viewBox="0 0 493 493"
                                                        version="1.1"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M247,468 C369.05493,468 468,369.05493 468,247 C468,124.94507 369.05493,26 247,26 C124.94507,26 26,124.94507 26,247 C26,369.05493 124.94507,468 247,468 Z M236.497159,231.653661 L333.872526,231.653661 L333.872526,358.913192 C318.090922,364.0618 303.232933,367.671368 289.298112,369.742004 C275.363292,371.81264 261.120888,372.847943 246.570473,372.847943 C209.522878,372.847943 181.233938,361.963276 161.702804,340.193617 C142.17167,318.423958 132.40625,287.169016 132.40625,246.427855 C132.40625,206.805956 143.738615,175.914769 166.403684,153.753368 C189.068753,131.591967 220.491582,120.511432 260.673112,120.511432 C285.856523,120.511432 310.144158,125.548039 333.536749,135.621403 L316.244227,177.257767 C298.336024,168.303665 279.700579,163.826682 260.337335,163.826682 C237.840155,163.826682 219.820296,171.381591 206.277218,186.491638 C192.734139,201.601684 185.962702,221.915997 185.962702,247.435186 C185.962702,274.073638 191.419025,294.415932 202.331837,308.462679 C213.244648,322.509425 229.109958,329.532693 249.928244,329.532693 C260.785092,329.532693 271.809664,328.413447 283.002291,326.174922 L283.002291,274.96891 L236.497159,274.96891 L236.497159,231.653661 Z"></path>
                                                    </svg>
                                                    <div className="leader-score_title">{el.points} {el.timer} {this.state.unit}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ animationDelay: 0.4 + i * 0.2 + 's' }} className="leader-bar">
                                            <div
                                                style={{
                                                    backgroundColor: colors[i],
                                                    width: el.points / this.state.maxScore * 100 + '%'
                                                }}
                                                className="bar"
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty">Пусто</div>
                            )}
                        </div>
                    </div>

                    </div>
                    <div id="sidebar">
                        <div class="inner">
                            <section id="search" class="alt">
                                <form method="get" action="#">
                                    <input type="text" name="search" id="search" placeholder="Search..."  onChange={(e) => this.handleChange(e)} />
                                </form>
                            </section>
                            <nav id="menu">
                            <text style={{fontSize: 40, marginBottom: "10%", fontWeight: "bold", color: 'white', textAlign: "center"}}>{this.state.userName}</text>
   

                            <div className="App-public">
                                <div style={{marginLeft: "8%", marginRight: "10%", marginBottom: "10%", alignItems: "left"}}><button onClick={e => this.ongetPublicGame(e) } >Public</button> </div>
                                <div style={{marginLeft: "10%", marginRight: "10%", marginBottom: "10%", alignItems: "right"}}><button onClick={(e) => this.choosePrivate(e)} >Private</button> </div>
                            </div>

                                <ul>
                                { this.state.filtered.map(data => ( <li onClick={(e) => this.ongetDataPublic(e, data)}>
                                        <a >{data.title} #{data.id}</a>
                                        </li>
                                    )) }
                                </ul>
                            </nav>

                            <footer id="footer">
                                <p class="copyright" style={{fontSize: 20}}>Copyright <span style={{color: "#535ba0"}}>2019</span> Company F-Zero</p>
                            </footer>
                        </div>
                </div>

                </div>

                <script src="vendor/jquery/jquery.min.js"></script>
                <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                </body>
            </div>
        );
    }
}


export default App;
