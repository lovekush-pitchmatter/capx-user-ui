import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";

const NotFoundPage: React.FC = () => {
  const { isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-block w-full h-[44px] bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white font-semibold rounded hover:bg-purple-700 flex items-center justify-center"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-block w-full h-[44px] bg-gradient-to-r from-[#B500EF] to-[#37009A] text-white font-semibold rounded hover:bg-purple-700 flex items-center justify-center"
            >
              Go to Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
