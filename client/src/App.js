import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={user?.id ? <Navigate to={"/contacts"} /> : <Home />}
      />
      <Route
        path="/contacts"
        element={!user?.id ? <Navigate to={"/"} /> : <Contacts />}
      />
    </Routes>
  );
};

export default App;
