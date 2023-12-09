import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  getAllAssignedCast,
  getAssignedCast,
  postAssignedCast,
  updateManager,
} from "../../api/assignCastToAdmin/assignCastToAdmin";
import { useTranslation } from "react-i18next";
import { getUnassignedCast } from "../../api/admin";

export const useGetAssignedCast = () => {
  return useQuery(["getAssignedCast"], () => getAssignedCast(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetAllAssignedCast = () => {
  return useQuery(["getAllAssignedCast"], () => getAllAssignedCast(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetAllUnassignedCast = () => {
  return useQuery(["getAllUnassignedCast"], () => getUnassignedCast(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 0,
  });
};

export const usePostAssignedCast = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["postAssignedCast"], (value) => postAssignedCast(value), {
    onSuccess: (data, variables, context) => {
      toast.success(t("Successfullyassignedcast"));
      queryClient?.invalidateQueries(["getAssignedCast"]);
      queryClient?.invalidateQueries(["getUnassignedCast"]);
      queryClient?.invalidateQueries(["getAllAssignedCast"]);
      queryClient?.invalidateQueries(["getAllUnassignedCast"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("noassigncast"));
    },
  });
};

export const useUpdateManager = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["updateManager"],
    ({ admin_id, id }) => updateManager(admin_id, id),
    {
      onSuccess: (data, variables, context) => {
        toast.success(t("updateManager"));
        queryClient?.invalidateQueries(["getAssignedCast"]);
        queryClient?.invalidateQueries(["getUnassignedCast"]);
        queryClient?.invalidateQueries(["getAllAssignedCast"]);
        queryClient?.invalidateQueries(["getAllUnassignedCast"]);
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("notUpdateManager"));
      },
    }
  );
};
