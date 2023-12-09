import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Scrollbar from "../../../components/scrollbar/Scrollbar";
import Iconify from "../../../components/iconify/Iconify";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

function NewsItem({ data }) {
  const { shiftdate, shiftstarttime, shiftendtime, shiftstatus } = data;
  const { t } = useTranslation();
  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {t("Shiftdate")}: {moment(shiftdate).local().format("YYYY-MM-DD")}
        </Link>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {t("shifttime")}:{" "}
          {`${moment(shiftstarttime).local().format("hh:mm")}-${moment(
            shiftendtime
          )
            .local()
            .format("hh:mm")}`}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}>
        {t("Status")}:
        {!shiftstatus ? (
          <Chip
            label={t("Accepted")}
            sx={{ ml: 3 }}
            color="success"
            style={{ color: "white" }}
          />
        ) : (
          <Chip label={t("Rejected")} sx={{ ml: 3 }} color="error" />
        )}
      </Typography>
    </Stack>
  );
}

const AppShiftUpdate = ({ title, subheader, list, isLoading, ...other }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div>
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />
        {isLoading ? (
          <Skeleton variant="rounded" width={"100%"} height={150} />
        ) : (
          <>
            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                {list?.length > 0 ? (
                  list?.map((d) => <NewsItem key={d.id} data={d} />)
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap>
                    {t("noshift")}
                  </Typography>
                )}
              </Stack>
            </Scrollbar>

            <Divider />

            <Box sx={{ p: 2, textAlign: "right" }}>
              <Button
                size="small"
                color="inherit"
                onClick={() => navigate("/cast/schedule")}
                endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}>
                {t("viewAll")}
              </Button>
            </Box>
          </>
        )}
      </Card>
    </div>
  );
};
export default AppShiftUpdate;

AppShiftUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array,
};
