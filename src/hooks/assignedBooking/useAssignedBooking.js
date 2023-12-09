import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  getAssignedBooking,
  getBookingDetail,
  getBookingDetailAdmin,
  getBookingStatus,
  getHotelPreference,
  updateBookingStatus,
  updateHotelPreference,
  updatePayment,
  updateStatus,
} from "../../api/assignedBooking/assignedBooking";
import { useTranslation } from "react-i18next";

export const useGetAssignedBooking = (date) => {
  return useQuery(["getAssignedBooking"], () => getAssignedBooking(date), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetBookingDetail = (id) => {
  return useQuery(["getBookingDetail"], () => getBookingDetail(id), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetBookingStatus = (id) => {
  return useQuery(["getBookingStatus"], () => getBookingStatus(id), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetBookingDetailAdmin = (id) => {
  return useQuery(["getBookingDetailAdmin"], () => getBookingDetailAdmin(id), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetHotelPrefer = (id) => {
  return useQuery(["getHotelPreference"], () => getHotelPreference(id), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useChangeStatus = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["changeStatus"], (data) => updateStatus(data), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getAssignedBooking"]);
      queryClient.invalidateQueries(["getAllAssignedBooking"]);
      queryClient.invalidateQueries(["getBookingDetail"]);
      queryClient.invalidateQueries(["getBookingDetailAdmin"]);
      queryClient.invalidateQueries(["getCastBooking"]);
      toast.success(t("bookingStatus"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("notbookingStatus"));
    },
  });
};

export const useChangePayment = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["changePayment"], (data) => updatePayment(data), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getAssignedBooking"]);
      queryClient.invalidateQueries(["getAllAssignedBooking"]);
      queryClient.invalidateQueries(["getBookingDetail"]);
      queryClient.invalidateQueries(["getBookingDetailAdmin"]);
      queryClient.invalidateQueries(["getCastBooking"]);
      queryClient.invalidateQueries(["getAllCastBooking"]);
      queryClient.invalidateQueries(["getCastBooking"]);
      toast.success(t("paymentStatusUpdate"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("failPaymentStatusUpdate"));
    },
  });
};

export const useChangeBookingStatus = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["updateBookingStatus"],
    (data) => updateBookingStatus(data),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(["getAssignedBooking"]);
        queryClient.invalidateQueries(["getAllAssignedBooking"]);
        queryClient.invalidateQueries(["getBookingDetail"]);
        queryClient.invalidateQueries(["getBookingDetailAdmin"]);
        queryClient.invalidateQueries(["getCastBooking"]);
        queryClient.invalidateQueries(["getAllCastBooking"]);
        queryClient.invalidateQueries(["getCastListBooking"]);
        toast.success(t("bookingStatusUpdate"));
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("failbookingStatusUpdate"));
      },
    }
  );
};

export const useUpdateHotelPrefer = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["updateHotelPreference"],
    (data) => updateHotelPreference(data),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(["getAssignedBooking"]);
        queryClient.invalidateQueries(["getAllAssignedBooking"]);
        queryClient.invalidateQueries(["getBookingDetail"]);
        queryClient.invalidateQueries(["getBookingDetailAdmin"]);
        // toast.success(t("updateUserHotel"));
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("notupdate"));
      },
    }
  );
};
