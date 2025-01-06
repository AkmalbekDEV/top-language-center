import { Route, Routes } from "react-router-dom";
import Aos from "aos";
import { useEffect, useState } from "react";
// import global_uz from "./translations/uz/global.json";
import MainLayoutRoutes from "./pages/MainLayoutRoutes";
import GroupPage from "./pages/admin/Groups";
import LoginPage from "./pages/admin/LoginPage";
import AdminRoute from "./pages/admin/AdminPage";
// import StudentsPage from "./pages/admin/StudentsPage";
import StudentLogin from "./pages/student/StudentsLoginPage";
import JournalWeeks from "./pages/admin/JournalWeeks";
import JournalPage from "./pages/admin/JournalPage";
import StudentJournalPage from "./pages/student/StudentJournalPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StudentsPage from "./pages/admin/StudentsPage";
import ForStudentsRoute from "./pages/admin/ForStudentsPage";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log("Online");
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log("Offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  // i18next.init({
  //   interpolation: { escapeValue: false },
  //   lng: "uz",
  //   resources: {
  //     uz: {
  //       global: global_uz,
  //     },
  //   },
  // });
  const queryClient = new QueryClient();

  return (
    <>
      {isOnline ? (
        <div className="scroll-smooth text-blue-800">
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="*" element={<MainLayoutRoutes />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/student-login"
                element={<StudentLogin />}
              />
              <Route element={<AdminRoute />}>
                <Route path="/groups" element={<GroupPage />} />
                <Route
                  path="/group/:groupId/students"
                  element={<StudentsPage />}
                />
                <Route
                  path="/group/:groupId/students/journals"
                  element={<JournalWeeks />}
                />
                <Route
                  path="/group/:groupId/students/journals/:weekId"
                  element={<JournalPage />}
                />
              </Route>
              <Route element={<ForStudentsRoute />}>
                <Route
                  path="/student-groups/:groupId"
                  element={<JournalWeeks />}
                />
                <Route
                  path="/student-groups/:groupId/week/:weekId"
                  element={<StudentJournalPage />}
                />
              </Route>
            </Routes>
          </QueryClientProvider>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen w-full">
          <img
            src="https://t4.ftcdn.net/jpg/04/56/12/39/360_F_456123993_ukE4YP626xVURDQ9hfcHRBnccx6Sv2FX.jpg"
            alt=""
            className="w-[50%]"
          />
        </div>
      )}
    </>
  );
}

export default App;
