import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useMiscTable } from "../../../../hooks/misc/component/useMiscTable";

const HotelPreferenceModal = ({ formik, open, handleClose }) => {
  const { hotelData } = useMiscTable();
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Update Hotel</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              select
              name="hotelid"
              label="Hotel"
              value={formik.values.hotelid}
              onChange={formik.handleChange}
              required
              error={formik.touched.hotelid && Boolean(formik.errors.hotelid)}
              helperText={formik.touched.hotelid && formik.errors.hotelid}>
              {hotelData?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option?.name}
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

export default HotelPreferenceModal;
