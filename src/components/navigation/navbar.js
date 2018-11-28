import React from 'react';
import './navbar.css';

class NavigationBar extends React.Component{
  constructor() {
    super();
    this.state={
      hover:false
    }
  }
  onHov=(bool)=>{
    this.setState({hover:bool})
  }

  render(){
    const {routeer,isSigned}=this.props;

    if(isSigned){
      return (
          <div>
              { this.state.hover ? <nav style={{display:'flex',justifyContent:'flex-end'}} className='pt3 pr3'>
                                        <div className='back' onMouseLeave={()=>this.onHov(false)}>
                                            <img className='pt2 img glow br-pill center' src={`https://www.w3schools.com/howto/img_avatar.png`} width='50px' height='50px' alt="avatar"  />
                                            <p className='f6 b center link dim black pointer' onClick={()=>routeer('signin')}>Sign Out</p>
                                            <p className='f7 pt0 '>({this.props.name})</p>
                                        </div>
                                    </nav>
                                :   <div style={{display:'flex',justifyContent:'flex-end',height:'136px'}} className='pt3 pr3'>
                                        <img className='pt2 pr3 img glow br-pill ' src={`https://www.w3schools.com/howto/img_avatar.png`} width='50px' height='50px' alt="avatar"  onMouseEnter={this.onHov} />
                                    </div>
              }
          </div>
        )}
          else {
            return (
              <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p className='f3 link underline dim black pr3 pointer' onClick={()=>routeer('signin')} >Sign In</p>
                <p className='f3 link underline dim black pr3 pointer' onClick={()=>routeer('signup')} >Register</p>
              </nav>
            );
          }
        }
}
export default NavigationBar;
