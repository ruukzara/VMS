import { useEffect } from "react";
import {
  useCountImage,
  useRemoveImage,
  useRemoveProfileImage,
  useUploadAvatar,
  useUploadImageByAmin,
  useUploadProfileAvatar,
} from "../useImage";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useAdminUploadImage = (id) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useUploadImageByAmin({});
  const { mutate: avatarMutate, isLoading: avatarLoading } = useUploadAvatar(
    {}
  );
  const { mutate: removeImage } = useRemoveImage({});
  const { mutate: profileAvatarMutate, isLoading: profileLoading } =
    useUploadProfileAvatar({});

  const { mutate: removeProfileImage, isLoading: profileRemoveLoading } =
    useRemoveProfileImage({});

  const handleRemove = (url) => {
    let value = { url: url, type: "admin" };
    removeProfileImage(value);
  };

  const { data, refetch } = useCountImage(id);

  const upload = (files) => {
    const selectedFiles = Array.from(files).slice(0, 10);
    let formData = new FormData();
    let maxFiles = data && data?.count > 0 ? 10 - data?.count : 10;

    if (files.length > maxFiles) {
      toast.error(t("maxsize"));
    } else {
      for (const element of selectedFiles) {
        const file = element;
        if (file.type.includes("image/") && file.size > 10 * 10 * 1024) {
          toast.error(`${t("maximage")}, ${file.name}`);
          return;
          // Add your own error handling or display a message to the user
        } else if (file.type === "video/mp4" && file.size > 10 * 10 * 1024) {
          toast.error(`${t("maxvideo")}, ${file.name}`);
          return;
          // Add your own error handling or display a message to the user
        } else {
          // File is within the size limit, continue with upload logic...
          formData.append("image", element);
        }
      }
      let value = { formData, id: id };
      mutate(value);
      refetch();
    }
  };

  const uploadAvatar = (file) => {
    let formData = new FormData();
    if (file.type.includes("image/") && file.size > 10 * 10 * 1024) {
      toast.error(`${t("maximage")}, ${file.name}`);
      return;
      // Add your own error handling or display a message to the user
    } else if (file.type === "video/mp4") {
      toast.error(t("notvideo"));
      return;
      // Add your own error handling or display a message to the user
    } else {
      // File is within the size limit, continue with upload logic...
      formData.append("image", file);
    }
    let value = { formData, id: id };
    avatarMutate(value);
  };

  const profileAvatar = (file) => {
    let formData = new FormData();
    if (file.type.includes("image/") && file.size > 10 * 10 * 1024) {
      toast.error(`${t("maximage")}, ${file.name}`);
      return;
      // Add your own error handling or display a message to the user
    } else if (file.type === "video/mp4") {
      toast.error(t("notvideo"));
      return;
      // Add your own error handling or display a message to the user
    } else {
      // File is within the size limit, continue with upload logic...
      formData.append("image", file);
    }
    let value = { formData, id: id, type: "admin" };
    profileAvatarMutate(value);
  };

  useEffect(() => {
    if (isLoading) {
      refetch();
    }
  }, [refetch, isLoading]);

  return {
    upload,
    isLoading,
    avatarLoading,
    uploadAvatar,
    removeImage,
    profileAvatar,
    profileLoading,
    profileRemoveLoading,
    handleRemove,
  };
};
