import { Route, Routes } from "react-router-dom";
import Aos from "aos";
import { useEffect, useState } from "react";
import global_uz from "./translations/uz/global.json";
import i18next from "i18next";
import MainLayoutRoutes from "./pages/MainLayoutRoutes";
import GroupPage from "./pages/Groups";
import LoginPage from "./pages/LoginPage";
import AdminRoute from "./pages/AdminPage";
import StudentsPage from "./pages/StudentsPage";

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

  i18next.init({
    interpolation: { escapeValue: false },
    lng: "uz",
    resources: {
      uz: {
        global: global_uz,
      },
    },
  });

  return (
    <>
      {isOnline ? (
        <div className="scroll-smooth text-blue-800">
          <Routes>
            <Route path="*" element={<MainLayoutRoutes />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AdminRoute />}>
              <Route path="/groups" element={<GroupPage />} />
              <Route path="/students/:groupId" element={<StudentsPage />} />
            </Route>
          </Routes>
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
