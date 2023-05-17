import axios from 'axios'


export const addFeedback = (credentials, setFieldError, setSubmitting) => {

    return (dispatch) => {
  //console.log(credentials)

  let {employee_id, feedback} = credentials;

    axios.post("http://localhost:3001/feedback/addfeedback", 
    {
       employee_id: employee_id,
       feedback_data: feedback
      })
        .then((response) => {
            console.log(response)
        }).catch(err => console.error(err))    
}
}

export const getAllFeedback = () => {

    return (dispatch) => {
  
    axios.get(`http://localhost:3001/feedback/getfeedback`)
        .then((response) => {
          dispatch({
            type: 'ALL_FEEDBACK_REQUEST',
          });
          
          const feedbacks = response.data.data;
          console.log(feedbacks)

          dispatch({ type: 'ALL_FEEDBACK_SUCCESS',
            payload: feedbacks})
            
        }).catch(err => {
          console.log(err)
         
        dispatch({
          type: 'ALL_FEEDBACK_FAIL',
          payload: err.response.data.message,
        });
          
        })    
  }
  }

  export const deleteFeedback = (id,navigate) => {
    console.log(id,' deleted')

    axios.post(`http://localhost:3001/feedback/deletefeedback`, {
     id
    })
      .then((response) => {
        
          console.log(response)
          alert('Deleted selected employees')
          navigate('/admin/feedbacks')
          

      }).catch(err => {
        console.log(err)
        
      })   

  }