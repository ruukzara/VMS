import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  checkMetadata,
  createAdmin,
  createUserData,
  deleteUser,
  getAdmin,
  getProfileUser,
  getUserDetail,
  updateCastProfileByAdmin,
  updateProfile,
  updateUserData,
} from "../../api/admin";
import { useTranslation } from "react-i18next";

export const useGetAllAdmin = () => {
  return useQuery(["getAllAdmin"], () => getAdmin(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 0,
  });
};

export const useGetProfileUser = () => {
  return useQuery(["getProfileUser"], () => getProfileUser(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 0,
  });
};

export const usePostUser = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["creatUser"], (data) => createAdmin(data), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getAllAdmin"]);
      toast.success(t("createdUser"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("notCreatedUser"));
    },
  });
};

export const usePostUserData = ({ onSuccess }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation(["creatUserData"], (data) => createUserData(data), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getAllAdmin"]);
      queryClient.invalidateQueries(["getUserDetail"]);
      queryClient.invalidateQueries(["checkMetaData"]);
      toast.success(t("addedUser"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("notAddedUser"));
    },
  });
};

export const useUpdateUserData = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["updatedUserData"], (data) => updateUserData(data), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getAllAdmin"]);
      queryClient.invalidateQueries(["getUserDetail"]);
      queryClient.invalidateQueries(["checkMetaData"]);
      toast.success(t("updatedUserData"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("notUpdateUserData"));
    },
  });
};

export const useUpdateProfile = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["updatedProfile"], (data) => updateProfile(data), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getAllAdmin"]);
      queryClient.invalidateQueries(["getUserDetail"]);
      queryClient.invalidateQueries(["checkMetaData"]);
      queryClient.invalidateQueries(["getProfileUser"]);
      toast.success(t("successUserProfile"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("notSuccessUserProfile"));
    },
  });
};

export const useUpdateCastProfileByAdmin = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["updatedCastProfileByAdmin"],
    (data) => updateCastProfileByAdmin(data),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(["getAllAdmin"]);
        queryClient.invalidateQueries(["getUserDetail"]);
        queryClient.invalidateQueries(["checkMetaData"]);
        toast.success(t("successCastProfile"));
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("notSuccessCastProfile"));
      },
    }
  );
};

export const useCheckMetaData = (id) => {
  return useQuery(["checkMetaData"], () => checkMetadata(id), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 0,
  });
};

export const useGetUserDetail = (id) => {
  return useQuery(["getUserDetail"], () => getUserDetail(id), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 0,
  });
};

export const useDeleteUser = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["deleteUser"], (id) => deleteUser(id), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["getAllAdmin"]);
      toast.success(t("deleteUser"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("notDeleteUser"));
    },
  });
};
