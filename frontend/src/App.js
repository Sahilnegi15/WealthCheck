import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  AuthProvider
} from "./context/AuthContext";

import ProtectedRoute
from "./components/ProtectedRoute";

// import Sidebar
// from "./components/Sidebar";

import LoginPage
from "./pages/LoginPage";

import DashboardPage
from "./pages/DashboardPage";

import ExpensesPage
from "./pages/ExpensesPage";

import RegisterPage from "./pages/RegisterPage";
import PortfolioPage
from "./pages/PortfolioPage";

import MarketPage
from "./pages/MarketPage";


// function Layout(
//   { children }
// ) {

//   return (

//     <div
//       className="
//       flex
//     "
//     >

//       <Sidebar />

//       <div
//         className="
//         flex-1
//         p-6
//       "
//       >

//         {children}

//       </div>

//     </div>
//   );
// }


export default function
App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={
              <LoginPage />
            }
          />

          <Route
            path="/register"
            element={
              <RegisterPage />
            }
          />


          <Route
            path="/Dashboard"
            element={

              <ProtectedRoute>

                

                  <DashboardPage />

            

              </ProtectedRoute>
            }
          />


          <Route
            path="/expenses"
            element={

              <ProtectedRoute>

                

                  <ExpensesPage />

                

              </ProtectedRoute>
            }
          />

          


          <Route
            path="/portfolio"
            element={

              <ProtectedRoute>

                

                  <PortfolioPage />

                

              </ProtectedRoute>
            }
          />


          <Route
            path="/market"
            element={

              <ProtectedRoute>

                

                  <MarketPage />

                

              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}