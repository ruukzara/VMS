import { useEffect, useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, MenuItem, Stack, IconButton, Popover } from "@mui/material";
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------

const LANGS = [
  {
    value: "en",
    label: "English",
    icon: "/assets/icons/ic_flag_en.svg",
  },
  {
    value: "ja",
    label: "日本",
    icon: "/assets/icons/icons8-japan-48.png",
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const [value, setValue] = useState(LANGS[0]);
  const { i18n } = useTranslation();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (option) => {
    i18n.changeLanguage(option.value);
    setValue(option);
    setOpen(null);
  };

  const handleClosePopOver = () => {
    setOpen(null);
  };

  useEffect(() => {
    setValue(i18n.language === "ja" ? LANGS[1] : LANGS[0]);
  }, [i18n.language]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}>
        <img src={value.icon} alt={value.label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClosePopOver}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}>
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === value.value}
              onClick={() => handleClose(option)}>
              <Box
                component="img"
                alt={option.label}
                src={option.icon}
                sx={{ width: 28, mr: 2 }}
              />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
