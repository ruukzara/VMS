import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const InterestForm = ({
  open,
  handleClose,
  formik,
  interestData,
  isLoading,
}) => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    formik.submitForm();
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>{t("UpdateInterest")}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <FormControl sx={{ m: 1 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                {t("Interest")}
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="interestid"
                multiple
                value={formik.values.interestid}
                onChange={(event) =>
                  formik.setFieldValue("interestid", event.target.value, true)
                }
                input={<OutlinedInput label="Tag" />}
                error={
                  formik.touched.interestid && Boolean(formik.errors.interestid)
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map(
                      (value) =>
                        !isLoading &&
                        interestData
                          ?.filter((interest) => interest?.id === value)
                          .map((mapped) => (
                            <Chip key={mapped?.id} label={mapped?.type} />
                          ))
                    )}
                  </Box>
                )}
                MenuProps={MenuProps}>
                {!isLoading &&
                  interestData.map((interest) => (
                    <MenuItem key={interest?.id} value={interest?.id}>
                      <Checkbox
                        checked={
                          formik.values.interestid.indexOf(interest?.id) > -1
                        }
                      />
                      <ListItemText primary={interest?.type} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={!formik.isValid || !formik.dirty}
            style={{ color: "white" }}
            onClick={() => handleSubmit()}>
            {t("Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InterestForm;
