import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardHeader,
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
  const { shiftdate, fullname, mode, price } = data;
  const { t } = useTranslation();
  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {t("BookingDate")}: {moment(shiftdate).local().format("YYYY-MM-DD")}
        </Link>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {t("cast_name")}: {fullname}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}>
        {t("Mode")}:{mode}
      </Typography>
      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}>
        {t("Price")}:¥{price}
      </Typography>
    </Stack>
  );
}

const AppPaymentUpdate = ({ title, subheader, list, isLoading, ...other }) => {
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
                    {t("noearning")}
                  </Typography>
                )}
              </Stack>
            </Scrollbar>

            <Divider />
            <Box sx={{ p: 2, textAlign: "right" }}>
              <Typography
                variant="caption"
                sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}>
                {t("Total")}:
                ¥{list.reduce((accumulator, response) => {
                  return accumulator + response.price;
                }, 0)}
              </Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 2, textAlign: "right" }}>
              <Button
                size="small"
                color="inherit"
                onClick={() => navigate("/super/payment")}
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
export default AppPaymentUpdate;

AppPaymentUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array,
};
