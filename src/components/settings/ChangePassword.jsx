import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SuccessModal from "../common/SuccessModal";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { updatePassword } from "../../store/slices/profileSlice";
import encryptData from "../../utils/encryption/encryption";
import hashing from "../../utils/encryption/hashing";
import { setError } from "../../store/slices/transactionSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [samePasswordError, setSamePasswordError] = useState(false);

  const validatePassword = (password) => {
    const errors = {
      minLength: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    return errors;
  };

  const isPasswordStrong = (rules) =>
    rules.minLength && rules.upper && rules.lower && rules.number && rules.special;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setSamePasswordError(false);

    const rules = validatePassword(newPassword);
    const isStrong = isPasswordStrong(rules);

    if (!isStrong) {
      setErrors((prev) => ({ ...prev, newPassword: true }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, newPassword: false }));
    }

    if (currentPassword && newPassword) {
      if (newPassword === currentPassword) {
        setSamePasswordError(true);
        return;
      } else {
        setSamePasswordError(false);
      }
      if (newPassword !== confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: true,
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: false }));
      }

      // Encrypt data before sending
      const data = {
        currentPassword: currentPassword,
        newPassword: newPassword,
      };
      const { encryptedData, id } = encryptData(data);
      const { reqdata } = hashing(data, id);
      const payload = {
        data: encryptedData,
        reqid: id,
        reqdata: reqdata,
      };
      const result = await dispatch(updatePassword(payload));
      if (result.type && result.type.endsWith("fulfilled")) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          dispatch(logout());
        }, 2000);
      }
    }
  };

  const rules = validatePassword(newPassword);

  // Show password rules on typing new password, not just on submit
  const showPasswordRules = newPassword.length > 0;

  // Hide errors after 4 seconds
  React.useEffect(() => {
    if (samePasswordError) {
      const timer = setTimeout(() => setSamePasswordError(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [samePasswordError]);
  React.useEffect(() => {
    if (errors.newPassword) {
      const timer = setTimeout(() => setErrors((prev) => ({ ...prev, newPassword: false })), 4000);
      return () => clearTimeout(timer);
    }
  }, [errors.newPassword]);
  React.useEffect(() => {
    if (errors.confirmPassword) {
      const timer = setTimeout(() => setErrors((prev) => ({ ...prev, confirmPassword: false })), 4000);
      return () => clearTimeout(timer);
    }
  }, [errors.confirmPassword]);

  return (
    <>
      {showSuccess && (
        <SuccessModal
          onClose={() => setShowSuccess(false)}
          title="Password changed successfully!"
          description="Your password has been successfully changed. You will be logged out now."
        />
      )}


      {samePasswordError && (
        <div className="mb-4 border border-red-800 bg-red-100 text-red-900 rounded" style={{ borderRadius: 5, padding: '12px 20px', fontWeight: 600 }}>
          *Current Password and New Password cannot be the same.
        </div>
      )}

      {errors.confirmPassword && (
        <div className="mb-4 border border-red-800 bg-red-100 text-red-900 rounded" style={{ borderRadius: 5, padding: '12px 20px', fontWeight: 600 }}>
           *New Password and Confirm Password do not match.
        </div>
      )}

      {errors.newPassword && (
        <div className="mb-4 border border-red-800 bg-red-100 text-red-900 rounded" style={{ borderRadius: 5, padding: '12px 20px', fontWeight: 600 }}>
           *Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
        </div>
      )}

      <div className="h-full rounded-xl flex  justify-center bg-[#f4edff] dark:bg-zinc-800 p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6  ">
          <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white">
            Change Password
          </h2>

          <div className="mb-4 relative">
            <label className="text-sm text-[#7A44FF] font-medium mb-1 block dark:text-[#C084FC]">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword.current ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none  
    ${
      errors.currentPassword
        ? "border-red-500 focus:ring-red-500 focus:ring-1"
        : "focus:ring-2 border-gray-300 focus:ring-[#7A44FF]"
    } 
    dark:border-zinc-600 dark:bg-zinc-700 dark:text-white`}
              />

              <span
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-3 top-3 cursor-pointer text-xl text-gray-600 dark:text-gray-300"
              >
                {showPassword.current ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm italic mt-1">
                *Incorrect current Password
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="new-password"
              className="text-sm text-[#7A44FF] font-medium mb-1 block dark:text-[#C084FC]"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showPassword.new ? "text" : "password"}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A44FF]"
              />
              <span
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
                className="absolute right-3 top-3 cursor-pointer text-xl text-gray-600 dark:text-gray-300"
              >
                {showPassword.new ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>

            {showPasswordRules && (
              <div className="text-sm mt-2 space-y-1 ml-1">
                <p className="text-black-900 dark:text-gray-400">
                  Password must include
                </p>
                <p
                  className={
                    rules.minLength
                      ? "text-green-600"
                      : "text-gray-500 dark:text-gray-400"
                  }
                >
                  ✓ 8 characters
                </p>
                <p
                  className={
                    rules.upper
                      ? "text-green-600"
                      : "text-gray-500 dark:text-gray-400"
                  }
                >
                  ✓ 1 Uppercase
                </p>
                <p
                  className={
                    rules.lower
                      ? "text-green-600"
                      : "text-gray-500 dark:text-gray-400"
                  }
                >
                  ✓ 1 Lowercase
                </p>
                <p
                  className={
                    rules.number
                      ? "text-green-600"
                      : "text-gray-500 dark:text-gray-400"
                  }
                >
                  ✓ 1 Number
                </p>
                <p
                  className={
                    rules.special
                      ? "text-green-600"
                      : "text-gray-500 dark:text-gray-400"
                  }
                >
                  ✓ 1 Special character
                </p>
              </div>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="confirm-password"
              className="text-sm text-[#7A44FF] font-medium mb-1 block dark:text-[#C084FC]"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A44FF]"
              />
              <span
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-3 top-3 cursor-pointer text-xl text-gray-600 dark:text-gray-300"
              >
                {showPassword.confirm ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm italic mt-1">
                *Confirm Password must match New Password.
              </p>
            )}
          </div>

          {/* <div className="text-right text-sm text-[#7A44FF] dark:text-[#C084FC] font-medium mb-4">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div> */}

          <button
            type="submit"
            className="w-full bg-[#7A44FF] hover:bg-[#5a00e3] text-white py-2 rounded-lg font-semibold transition"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
