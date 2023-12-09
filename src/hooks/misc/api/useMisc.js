import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  deleteBreastCup,
  deleteColor,
  deleteHotel,
  deleteLocation,
  deletePackage,
  getBreastCup,
  getColor,
  getHotel,
  getHotelById,
  getLocation,
  getPackage,
  postBreastCup,
  postColor,
  postLocation,
  saveHotel,
  savePackage,
  updateHotel,
  updatePackage,
} from "../../../api/misc/misc";
import { useTranslation } from "react-i18next";

export const useGetColor = () => {
  return useQuery(["getColor"], () => getColor(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const usePostColor = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["postColor"], ({ color }) => postColor(color), {
    onSuccess: (data, variables, context) => {
      toast.success(t("SuccessfullyCreated"));
      queryClient?.invalidateQueries(["getColor"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotcreate"));
    },
  });
};

export const useDeleteColor = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["deleteColor"], (id) => deleteColor(id), {
    onSuccess: (data, variables, context) => {
      toast.success(t("Successfullydeleted"));
      queryClient?.invalidateQueries(["getColor"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotdelete"));
    },
  });
};

export const useGetLocation = () => {
  return useQuery(["getLocation"], () => getLocation(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const usePostLocation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(
    ["postLocation"],
    ({ name, country }) => postLocation(name, country),
    {
      onSuccess: (data, variables, context) => {
        toast.success(t("SuccessfullyCreated"));
        queryClient?.invalidateQueries(["getLocation"]);
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("Couldnotcreate"));
      },
    }
  );
};

export const useDeleteLocation = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["deleteLocation"], (id) => deleteLocation(id), {
    onSuccess: (data, variables, context) => {
      toast.success(t("SuccessfullyDeleted"));
      queryClient?.invalidateQueries(["getLocation"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotdelete"));
    },
  });
};

export const useGetBreastCup = () => {
  return useQuery(["getBreastCup"], () => getBreastCup(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export const usePostBreastCup = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["postBreastCup"], ({ name }) => postBreastCup(name), {
    onSuccess: (data, variables, context) => {
      toast.success(t("SuccessfullyCreated"));
      queryClient?.invalidateQueries(["getBreastCup"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotcreate"));
    },
  });
};

export const useDeleteBreastCup = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["deleteBreastCup"], (id) => deleteBreastCup(id), {
    onSuccess: (data, variables, context) => {
      toast.success(t("SuccessfullyDeleted"));
      queryClient?.invalidateQueries(["getBreastCup"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotdelete"));
    },
  });
};

export const useGetHotels = () => {
  return useQuery(["getHotel"], () => getHotel(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 0,
  });
};

export const useGetHotelsById = (id) => {
  return useQuery(["getHotelById"], () => getHotelById(id), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 0,
  });
};

export const useSaveHotel = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["saveHotel"], (formData) => saveHotel(formData), {
    onSuccess: (data, variables, context) => {
      toast.success(t("SuccessfullyCreated"));
      queryClient?.invalidateQueries(["getHotel"]);
      queryClient?.invalidateQueries(["getHotelById"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotcreate"));
    },
  });
};

export const useUpdateHotel = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["updateHotel"], (formData) => updateHotel(formData), {
    onSuccess: (data, variables, context) => {
      toast.success(t("SuccessfullyUpdated"));
      queryClient?.invalidateQueries(["getHotelById"]);
      queryClient?.invalidateQueries(["getHotel"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotupdate"));
    },
  });
};

export const useDeleteHotel = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["deleteHotel"], (id) => deleteHotel(id), {
    onSuccess: (data, variables, context) => {
      toast.success(t("Successfullydeleted"));
      queryClient?.invalidateQueries(["getHotel"]);
      queryClient?.invalidateQueries(["getHotelById"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotdelete"));
    },
  });
};

export const useGetPackage = () => {
  return useQuery(["getPackage"], () => getPackage(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 0,
  });
};

export const useSavePackage = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["savePackage"], (formData) => savePackage(formData), {
    onSuccess: (data, variables, context) => {
      toast.success(t("SuccessfullyCreated"));
      queryClient?.invalidateQueries(["getPackage"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t(err.response?.data?.message) || t("Couldnotcreate"));
    },
  });
};

export const useUpdatePackage = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["updatePackage"], (formData) => updatePackage(formData), {
    onSuccess: (data, variables, context) => {
      toast.success(t("SuccessfullyUpdated"));
      queryClient?.invalidateQueries(["getPackage"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t(err.response?.data?.message) || t("Couldnotupdate"));
    },
  });
};

export const useDeletePackage = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["deletePackage"], (id) => deletePackage(id), {
    onSuccess: (data, variables, context) => {
      toast.success(t("Successfullydeleted"));
      queryClient?.invalidateQueries(["getPackage"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("Couldnotdelete"));
    },
  });
};
