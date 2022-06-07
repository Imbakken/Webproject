//Code from https://codesandbox.io/s/q9m26noky6?file=/src/helpers/AuthContext.js:0-638 
import React from 'react';
import api from '../api/api';
import { getToken, setToken, getUser, setUser, clearLocalStorage } from './storage';
const INITIAL_STATE = { isAuth: false, token: null, user: null, isAdmin: false, isEmployee: false };

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    const token = getToken();
    const user = getUser();
    
    if (token && user) {
      if(user.role === 'admin'){
        this.setState({ isAuth: true, token, user, isAdmin: true, isEmployee: true });
      } else if(user.role === 'employee') {
      this.setState({ isAuth: true, token, user, isEmployee: true });
      } else {
        this.setState({ isAuth: true, token, user });
        }
    } 
  }

  //setting state to correct values depending on role
  login = async (payload) => {
    try {
      const response = await api.login(payload);
      const { token, body } = response.data;
      if(body.role === 'admin'){
        this.setState({ isAuth: true, token, body, isAdmin: true, isEmployee: true }, () => {
        //callback to store token
        setToken(token);
        setUser(body);
      });
      }else if (body.role === 'employee'){
        this.setState({ isAuth: true, token, body, isEmployee: true }, () => {
          setToken(token);
          setUser(body);
        });
      } else {
        this.setState({ isAuth: true, token, body }, () => {
          setToken(token);
          setUser(body);
        });
      }
      
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  };

  logout = () => {
    this.setState({ ...INITIAL_STATE }, () => {
      clearLocalStorage();
    });
  };

  generateHeaders = () => {
    const response = {};
    //we read the token from memory and if it is not yet defined, we try with the stored token
    const token = this.state.token || getToken();

    if (token) {
      response.headers = {
        Authorization: `Bearer ${token}`
      }
    }
    return response;
  }

  isAuthFunc = () => {
    //if isAuth is false but localStorage has token, then, we return true.
    return this.state.isAuth || getToken() != null;

  }

  isEmployeeFunc = () => {
    if(!getUser() || !this.isAuthFunc()){
      return false;
    }
    else if(getUser().role === 'employee' || getUser().role === 'admin'){
      return true;
    }
  }

  isAdminFunc = () => {
    if(!getUser() || !this.isAuthFunc()){
      return false;
    } else if (getUser().role === 'admin'){
      return true;
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          isEmployee: this.state.isEmployee,
          isAdmin: this.state.isAdmin,
          isAuthFunc: this.isAuthFunc,
          isEmployeeFunc: this.isEmployeeFunc,
          isAdminFunc: this.isAdminFunc,
          token: this.state.token,
          user: this.state.user,
          login: this.login,
          logout: this.logout,
          generateHeaders: this.generateHeaders
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;
export { AuthContext, AuthProvider, AuthConsumer };