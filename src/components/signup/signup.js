import React from 'react';

class Signup extends React.Component {
      constructor() {
        super();
        this.state={
          name:'',
          email:'',
          password:''
        }
      }
      nameReg=(e)=>{
        this.setState({name:e.target.value});
      }
      emailReg=(e)=>{
        this.setState({email:e.target.value})
      }
      passwordReg=(e)=>{
        this.setState({password:e.target.value})
      }
      onRegisterButtonClick=()=>{
        // console.log(this.state);
        const {name,email,password}=this.state;
        if (name.length!==0 && email.length!==0 && password!==0){
          fetch('http://localhost:3000/register',
          {
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              name:this.state.name,
              email:this.state.email,
              password:this.state.password
              })
          })
          .then(r=>r.json())
          .then(data=>{
            if(data==="You are Register"){
              this.props.router('signin');}
          })
        }else {
          console.log("kuchh to kr");
        }
      }

      render(){
        // const {router}=this.props;
              return(
                <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                  <main className="pa4 black-80">
                          <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                              <legend className="f4 fw6 ph0 mh0">Register</legend>
                              <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="text" onChange={this.nameReg}/>
                              </div>
                              <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.emailReg}/>
                              </div>
                              <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.passwordReg}/>
                              </div>
                            </fieldset>
                            <div className="">
                              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onRegisterButtonClick}/>
                            </div>
                          </div>
                  </main>
                </article>);
              }
};

export default Signup;
