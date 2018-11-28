import React from 'react';

// const SignIn=({router})=>{
class SignIn extends React.Component {

          constructor(props) {
            super(props);
            this.state={
              email:'',
              password:'',
              status:''
            }
          }

          emailEntered=(e)=>{
            this.setState({email:e.target.value})
          }

          passwordEntered=(e)=>{
            this.setState({password:e.target.value})
          }

          signinButton=()=>{
                  if (this.state.email.length && this.state.password.length){
                    fetch('http://localhost:3000/signin',
                    {
                      method:'post',
                      headers:{'Content-Type':'application/json'},
                      body:JSON.stringify({
                        email:this.state.email,
                        password:this.state.password
                        })
                    })
                    .then(r=>r.json())
                    .then(data=>{
                      if(data.response==="success"){
                        this.statusUpdate("success")
                        this.props.router('home');
                        // console.log(data.user);
                        this.props.userData(data.user);
                      }else {
                        this.statusUpdate(data.response)
                      }
                    })
                  }else {
                    this.statusUpdate("Please Enter Details")
                  }
          }

          statusUpdate=(txt)=>{
            this.setState({status:txt});
          }



          render(){

            const {router}=this.props;
          return(
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
              <main className="pa4 black-80">
                      <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                          <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                          <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email-address" onChange={this.emailEntered}/>
                          </div>
                          <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                          <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.passwordEntered}/>
                          </div>
                        </fieldset>
                        <div className="lh-copy mt1">
                          <p className="f7 link red db">{`${this.state.status}`}</p>
                        </div>
                        <div className="">
                          <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.signinButton}/>
                        </div>

                        <div className="lh-copy mt3">
                          <p className="f4 black dim db grow pointer" onClick={()=>router('signup')}>Register Here</p>
                        </div>
                      </div>
              </main>
            </article>);
          };
        }

export default SignIn;
