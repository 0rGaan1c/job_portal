import { Route, Routes } from "react-router-dom";
import CandidateRegister from "./pages/Register/Candidate";
import CompanyRegister from "./pages/Register/Company";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";
import PublicRoutes from "../src/Routes/PublicRoute";
import CandidateRoutes from "./Routes/CandidateRoutes";
import CompanyRoutes from "./Routes/CompanyRoutes";
import Browse from "../src/pages/Candidate/Browse";
import Applied from "../src/pages/Candidate/Applied";
import CompanyJobs from "../src/pages/Company/CompanyJobs";
import AppliedUserList from "../src/pages/Company/AppliedUserList";

function App() {
  return (
    <>
      <CookiesProvider>
        <Toaster toastOptions={{ position: "top-right" }} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/candidate" element={<CandidateRegister />} />
            <Route path="/register/company" element={<CompanyRegister />} />
          </Route>
          {/* Candidate Private Routes */}
          <Route path="/candidate" element={<CandidateRoutes />}>
            <Route path="browse" element={<Browse />} />
            <Route path="applied" element={<Applied />} />
            <Route path="profile" element={<div>Profile</div>} />
          </Route>
          {/* Company Private Routes */}
          <Route path="/company" element={<CompanyRoutes />}>
            <Route path="job" element={<CompanyJobs />} />
            <Route path="job/applied" element={<AppliedUserList />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CookiesProvider>
    </>
  );
}

export default App;
