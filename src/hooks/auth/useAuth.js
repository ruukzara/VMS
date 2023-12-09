import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  changePassword,
  forgotPassword,
  login,
  mobileAuth,
} from "../../api/auth/auth";
import { getUser, removeUser, setUser } from "../../utils/cookieHelper";
import { useTranslation } from "react-i18next";

export const useLogin = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return useMutation(
    ["login"],
    ({ email, password }) => login(email, password),
    {
      onSuccess: (data, variables, context) => {
        if (data?.isTemporaryPassword) {
          navigate("/changePassword");
          setUser(data);
        } else if (data?.user?.role === "Sub Admin") {
          toast.success(t("logSuccess"));
          navigate("/admin");
          setUser(data);
        } else if (data?.user?.role === "Admin") {
          toast.success(t("logSuccess"));
          navigate("/super");
          setUser(data);
        } else if (data?.user?.role === "Cast") {
          toast.success(t("logSuccess"));
          navigate("/cast");
          setUser(data);
        } else {
          removeUser();
          toast.error(t("noAccess"));
          navigate("/");
        }
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("invalidEmail"));
      },
    }
  );
};

export const useMobileAuth = ({ onSuccess }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return useMutation(["mobileAuth"], (id) => mobileAuth(id), {
    onSuccess: (data, variables, context) => {
      if (data?.isTemporaryPassword) {
        navigate("/changePassword");
        setUser(data);
      } else if (data?.user?.role === "Cast") {
        toast.success(t("logSuccess"));
        navigate("/cast");
        setUser(data);
      } else if (data?.user?.role === "Sub Admin") {
        toast.success(t("logSuccess"));
        navigate("/admin");
        setUser(data);
      } else {
        removeUser();
        toast.error(t("noAccess"));
        navigate("/");
      }
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("invalidAccess"));
    },
  });
};

export const useChangePassword = ({ onSuccess }) => {
  const { user } = getUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return useMutation(
    ["changePassword"],
    (password) => changePassword(password),
    {
      onSuccess: (data, variables, context) => {
        toast.success(t("successPassword"));
        if (user?.role === "Sub Admin") {
          navigate("/admin");
          setUser(data);
        } else if (user?.role === "Admin") {
          navigate("/super");
          setUser(data);
        } else {
          navigate("/cast");
          setUser(data);
        }
        onSuccess && onSuccess(data, variables, context);
      },
      onError: (err, _variables, _context) => {
        toast.error(t("failPassword"));
      },
    }
  );
};

export const useForgotPassword = ({ onSuccess }) => {
  const { t } = useTranslation();
  return useMutation(["forgotPassword"], (email) => forgotPassword(email), {
    onSuccess: (data, variables, context) => {
      toast.success(t("checkEmail"));
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (err, _variables, _context) => {
      toast.error(t("couldNotSendEmail"));
    },
  });
};
