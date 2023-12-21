import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "react-toastify/dist/ReactToastify.css";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <App />
    </QueryClientProvider>
  </LocalizationProvider>
  // </React.StrictMode>
);
