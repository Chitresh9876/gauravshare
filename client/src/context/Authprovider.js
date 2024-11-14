import { useContext, createContext,useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(""); // role
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch("your-api-endpoint/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);  // role
        
        setToken(res.data.userId); 
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/"); 
        return;
      }
      throw new Error(res.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutAction = async()=>{
    setUserId(null);
    localStorage.removeItem("site");
    setToken("");
    setUser("");
    navigate("/login")

  }

  return (
    <AuthContext.Provider
      value={(token, userId, user, loginAction, logoutAction)}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
