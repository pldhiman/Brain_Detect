import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import NavigationBar from './components/navigation/navbar.js';
import Logo from './components/logo/logo.js';
import SignIn from './components/SignIn/signin.js';
import Signup from './components/signup/signup.js';
import ImgForm from './components/body/imageform.js';
import ImgShow from './components/body/imgshow.js';
import Rank from './components/rank/rank.js';
import {connect} from 'react-redux';
import {ActionText,ImageBox} from './redux/actions/action';
import Clarifai from 'clarifai';



const particls={
  "particles": {
    "number": {
      "value": 30,
      "density": {
        "enable": true,
        "value_area": 552.4033491425909
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
const app = new Clarifai.App({
 apiKey: '06b9b66bef864791839c7e5cdeea0e6f'
});

const mapStateToProps=(state)=>({
  urlChange:state.urlSearch,
  boxSize:state.imageBox,
});

const mapActionToProps=(dispatch)=>({
  onTextChange:(event)=>dispatch(ActionText(event.target.value)),
  onBoxUpdate:(obj)=>dispatch(ImageBox(obj)),
});

class App extends Component {
  constructor(props){
  super();
  this.state={
    url:'',
    router:'a',
    isSigned:false,
    userss:{
      id:'',
      name:'',
      email:'',
      entries:''
    }
  }
}

  imageSize=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const img=document.getElementById('imageContainer');
    const img_width=Number(img.width);
    const img_height=Number(img.height);
    return ({
            leftCol:clarifaiFace.left_col*img_width,
            rightCol:img_width-(clarifaiFace.right_col*img_width),
            topRow:clarifaiFace.top_row*img_height,
            bottomCol:img_height-(clarifaiFace.bottom_row*img_height)
            });
  }

  buttonClick=()=>{
    this.setState({url:this.props.urlChange});
    return(app.models.predict(Clarifai.FACE_DETECT_MODEL, this.props.urlChange)
                    .then(
                      (response)=> {
                          const a=this.imageSize(response);
                          this.props.onBoxUpdate(a);
                          if (this.isSigned){
                                fetch('http://localhost:3000/image',
                                {
                                  method:'put',
                                  headers:{'Content-Type':'application/json'},
                                  body:JSON.stringify({
                                    id:this.state.userss.id,
                                    })
                                })
                                .then(r=>r.json())
                                .then(data=>{
                                  this.setState({userss:data});
                                })
                          }
                        })
                      .catch((e)=>console.log(e)));
  }

  router=(text)=>{
    this.setState({router:text})
      if(this.state.router==='home'){
        this.setState({isSigned:true});
      }else if (this.state.router==='signin') {
        this.setState({isSigned:false});
      }else {
        this.setState({isSigned:false})
      }
      // this.setState({router:text})
  }


  // componentDidMount(){
  //   fetch('http://localhost:3000/').then(res=>res.json()).then(console.log);
  //
  // }
  loginUserDetailed=(userData)=>{
    this.setState({
      userss:{
        id:userData.id,
        name:userData.name,
        email:userData.email,
        entries:userData.entries
      }
    })
  }

  render() {


    return (
      <div className="App">
        <Particles params={particls} className="particle" />
      <NavigationBar routeer={this.router} isSigned={this.state.isSigned} name={this.state.userss.name}/>
        <Logo/>
        { this.state.router==="signin" ?
              <SignIn router={this.router} userData={this.loginUserDetailed}/> :
              <div>
                {
                  this.state.router==='signup'
                    ? <div>
                       <Signup router={this.router}/>
                      </div>
                    : <div>
                        <Rank rank={this.state.userss.entries} name={this.state.userss.name}/>
                        <ImgForm url={this.props.onTextChange} buttonClick={this.buttonClick}/>
                        <ImgShow imgUrl={this.state.url} boxSz={this.props.boxSize}/>
                      </div>
                }
              </div>
        }

      </div>
    );
  }
}




export default connect(mapStateToProps,mapActionToProps)(App);
