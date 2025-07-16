import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { RootState } from "../store";
import { getUser } from "../store/slices/authSlice";
import Loader from "../pages/loader";

interface PrivateRouteProps {
  redirectTo?: string;
  isAuthRoute?: boolean;
  allowPublicAccess?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/login",
  isAuthRoute = false,
  allowPublicAccess = false,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector(
    (state: RootState) => state.auth
  );

  const hasFetchedUser = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !user && !loading && !hasFetchedUser.current) {
      hasFetchedUser.current = true;
      dispatch(getUser());
    }
  }, [isAuthenticated, user, loading, dispatch]);

  // Optional: show loader while user is being fetched
  if (isAuthenticated && !user && loading) {
    return <Loader />;
  }

  // Allow public access to route
  if (allowPublicAccess) return <Outlet />;

  // If already authenticated, prevent access to auth routes
  if (isAuthRoute && isAuthenticated && user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // If not authenticated, redirect to login (but avoid looping)
  if (!isAuthenticated && !isAuthRoute && location.pathname !== redirectTo) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
