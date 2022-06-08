import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';

import Projectinfo from "./components/misc/project-info.jsx";
import Joboverview from "./components/jobs/job-overview";
import Jobpage from "./components/jobs/job-page";
import Login from "./components/form/login";
import Nav from "./components/misc/navbar";
import Admin from "./components/admin/admin";
import Footer from "./components/misc/footer";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from './routes/AdminRoute';
import ForgotPassword from './components/form/forgot-password';
import ResetPassword from './components/form/reset-password';
import { AuthConsumer } from './utils/Auth';
import { AuthContext } from './utils/Auth';
import UpdateSelf from './components/employee/UpdateSelf';
import UserProfile from './components/employee/UserProfile';
import JobsInsert from './components/jobs/JobsInsert';
import UsersInsert from './components/admin/UsersInsert';
import Home from './components/misc/homepage';
import StatusCard from './components/misc/statuscard';

class App extends Component {

  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  static contextType = AuthContext;

  render() {

    return (
      <div className="App">
        <AuthConsumer>
          {({ isAuth, isAdmin, isEmployee}) => (
            <>
            <header className="App-header">
              <Nav isAuth={ isAuth } isAdmin= {isAdmin} isEmployee= {isEmployee} handleLogOut={this.handleLogOut} />
            </header>
            <main>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/info" element = {<Projectinfo/>} />
                <Route path="/login" element = {<Login />} />
                <Route path="/signup" element = {<UsersInsert />} />
                <Route path="/forgotpassword" element = {<ForgotPassword />} />
                <Route path="/reset/:token" element = {<ResetPassword />} />
                
              {/* Private routes only for logged in users */}
              <Route element={<PrivateRoute />}>
                  <Route path="/profile" element = {<UserProfile />} />
              </Route>
              <Route element={<PrivateRoute />}>
                  <Route path="/profile/update" element = {<UpdateSelf />} />
              </Route>
              <Route element={<PrivateRoute />}>
                  <Route path="/job-overview" element = {<Joboverview/>}/>
              </Route>
              <Route element={<PrivateRoute />}>
                  <Route path="/job-page/:id" element = {<Jobpage/>}/>
              </Route>
             <Route element={<PrivateRoute />}>
                  <Route path="/add-job" element={<JobsInsert />}  />
              </Route>
              
              {/* Private route only for admins */}
              <Route element={<AdminRoute/>}>
                  <Route path="/adminpage" element={<Admin />}  />
              </Route>
              <Route path="/403" element={<StatusCard statusCode={403} statusText="Forbidden" />} />
              <Route path="/404" element={<StatusCard statusCode={404} statusText="Page Not Found" />} />
              </Routes>
            </main>
            <Footer />
        </>
        )}
        </AuthConsumer>
      </div>
    );
  }
  handleLogOut () {
    this.context.logout();
    window.location.href = `/login`;
  }
}

export default App;