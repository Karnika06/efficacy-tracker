// import {StyledContainer} from './components/Styles'
import Home from "./pages/Home";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

// auth & redux
// import BasicRoute from './components/BasicRoute';
import AuthRoute from "./components/AuthRoute";
// import { connect } from 'react-redux';
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import ViewportProvider from "./viewport";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getUserById, getUserIdFromToken } from "./auth/actions/userActions";
import { connect } from "react-redux";
import { getTask } from "./auth/actions/tasksActions";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OTPVerification from "./pages/OTPVerification";
import PasswordResetDone from "./pages/PasswordResetDone";

function App({ getUserById, getTask }) {
  
  useEffect(() => {

    const { id } = getUserIdFromToken()
    if(id){
      getUserById(id)
      getTask(id)
    }
    //console.log("Hey from App.js!")

  },[])

  return (
    <>
      <ViewportProvider>

    <Router>
    <ToastContainer/>
      {/* {checked && ( */}

      <Routes>
        <Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/otpVerify/:email" element={<OTPVerification />} />
        <Route path="/resetPassword/:email" element={<ResetPassword />} />
        <Route path="/resetDone" element={<PasswordResetDone/>} />
        <Route path="/admin/*" element={<AuthRoute><Admin /></AuthRoute>} />
        <Route path="/employee/*" element={<AuthRoute><Employee /></AuthRoute>} />
        
        
      </Routes>

      {/* )} */}
      </Router>
    </ViewportProvider>
    </>
  );
}

// const mapStateToProps = ({session}) => ({
//   checked: session.checked
// })

//export default connect(mapStateToProps)(App);
//export default App;
export default connect(null, { getUserById, getTask })(App);