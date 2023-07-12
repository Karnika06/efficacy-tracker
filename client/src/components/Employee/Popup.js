import React from 'react'
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import { AiFillCloseCircle } from "react-icons/ai";


export default function Popup(props) {

    const {title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open = {openPopup} maxWidth="md">
        <DialogTitle >
            <div style = {{display: 'flex', justifyContent: 'space-between'}}>

            {title}
           {title.includes("Mood") ? <div></div>: <AiFillCloseCircle onClick = {() => setOpenPopup(false)}/>}
            </div>

        </DialogTitle>
        <Divider />
        <DialogContent>
            {children}
        </DialogContent>

    </Dialog>
  )
}
