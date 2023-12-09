import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RemoveDialog = ({ open, handleClose, removeImage, id }) => {
  const { t } = useTranslation();
  const handler = () => {
    removeImage(id);
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{t("confirmation")}</DialogTitle>
        <DialogActions>
          <Button
            onClick={handler}
            variant="contained"
            color="success"
            style={{ color: "white" }}>
            {t("Agree")}
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            {t("Disagree")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveDialog;
