import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  cancelLeave,
  checkClockIn,
  checkLeave,
  clockInAttendance,
  clockOutAttendance,
  createLeaveRequest,
  getAllAttendance,
  getAllAttendanceAssignedToManager,
  getAllLeaveRequest,
  getAllUserAttendance,
  getAllUserLeaveRequest,
  getAssignCastLeaveRequest,
  getAttendanceDetail,
  getLeaveStatus,
  updateLeaveRequest,
  updateLeaveRequestBySubAdmin,
} from "../../api/attendance/attendance";
import { useTranslation } from "react-i18next";

export const useGetAllAttendance = (date, userid) => {
  return useQuery(["getAllAttendance"], () => getAllAttendance(date, userid), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetAllAttendanceAssignedToManager = (date, userid) => {
  return useQuery(
    ["getAllAttendanceAssignedToManager"],
    () => getAllAttendanceAssignedToManager(date, userid),
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );
};

export const useAttendanceDetail = (id) => {
  return useQuery(["getAttendanceDetail"], () => getAttendanceDetail(id), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetAllUserAttendance = () => {
  return useQuery(["getAllUserAttendance"], () => getAllUserAttendance(), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetAllLeaveRequest = (id) => {
  return useQuery(["getAllLeaveRequest"], () => getAllLeaveRequest(id), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetLeaveStatus = () => {
  return useQuery(["getLeaveStatus"], () => getLeaveStatus(), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetAllUserLeaveRequest = (id, type) => {
  return useQuery(
    ["getAllUserLeaveRequest"],
    () => getAllUserLeaveRequest({ id, type }),
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );
};

export const useCheckAttendance = (date) => {
  return useQuery(["checkAttendance"], () => checkClockIn(date), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useCheckLeave = (date) => {
  return useQuery(["checkLeave"], () => checkLeave(date), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetAssignedCastLeaveRequest = (id) => {
  return useQuery(
    ["getAssignedCastLeaveRequest"],
    () => getAssignCastLeaveRequest(id),
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );
};

export const useClockInAttendance = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["clockInAttendance"],
    (value) => clockInAttendance(value),
    {
      onSuccess: (data, variables, context) => {
        if (data?.error) {
          toast.error(data?.message || t("cantClockIn"));
        } else {
          toast.success(t("clockedIn"));
        }
        queryClient?.invalidateQueries(["getAllAttendance"]);
        queryClient?.invalidateQueries(["getAllUserAttendance"]);
        queryClient?.invalidateQueries(["getAllAttendanceAssignedToManager"]);
        queryClient?.invalidateQueries(["checkAttendance"]);
        queryClient?.invalidateQueries(["checkLeave"]);
        queryClient?.invalidateQueries(["getAttendanceDetail"]);
        localStorage.setItem(
          `alreadyClockIn_${data?.user_id}`,
          JSON.stringify(data)
        );
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("cantClockIn"));
      },
    }
  );
};

export const useClockOutAttendance = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["clockOutAttendance"],
    (value) => clockOutAttendance(value),
    {
      onSuccess: (data, variables, context) => {
        toast.success(t("clockedOut"));
        queryClient?.invalidateQueries(["getAllUserAttendance"]);
        queryClient?.invalidateQueries(["getAllAttendanceAssignedToManager"]);
        queryClient?.invalidateQueries(["checkAttendance"]);
        queryClient?.invalidateQueries(["checkLeave"]);
        queryClient?.invalidateQueries(["getAttendanceDetail"]);
        queryClient?.invalidateQueries(["getAllAttendance"]);
        localStorage.removeItem(`alreadyClockIn_${data?.user_id}`);
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("cantClockOut"));
      },
    }
  );
};

export const useCreateLeaveRequest = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["createLeaveRequest"],
    (value) => createLeaveRequest(value),
    {
      onSuccess: (data, variables, context) => {
        toast.success(t("createleaverequest"));
        queryClient?.invalidateQueries(["getAllUserLeaveRequest"]);
        queryClient?.invalidateQueries(["getAllLeaveRequest"]);
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("failLeaverequest"));
      },
    }
  );
};

export const useCancelLeave = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["cancelLeave"], (id) => cancelLeave(id), {
    onSuccess: (data, variables, context) => {
      toast.success(t("cancelLeaverequest"));
      queryClient?.invalidateQueries(["getAllUserLeaveRequest"]);
      queryClient?.invalidateQueries(["getAllLeaveRequest"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("couldnotCancelLeaverequest"));
    },
  });
};

export const useUpdateLeaveRequest = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["updateLeaveRequest"],
    (value) => updateLeaveRequest(value),
    {
      onSuccess: (data, variables, context) => {
        toast.success(t("updateLeaveRequest"));
        queryClient?.invalidateQueries(["getAllUserLeaveRequest"]);
        queryClient?.invalidateQueries(["getAllLeaveRequest"]);
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("notupdateLeaveRequest"));
      },
    }
  );
};

export const useUpdateLeaveRequestBySubAdmin = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["updateLeaveRequestBySubAdmin"],
    (value) => updateLeaveRequestBySubAdmin(value),
    {
      onSuccess: (data, variables, context) => {
        toast.success(t("updateLeaveRequest"));
        queryClient?.invalidateQueries(["getAllUserLeaveRequest"]);
        queryClient?.invalidateQueries(["getAllLeaveRequest"]);
        queryClient?.invalidateQueries(["getAssignedCastLeaveRequest"]);
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("notupdateLeaveRequest"));
      },
    }
  );
};
