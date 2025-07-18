import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendPasswordOtpThunk, updatePasswordWithOtpThunk } from '../../store/slices/authSlice';
import loginIllustration from '../../assets/images/login_illustaration.png';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: password, 4: success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // --- Step 1: Send OTP ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setEmailError('');
    setApiError('');
    if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email.');
      return;
    }
    const result = await dispatch(sendPasswordOtpThunk(email));
    if (result.type === sendPasswordOtpThunk.fulfilled.type) {
      setStep(2);
      setTimer(60);
    } else {
      setApiError(result.payload || 'Failed to send OTP.');
    }
  };

  // --- Step 2: Verify OTP ---
  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpError('');
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
      if (!value && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpError('');
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setOtpError('Enter the 6-digit OTP.');
      return;
    }
    // Here you would verify OTP with backend if needed, for now just proceed
    setStep(3);
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    setApiError('');
    const result = await dispatch(sendPasswordOtpThunk(email));
    if (result.type === sendPasswordOtpThunk.fulfilled.type) {
      setTimer(60);
    } else {
      setApiError(result.payload || 'Failed to resend OTP.');
    }
  };

  // --- Step 3: Update Password ---
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setConfirmPasswordError('');
    setApiError('');
    let hasError = false;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Password must be 8+ chars, include uppercase, lowercase, number, special char.');
      hasError = true;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      hasError = true;
    }
    if (hasError) return;
    const otpValue = otp.join('');
    const result = await dispatch(updatePasswordWithOtpThunk({ email, otp: otpValue, newpassword: newPassword, confirmpassword: confirmPassword }));
    if (result.type === updatePasswordWithOtpThunk.fulfilled.type && result.payload?.status === 'ok') {
      setStep(4);
    } else {
      setApiError(result.payload || 'Failed to update password.');
    }
  };

  // --- UI ---
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      {step === 1 ? (
        <div className="w-full min-h-screen flex flex-col md:flex-row">
          {/* Left Side: Gradient + Image */}
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 min-h-screen" style={{background: 'linear-gradient(180deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)'}}>
            <img src={loginIllustration} alt="Login Illustration" className="w-full h-screen mx-auto" />
          </div>
          {/* Right Side: Form */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col items-center">
                <h2 className="text-3xl font-bold text-[#2D1153] mb-2 text-center">Forgot Password?</h2>
                <p className="text-base text-[#6D758F] mb-6 text-center">Enter your email address or username below. We’ll send you a verification code to reset your password.</p>
                <form onSubmit={handleSendOtp} className="w-full flex flex-col gap-4">
                  <div className="relative w-full">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A0AEBF]">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.37999 1.55351L10.0007 7.77367L17.6214 1.55351M1.5 2.90572C1.5 1.71083 2.54981 0.742188 3.84483 0.742188H16.1552C17.4502 0.742188 18.5 1.71083 18.5 2.90572V12.1007C18.5 13.2957 17.4502 14.2643 16.1552 14.2643H3.84483C2.54981 14.2643 1.5 13.2957 1.5 12.1007V2.90572Z" stroke="#9AA0B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    </span>
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7703D9] text-[#19213D] placeholder-[#A0AEBF] text-lg"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your username or email"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl font-semibold text-white text-lg mt-2 shadow-lg"
                    style={{ background: 'linear-gradient(90deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)' }}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Submit'}
                  </button>
                  {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                  {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
                </form>
                <button
                  className="mt-6 text-base font-medium hover:underline bg-transparent text-[#6D758F]"
                  onClick={() => navigate('/login')}
                >
                  Go Back To <span className="text-[#7703D9]">Sign In</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-screen">
          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-screen">
              <div className="rounded-t-2xl w-full flex flex-col items-center justify-center p-8" style={{background: 'linear-gradient(180deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)'}}>
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-4">
                <svg width="38" height="31" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.75999 3.60702L19.0014 16.0473L34.2427 3.60702M2 6.31144C2 3.92167 4.09963 1.98438 6.68966 1.98438H31.3103C33.9004 1.98438 36 3.92167 36 6.31144V24.7015C36 27.0913 33.9004 29.0286 31.3103 29.0286H6.68966C4.09963 29.0286 2 27.0913 2 24.7015V6.31144Z" stroke="#6A0DD7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                </div>
                <h2 className="text-2xl font-bold text-white mb-2 text-center">Verify your email</h2>
                <p className="text-base text-white mb-2 text-center">We’ve sent a code to: <span className="font-medium">{email}</span></p>
              </div>
              <div className="bg-white rounded-b-2xl w-full flex flex-col items-center justify-center p-8 -mt-2 shadow-lg">
                <p className="text-[#2D1153] text-base mb-4 text-center">Please enter the code below to verify your email address.</p>
                <form onSubmit={handleVerifyOtp} className="w-full flex flex-col items-center gap-4">
                  <div className="flex justify-center gap-2 mb-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={el => inputsRef.current[idx] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="w-14 h-14 text-center border border-[#E0E0E0] rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-[#7703D9] bg-[#F6F6FA]"
                        value={digit}
                        onChange={e => handleOtpChange(idx, e.target.value)}
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl font-semibold text-white text-lg mt-2 shadow-lg"
                    style={{ background: 'linear-gradient(90deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)' }}
                  >
                    Verify Email &rarr;
                  </button>
                  {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
                  {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
                </form>
                <div className="flex justify-between w-full mt-6 items-center">
                  <button
                    className="text-[#6D758F] text-base hover:underline bg-transparent"
                    onClick={() => { setStep(1); setOtp(['', '', '', '', '', '']); }}
                  >
                    &larr; Back to Log In
                  </button>
                  <button
                    className={`text-[#7703D9] text-base underline hover:text-[#5a2fcf] ${timer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleResendOtp}
                    disabled={timer > 0}
                  >
                    Resend code {timer > 0 ? `(${timer}s)` : ''}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Step 3: New Password */}
          {step === 3 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col items-center">
              <h2 className="text-3xl font-bold text-[#2D1153] mb-2 text-center">Create New Password</h2>
              <p className="text-base text-[#6D758F] mb-6 text-center">Please enter a new password. It must be different from your previous password.</p>
              <form onSubmit={handleUpdatePassword} className="w-full flex flex-col gap-4">
                <div className="w-full">
                  <label className="block text-[#2D1153] text-base mb-1">Password</label>
                  <div className="relative w-full">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A0AEBF]">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 11V7a5 5 0 10-10 0v4" stroke="#A0AEBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="5" y="11" width="14" height="10" rx="2" stroke="#A0AEBF" strokeWidth="2"/></svg>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-12 pr-10 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7703D9] text-lg placeholder-[#A0AEBF]"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <span
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#A0AEBF" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#A0AEBF" strokeWidth="2"/></svg>
                    </span>
                  </div>
                  {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                </div>
                <div className="w-full">
                  <label className="block text-[#2D1153] text-base mb-1">Password</label>
                  <div className="relative w-full">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#A0AEBF]">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 11V7a5 5 0 10-10 0v4" stroke="#A0AEBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="5" y="11" width="14" height="10" rx="2" stroke="#A0AEBF" strokeWidth="2"/></svg>
                    </span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="w-full pl-12 pr-10 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7703D9] text-lg placeholder-[#A0AEBF]"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
                      required
                    />
                    <span
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#A0AEBF" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#A0AEBF" strokeWidth="2"/></svg>
                    </span>
                  </div>
                  {confirmPasswordError && <p className="text-red-500 text-sm mt-2">{confirmPasswordError}</p>}
                </div>
                {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-semibold text-white text-lg mt-2 shadow-lg"
                  style={{ background: 'linear-gradient(90deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)' }}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Submit'}
                </button>
              </form>
            </div>
          )}
          {/* Step 4: Success */}
          {step === 4 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{background: 'linear-gradient(90deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)', opacity: 0.2}}>
                {/* You can add a checkmark or logo here */}
              </div>
              <h2 className="text-2xl font-semibold text-[#2D1153] mb-2">Password Reset Successful</h2>
              <p className="text-sm text-[#6D758F] mb-6 text-center">Your password has been reset successfully. You can now log in with your new password.</p>
              <button
                className="w-full py-3 rounded-lg font-semibold text-white text-lg"
                style={{ background: 'linear-gradient(90deg, #3D06BE 0%, #7703D9 50%, #AF01F3 100%)' }}
                onClick={() => navigate('/login')}
              >
                Back to Log in
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;