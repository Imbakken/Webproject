import React from 'react';
import { Link } from "react-router-dom";
import { Component } from 'react';
import { AuthContext } from '../../utils/Auth';

class Login extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showError: false,
            showNullError: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    //Sending the login information to the authproviders login function to set token
    //together with isAuth, isEmployee and isAdmin
    handleLogIn = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const payload = { email, password };
        const response = await this.context.login(payload);
        if(response.token){
            window.location.href = `/job-overview`;
        }else if(response.error.error === 'error'){
            this.setState({
                showError: true
            });
        }  
    };

    render() {
        const { showError} = this.state;
        return (
                <div className='formbox'>
                    <h1>Find a second examiner for your course</h1>
                    <div className='form'>
                    <form onSubmit={this.handleLogIn} method="post">
                    <h2>Log in</h2>
                    <div className="formfields">
                        <label>Email: 
                        <input required name="email" type="email" value={this.state.email} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="formfields">
                        <label>Password: 
                        <input required name="password" type="password" value={this.state.password} onChange={this.handleInputChange}/>
                        </label>
                    </div>
                    <div className="button">
                    <input type="submit" value="Log in" id="button-primary" />
                    </div>
                    {showError && (
                        <div>
                            <p>
                                Wrong password or email!
                            </p>
                        </div>
                    )}
                    <div className="formlinks">
                    <p><Link to="/signup">Sign Up</Link></p>
                    <p><Link to="/forgotpassword">Forgot password?</Link></p>
                    </div>
                    </form>
                    </div>
                </div>
        )
    };
}

export default Login;
