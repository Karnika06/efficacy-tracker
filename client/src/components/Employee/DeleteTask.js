import axios from 'axios';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import ConfirmDialog from '../Shared/ConfirmDialog';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { getTask } from '../../auth/actions/tasksActions';


function DeleteTask({id}) {

  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''});

  const deleteTask = () => {
    console.log('deleted')
    setConfirmDialog({...confirmDialog, isOpen: false})

    axios.delete(`http://localhost:3001/task/deletetask/${id}`)
      .then((response) => {
        
          console.log(response)
          toast.success('Task Deleted successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            })
            

      }).catch(err => {
        console.log(err)
        
      })   


  }

  return (
    <div className = "delete-block">
      <div className="delete-icon" onClick={ () => setConfirmDialog({
              isOpen: true,
              title: 'Are you sure to delete this user?',
              subTitle: `You can't undo this operation`,
              onConfirm: () => { deleteTask() }
            })} style={{cursor: 'pointer'}}>
      ⨯
      </div>
      <ConfirmDialog confirmDialog= {confirmDialog} setConfirmDialog={setConfirmDialog}/>
    </div>
  )
}

export default (DeleteTask);
