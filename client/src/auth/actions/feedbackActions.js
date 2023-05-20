import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


const baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export const addFeedback = (credentials, setFieldError, setSubmitting) => {
  return (dispatch) => {
    //console.log(credentials)

    let { employee_id, feedback } = credentials;

    axios
      .post(`${baseURL}/feedback/addfeedback`, {
        employee_id: employee_id,
        feedback_data: feedback,
      })
      .then((response) => {
        toast.success("Feedback Added succesfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          })
      })
      .catch((err) => {
        //console.error(err)
        toast.error("Error occurred while adding!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          })});
  };
};

export const getAllFeedback = () => {
  return (dispatch) => {
    axios
      .get(`${baseURL}/feedback/getfeedback`)
      .then((response) => {
        dispatch({
          type: "ALL_FEEDBACK_REQUEST",
        });

        const feedbacks = response.data.data;
        //console.log(feedbacks);

        dispatch({ type: "ALL_FEEDBACK_SUCCESS", payload: feedbacks });

      })
      .catch((err) => {
        //console.log(err);
        toast.error("Error in fetching data!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          })
        dispatch({
          type: "ALL_FEEDBACK_FAIL",
          payload: err.response.data.message,
        });
      });
  };
};

export const deleteFeedback = (id, navigate) => {
  console.log(id, " deleted");

  axios
    .post(`${baseURL}/feedback/deletefeedback`, {
      id,
    })
    .then((response) => {
      //console.log(response);
      alert("Deleted selected employees");
      navigate("/admin/feedbacks");
    })
    .catch((err) => {
      //console.log(err);
      toast.error("Error in deleting data!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
    });
};
