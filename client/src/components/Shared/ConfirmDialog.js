import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { MdNotListedLocation } from "react-icons/md";

const useStyles = makeStyles(() => ({
  dialog: {
    padding: useTheme().spacing(2),
    position: "absolute",
    top: useTheme().spacing(5),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
  },

  titleIcon: {
    "&:hover": {
      backgroundColor: " #ff9999",
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    // <ThemeProvider theme={theme}>

    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton
          disableRipple
          className={classes.titleIcon}
          style={{
            backgroundColor: "#ffe6e6",
            color: "#ff531a",
            fontSize: "8rem",
          }}
        >
          <MdNotListedLocation />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions
        className={classes.dialogActions}
        style={{ justifyContent: "center" }}
      >
        {/* <button text='No' color='default'/>
            <button text='Yes' color='secondary'/> */}
        <button onClick = {confirmDialog.onConfirm}
          style={{
            backgroundColor: "#47d147",
            padding: "2% 5% 2% 5%",
            outline: "none",
            border: "none",
            color: "white",
          }}
        >
          Yes
        </button>
        <button onClick={() => setConfirmDialog({...confirmDialog, isOpen: false})}
          style={{
            backgroundColor: "#ff531a",
            padding: "2% 5% 2% 5%",
            outline: "none",
            border: "none",
            color: "white",
          }}
        >
          No
        </button>
      </DialogActions>
    </Dialog>
    // </ThemeProvider>
  );
}
