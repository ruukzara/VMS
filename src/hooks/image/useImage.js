import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  countImage,
  getImages,
  getProfileAvatar,
  removeImage,
  removeProfileImage,
  uploadAvatar,
  uploadImage,
  uploadImageByAdmin,
  uploadProfileAvatar,
} from "../../api/image/image";
import { useTranslation } from "react-i18next";

export const useGetImage = (id) => {
  return useQuery(["getImages"], () => getImages(id), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useCountImage = (id) => {
  return useQuery(["countImage"], () => countImage(id), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useGetProfileAvatar = () => {
  return useQuery(["getProfileAvatar"], () => getProfileAvatar(), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const useUploadImage = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["uploadImage"], (formData) => uploadImage(formData), {
    onSuccess: (data, variables, context) => {
      toast.success(t("imageSuccess"));
      queryClient?.invalidateQueries(["getUserDetail"]);
      queryClient?.invalidateQueries(["getImages"]);
      queryClient?.invalidateQueries(["countImage"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(err.error.message || t("notimagesuccess"));
    },
  });
};

export const useUploadImageByAmin = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["uploadImageByAdmin"],
    (formData) => uploadImageByAdmin(formData),
    {
      onSuccess: (data, variables, context) => {
        toast.success(t("imageSuccess"));
        queryClient?.invalidateQueries(["getUserDetail"]);
        queryClient?.invalidateQueries(["getImages"]);
        queryClient?.invalidateQueries(["countImage"]);
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(err.error.message || t("notimagesuccess"));
      },
    }
  );
};

export const useUploadAvatar = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["uploadAvatar"], (value) => uploadAvatar(value), {
    onSuccess: (data, variables, context) => {
      toast.success(t("avatarsuccess"));
      queryClient?.invalidateQueries(["getUserDetail"]);
      queryClient?.invalidateQueries(["getImages"]);
      queryClient?.invalidateQueries(["countImage"]);
      queryClient?.invalidateQueries(["getProfileAvatar"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("notavatarsuccess"));
    },
  });
};

export const useUploadProfileAvatar = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["uploadProfileAvatar"],
    (value) => uploadProfileAvatar(value),
    {
      onSuccess: (data, variables, context) => {
        queryClient?.invalidateQueries(["getUserDetail"]);
        queryClient?.invalidateQueries(["getImages"]);
        queryClient?.invalidateQueries(["getProfileAvatar"]);
        queryClient?.invalidateQueries(["countImage"]);
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("notavatarsuccess"));
      },
    }
  );
};

export const useRemoveImage = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["removeImage"], (url) => removeImage(url), {
    onSuccess: (data, variables, context) => {
      toast.success(t("removeImage"));
      queryClient?.invalidateQueries(["getUserDetail"]);
      queryClient?.invalidateQueries(["getImages"]);
      queryClient?.invalidateQueries(["countImage"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(err.error.message || t("notremoveimage"));
    },
  });
};

export const useRemoveProfileImage = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["removeProfileImage"],
    ({ url, type }) => removeProfileImage(url, type),
    {
      onSuccess: (data, variables, context) => {
        toast.success(t("removeImage"));
        queryClient?.invalidateQueries(["getUserDetail"]);
        queryClient?.invalidateQueries(["getImages"]);
        queryClient?.invalidateQueries(["getProfileAvatar"]);
        queryClient?.invalidateQueries(["countImage"]);
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(err.error.message || t("notremoveimage"));
      },
    }
  );
};
