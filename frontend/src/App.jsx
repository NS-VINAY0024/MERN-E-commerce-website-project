import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

//stores
import { useCartStore } from "./store/useCartStore";
import { useAuthStore } from "./store/authstore";
import { useGetUser } from "./api/user";

//Authentication
import SignUpPage from "./Auth/pages/SignUpPage";
import LoginPage from "./Auth/pages/LoginPage";
import EmailVerificationPage from "./Auth/pages/EmailVerificationPage";
import ForgotPasswordPage from "./Auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./Auth/pages/ResetPasswordPage";
import LoadingSpinner from "./Auth/components/LoadingSpinner";

//Pages
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import Header from "./layout/components/Header";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const IsAdmin = ({ children }) => {
  const { user } = useAuthStore();
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const {isCheckingAuth, checkAuth } = useAuthStore();
  const { user } = useGetUser();
  
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-[#4758Df] via-[#0093E9] to-[#80D0C7]">
      {/*Authentication protected routes */}
      <div>
        <Header />
        <Routes>
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
        </Routes>
      </div>

      {/* pages */}
      <div className="relative z-50 pt-20">
        <Routes>
          <Route
            path="/secret-dashboard"
            element={
              <IsAdmin>
                <AdminPage />
              </IsAdmin>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage userName={user.name} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:category"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-success"
            element={
              <ProtectedRoute>
                <PurchaseSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase-cancel"
            element={
              <ProtectedRoute>
                <PurchaseCancelPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
