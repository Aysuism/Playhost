// import { createContext, useContext } from "react";
// import { useCookies } from "react-cookie";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [cookies, setCookie] = useCookies(['auth-token']);
//     const baseUrl = "https://playhost-backend.onrender.com";
//     const header = {
//         headers: {
//             "x-auth-token": cookies["auth-token"]
//         }
//     }

//     return (
//         <AuthContext.Provider value={{ login, register }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);