import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";

const StatusModal = ({ formik, open, handleClose }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Change Status</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              select
              name="status"
              label="Status"
              value={formik.values.status}
              onChange={formik.handleChange}
              required
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}>
              {data?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option?.value}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusModal;
