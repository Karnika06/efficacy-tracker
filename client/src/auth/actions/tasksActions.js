import axios from 'axios'
import { useDispatch } from 'react-redux'
import {sessionService} from 'redux-react-session'
// user actions - signup - login - logout
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  const baseURL = process.env.REACT_APP_SERVER_DOMAIN

export const addTask = (credentials, setFieldError, setSubmitting, navigate) => {

    return (dispatch) => {

    let {
        employee_id,
        task_name,
        status,
        duration,
        priority,
        level,
        dueDate,
        startDate,
        task_desc
      } = credentials;

    axios.post(`${baseURL}/task/addtask`, 
    {
        employee_id: employee_id,
        task_name: task_name,
        status: status,
        duration: duration,
        priority: priority,
        level: level,
        dueDate: dueDate,
        startDate: startDate,
        task_desc: task_desc
      })
        .then((response) => {
            //console.log(response)
            if(response.data.status == 'SUCCESS') {

              toast.success('Task Added successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                })
            } else {
              toast.error("Task can't be added. Today's task limit reached", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                })

            }
            //navigate("todaysTasks")
        }).catch(err => console.error(err))    
}
}

export const getTask = (employee_id) => {

  return (dispatch) => {

    //console.log('inside gettask')
  axios.get(`${baseURL}/task/gettask/${employee_id}`)
      .then((response) => {
        dispatch({
          type: 'ALL_TASKS_REQUEST',
        });
        const todayTasks = response.data.data;
        
          //dispatch({ type: "GET_TASK_DATA", todayTasks})
          dispatch({ type: 'ALL_TASKS_SUCCESS',
            payload: todayTasks})

      }).catch(err => {
        console.log(err)
        dispatch({
          type: 'ALL_TASKS_FAIL',
          payload: err.response.data.message,
        });
      })    
}
}

export const updateTask = (credentials, setOpenPopup, setFieldError, setSubmitting, navigate) => {
  return (dispatch) => {
    let {
      task_id,
      task_name,
      status,
      duration,
      priority,
      level,
      dueDate,
      startDate,
      task_desc,
      employee_id
    } = credentials;

    //console.log(credentials);

    axios.patch(`${baseURL}/task/updatetask/${task_id}`, {
      task_name: task_name,
      task_status: status,
      task_duration: duration,
      task_priority: priority,
      task_level: level,
      dueDate: dueDate,
      startDate: startDate,
      task_desc: task_desc,
    })
      .then((response) => {
        console.log(response);
        setOpenPopup(false)
        toast.success('Task Updated successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        getTask(employee_id); // Call getTask() here

        // Additional code here
      })
      .catch(err => {
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // Additional code here
      });
  };
};


// export const deleteTask = () => {

//   return (dispatch) => {
// console.log("inside actions")

//   axios.get("${baseURL}/task/gettask")
//       .then((response) => {
//         dispatch({
//           type: 'ALL_TASKS_REQUEST',
//         });
//         const todayTasks = response.data.data;
//           console.log(todayTasks)

//           //dispatch({ type: "GET_TASK_DATA", todayTasks})
//           dispatch({ type: 'ALL_TASKS_SUCCESS',
//             payload: todayTasks})

//       }).catch(err => {
//         console.log(err)
//         dispatch({
//           type: 'ALL_TASKS_FAIL',
//           payload: err.response.data.message,
//         });
//       })    
// }
// }

