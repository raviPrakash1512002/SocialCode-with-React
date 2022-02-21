import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route,Navigate } from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login,Signup,Settings,UserProfile } from "../pages";
import { Loader, Navbar } from "./index";




function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user? children : <Navigate to="/login" />;
}

const Page = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          
          <Route exact path="/settings"element={<PrivateRoute> <Settings /> </PrivateRoute>}/>
          <Route exact path="/user/:userId"element={<PrivateRoute> <UserProfile /> </PrivateRoute>}/>
          <Route exact path="*" element={<Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
