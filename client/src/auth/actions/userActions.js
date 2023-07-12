import axios from "axios";
import { useDispatch } from "react-redux";
import { sessionService } from "redux-react-session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { number } from "yup";
import { getTask } from "./tasksActions";

const baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// user actions - signup - login - logout

//axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

/**Getting username from Token */
export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  let decode = jwt_decode(token);
  return decode;
};

export const loginUser = (
  credentials,
  navigate,
  setFieldError,
  setSubmitting
) => {
  return (dispatch) => {
    let { email, password } = credentials;

    axios
      .post(`${baseURL}/user/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch({
          type: "LOGIN_REQUEST",
        });

        //console.log(response);
        const { data } = response;

        if (data.status === "FAILED") {
          const { message } = data;
          setSubmitting(false);
          if (data.error) {
            toast.error(data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }

          //checking for specific errors
          if (message.includes("email")) {
            // setFieldError("email", "This email is not available in our database.");
            // setFieldError("password", message);
            toast.error(message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else if (message.includes("password")) {
            setFieldError("password", message);
            toast.error("Invalid Password!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }

          dispatch({ type: "LOGIN_FAIL", payload: message });
        } else if (data.status === "SUCCESS") {
          const userData = data.data[0];

          const token = userData.id;
          const jwttoken = data.token;

          //console.log(userData);
          // console.log(token)
          // console.log(jwttoken)

          localStorage.setItem("token", jwttoken);
          localStorage.setItem("loggedIn", true);

          dispatch({ type: "LOGIN_SUCCESS", payload: userData });

          getTask(userData.id);

          axios
            .get(`${baseURL}/mood/check-mood-entry`, {
              headers: {
                id: userData.id,
              },
            })
            .then((response) => {
              dispatch({
                type: "MOOD_ENTRY_REQUEST",
              });

              console.log(response);
              const { hasEntry } = response.data;
              console.log(hasEntry);

              dispatch({ type: "MOOD_ENTRY_SUCCESS", payload: hasEntry });
            })
            .catch((err) => {
              console.error(err);
              dispatch({ type: "MOOD_ENTRY_FAIL", payload: "false" });
            });

          if (userData.role === "admin") {
            navigate("/admin");
            toast.success("Admin login successful", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            navigate("/employee");
            toast.success("Employee login successful", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
          //     })
          // })
          // .catch(err =>
          //     {console.error(err)
          //         dispatch({ type: 'LOGIN_FAIL',
          //         payload: err.response.data.message,})
          //     })
        }

        // complete submission
        setSubmitting(false);
      })
      .catch((err) => {
        toast.error("User doesn't exist", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error(err);
        dispatch({ type: "LOGIN_FAIL" });
      });
  };
};

export const signupUser = (
  credentials,
  navigate,
  setFieldError,
  setSubmitting
) => {
  return (dispatch) => {
    let { name, email, contact, password } = credentials;

    axios
      .post(`${baseURL}/user/signup`, {
        name: name,
        email: email,
        contact: contact,
        password: password,
      })
      .then(async (response) => {
        dispatch({
          type: "REGISTER_REQUEST",
        });

        console.log(response);
        const { data } = response;

        if (data.status === "FAILED") {
          const { message } = data;

          // checking for specific error
          if (message.includes("name")) {
            setFieldError("name", message);
          } else if (message.includes("email")) {
            setFieldError("email", message);
          } else if (message.includes("contact")) {
            setFieldError("contact", message);
          } else if (message.includes("password")) {
            setFieldError("password", message);
          }

          dispatch({ type: "REGISTER_FAIL", payload: message });

          // complete submission
          setSubmitting(false);
        } else if (data.status === "SUCCESS") {
          // after successful signup
          const { email, password } = credentials;

          axios
            .post(`${baseURL}/user/sendVerificationMail`, {
              name: name,
              email: email,
              contact: contact,
              password: password,
            })
            .then((res) => {
              console.log(res);

              if (res.data.status == "SUCCESS") {
                toast.success(res.data.msg, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });

                navigate("/login");
              } else {
                toast.error(res.data.msg, {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }

              setSubmitting(false);
            })
            .catch((error) => {
              console.log(error);
            });

          toast.success("Login with the right credentials", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          dispatch({ type: "REGISTER_SUCCESS", payload: data });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Signup unsuccessful", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
};

export const logoutUser = (navigate) => {
  // sessionService.deleteSession();
  // sessionService.deleteUser();
  toast.success("Logout successfully", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  localStorage.clear();
  navigate("/login");
  // window.location.href = 'http://localhost:3000/login';
  console.log("logout");
};

export const getAllUsers = () => {
  return (dispatch) => {
    axios
      .get(`${baseURL}/user/getallusers`)
      .then((response) => {
        dispatch({
          type: "ALL_EMPLOYEES_REQUEST",
        });
        const employees = response.data.data;
        console.log(employees);

        //dispatch({ type: "GET_TASK_DATA", todayTasks})
        dispatch({ type: "ALL_EMPLOYEES_SUCCESS", payload: employees });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "ALL_EMPLOYEES_FAIL",
          payload: err.response.data.message,
        });
      });
  };
};

export const getUserById = (id) => {
  return (dispatch) => {
    axios
      .get(`${baseURL}/user/getuserbyid/${id}`)
      .then((response) => {
        dispatch({
          type: "LOAD_USER_REQUEST",
        });
        const user = response.data.data[0];
        //console.log(user);

        //dispatch({ type: "GET_TASK_DATA", todayTasks})
        dispatch({ type: "LOAD_USER_SUCCESS", payload: user });
      })
      .catch((err) => {
        console.log(err);
        // dispatch({
        //   type: 'LOAD_USER_FAIL',
        //   payload: err.response.data.message,
        // });
      });
  };
};

export const deleteUser = (id, navigate) => {
  console.log(id, " deleted");

  axios
    .post(`${baseURL}/user/deleteuser`, {
      id,
    })
    .then((response) => {
      console.log(response.data.status);
      if (response.data.status == "SUCCESS") {
        toast.success("Deleted successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Deletion unsuccessful", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      //console.log(response)
      //alert('Deleted selected employees')
      //navigate('/admin/viewallemployees')
    })
    .catch((err) => {
      console.log(err);
      toast.error("Deletion unsuccessful", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
};

/** Update user profile function */
export const updateUser = (credentials, setFieldError, setSubmitting) => {
  return (dispatch) => {
    let {
      employee_id,
      job_role,
      team,
      gender,
      age,
      maritalStatus,
      about,
      dob,
      fb_link,
      linkedin_link,
      twitter_link,
      address,
      number,
      display_image,
    } = credentials;

    //console.log(credentials);

    const token = localStorage.getItem("token");

    axios
      .put(
        `${baseURL}/user/addotheruserdetails`,
        {
          job_role: job_role,
          team: team,
          gender: gender,
          age: age,
          marital_status: maritalStatus,
          description: about,
          dob: dob,
          fb_link: fb_link,
          linkedin_link: linkedin_link,
          twitter_link: twitter_link,
          address: address,
          contactNumber: number,
          avatar: display_image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        //console.log(response);
        //dispatch({ type: "GET_TASK_DATA", todayTasks})

        if (response.data.status == "SUCCESS") {
          //dispatch({ type: "UPDATE_USER_DATA", payload: userData})
          dispatch(getUserById(employee_id));
          toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

/**OTP generator function */
export const generateOTP = ({ email }, navigate) => {
  try {
    //const {data : { code }, status } = axios.get('${baseURL}/otp/generateOTP', { params : {email}})
    axios
      .get(`${baseURL}/otp/generateOTP`, { params: { email } })
      .then((res) => {
        const {
          data: { code },
          status,
        } = res;
        // send email with the OTP
        if (status === 201) {
          let text = `Your password recovery OTP is ${code}. Verify and recover your password.`;
          axios.post(`${baseURL}/otp/registerMail`, {
            email,
            text,
            subject: "Password Recovery OTP",
          });

          toast.success("OTP is sent to your email.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          navigate(`/otpVerify/${email}`);
        }

        if (res.data.status === "FAILED") {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Some error occurred!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });

    //return code
  } catch (error) {
    console.log(error);
  }
};

/** verify OTP */
export const verifyOTP = ({ otpCode }, email, navigate) => {
  try {
    axios
      .get(`${baseURL}/otp/verifyOTP`, {
        params: { email, otpCode },
      })
      .then((res) => {
        //console.log(res);

        if (res.data.status === "SUCCESS") {
          toast.success(res.data.msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          navigate(`/resetPassword/${email}`);
        } else {
          toast.error(res.data.error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  } catch (error) {
    console.log(error);
  }
};

/** reset Password */
export const resetPassword = (
  email,
  password,
  navigate,
  setFieldError,
  setSubmitting
) => {
  try {
    axios
      .put(`${baseURL}/user/resetpassword`, {
        email: email,
        newPassword: password,
      })
      .then((res) => {
        //console.log(res)
        //const {data, status} = res;

        if (res.data.status === "SUCCESS") {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          navigate(`/resetDone/`);
          localStorage.clear();
        } else {
          toast.error(res.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });

    //console.log('reset')
  } catch (error) {
    console.log(error);
  }
};
