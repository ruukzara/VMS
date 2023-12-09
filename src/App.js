import Router from "./routes";
import ThemeProvider from "./theme";
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Backdrop, CircularProgress } from "@mui/material";
import "@fontsource/roboto"; // Import the English font
import "@fontsource/noto-sans-jp"; // Import the Japanese font
import ErrorBoundary from "./ErrorBoundary";
const queryClient = new QueryClient();

function App() {
  const isMobileDevice = /Mobi/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isMobileDevice) {
      localStorage.removeItem("from");
    }
  }, [isMobileDevice]);
  return (
    <Suspense
      fallback={
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      }>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="colored"
        draggable
        pauseOnHover
      />
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ScrollToTop />
          <StyledChart />
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
              <Router />
            </ErrorBoundary>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
