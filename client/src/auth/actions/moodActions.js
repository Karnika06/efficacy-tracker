import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export const addMoodData = (credentials, setFieldError, setSubmitting) => {
  return (dispatch) => {
    //console.log(credentials)

    let { employee_id, employee_mood, mood_reason, message } = credentials;
    //console.log(credentials)

    axios
      .post(`${baseURL}/mood/addMood-data`, {
        employee_id: employee_id,
        employee_mood: employee_mood,
        mood_reasons: mood_reason,
        message: message,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status == "SUCCESS") {
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

          axios
            .get(`${baseURL}/mood/check-mood-entry`, {
              headers: {
                id: employee_id,
              },
            })
            .then((response) => {
              dispatch({
                type: "MOOD_ENTRY_REQUEST",
              });

              //console.log(response)
              const { hasEntry } = response.data;
              console.log(hasEntry);

              dispatch({ type: "MOOD_ENTRY_SUCCESS", payload: hasEntry });
            })
            .catch((err) => {
              console.error(err);
              dispatch({ type: "MOOD_ENTRY_FAIL", payload: "false" });
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
      .catch((err) => console.error(err));
  };
};
