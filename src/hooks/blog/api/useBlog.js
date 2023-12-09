import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createBlog,
  deleteBlog,
  getSingleBlogs,
  getUserBlogs,
  updateBlog,
} from "../../../api/blog/blog";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetUserBlog = () => {
  return useQuery(["getUserBlog"], () => getUserBlogs(), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 0,
  });
};

export const useSingleBlog = (id) => {
  return useQuery(["getSingleBlog"], () => getSingleBlogs(id), {
    refetchOnWindowFocus: false,
    refetchInterval: false,
    cacheTime: 0,
  });
};

export const useCreateBlog = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["createBlog"], (formData) => createBlog(formData), {
    onSuccess: (data, variables, context) => {
      toast.success(t("successBlog"));
      queryClient.invalidateQueries(["getUserBlog"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("failBlog"));
    },
  });
};

export const useUpdateBlog = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["updateBlog"], (formData) => updateBlog(formData), {
    onSuccess: (data, variables, context) => {
      toast.success(t("successUpdateBlog"));
      queryClient.invalidateQueries(["getUserBlog"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("failUpdateBlog"));
    },
  });
};

export const useDeleteBlog = ({ onSuccess }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  return useMutation(["deleteBlog"], (id) => deleteBlog(id), {
    onSuccess: (data, variables, context) => {
      toast.success(t("successDeleteBlog"));
      queryClient.invalidateQueries(["getUserBlog"]);
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("failDeleteBlog"));
    },
  });
};
