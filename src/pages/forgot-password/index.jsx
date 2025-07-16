import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyTwoFactor, sendPasswordOtpThunk, updatePasswordWithOtpThunk } from '../../store/slices/authSlice';
import loginIllustration from '../../assets/images/login_illustaration.png';

const TwoFactorPage = () => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({ verifyError: '' });
  const { loading, error, twoFAEmail, twoFAUserId } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1); // 1: email, 2: otp+password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to validate input and remove unwanted characters
  const sanitizeInput = (value, type) => {
    if (type === 'email') {
      // For email, only allow letters, numbers, @, ., -, _
      return value.replace(/[^a-zA-Z0-9@.\-_]/g, '');
    } else if (type === 'otp') {
      // For OTP, only allow numbers
      return value.replace(/[^0-9]/g, '');
    }
    return value;
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // useEffect(() => {
  //   if (!twoFAUserId) {
  //     navigate('/login');
  //   }
  // }, [twoFAUserId, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (index, value) => {
    if (/^[0-9]*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      // Auto-focus next input
      if (value && index < 4) {
        inputsRef.current[index + 1].focus();
      }
      // Auto-backspace
      if (!value && index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };


  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setFormErrors({ ...formErrors, verifyError: 'Enter a valid email.' });
      return;
    }
    setFormErrors({ verifyError: '' });
    const result = await dispatch(sendPasswordOtpThunk(email));
    if (result.type === sendPasswordOtpThunk.fulfilled.type) {
      setStep(2);
      setTimer(60);
    } else {
      setFormErrors({ ...formErrors, verifyError: result.payload || 'Failed to send OTP.' });
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!otp) errors.otp = 'Enter OTP.';
    if (!passwordRegex.test(newPassword)) errors.password = 'Password must be 8+ chars, include uppercase, lowercase, number, special char.';
    if (newPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
    if (Object.keys(errors).length) {
      setFormErrors({ ...formErrors, ...errors });
      return;
    }
    setFormErrors({ verifyError: '' });
    const result = await dispatch(updatePasswordWithOtpThunk({ email, otp, newpassword: newPassword, confirmpassword: confirmPassword }));
    if (result.type === updatePasswordWithOtpThunk.fulfilled.type && result.payload?.status === 'ok') {
      navigate('/login');
    } else {
      setFormErrors({ ...formErrors, verifyError: result.payload || 'Failed to update password.' });
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    const result = await dispatch(sendPasswordOtpThunk(email));
    if (result.type === sendPasswordOtpThunk.fulfilled.type) {
      setTimer(60);
    } else {
      setFormErrors({ ...formErrors, verifyError: result.payload || 'Failed to resend OTP.' });
    }
  };

  return (
    <div className="relative min-h-screen w-full font-roboto">
      {/* Blurred Login Background */}
      <div className="fixed inset-0 z-0 pointer-events-none select-none">
        <div className="min-h-screen w-full flex flex-col lg:flex-row p-0 m-0">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 bg-[#FFFFFF] py-8 px-0 flex flex-col items-start">
            <div className="w-full max-w-[125px] ml-[20px] mb-8 px-[30.25px] py-[3.98px]">
              <div className="font-inter font-semibold text-[21.76px] leading-[26px] text-[#7A44FF]">
                CAPShield
              </div>
            </div>
            <div className="max-w-[334px] mx-auto flex flex-col items-center gap-[40px]">
              <div className="flex flex-col items-center gap-[19.37px]">
                <div className="flex flex-col items-center gap-[20.29px]">
                  <div className="flex flex-col items-center gap-[14.75px]">
                    <div className="flex flex-col items-center gap-[4.62px] leading-[32px]">
                      <h2 className="w-full font-semibold text-[27.04px] leading-[32px] text-start text-[#000000] whitespace-nowrap">
                        Sign in to CAPShield
                      </h2>
                      <p className="w-[173px] h-[14px] font-medium text-[11.96px] leading-[14px] text-center text-[rgba(7,0,23,0.3)]">
                        Presales. Profits. Protection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-[334px] mx-auto mt-[61px] flex flex-col gap-[21px]">
              <div className="flex flex-row flex-wrap justify-center items-center gap-x-[55.85px] gap-y-[26px] w-full">
                <a href="#" className="font-roboto font-normal text-[8.56px] leading-[11px] text-[#4A5567] text-center">
                  Privacy Policy
                </a>
                <a href="#" className="font-roboto font-normal text-[8.56px] leading-[11px] text-[#4A5567] text-center">
                  Terms and Conditions
                </a>
                <div className="relative">
                  <div className="flex flex-row items-center gap-[4.38px] w-[59.77px] h-[17px] bg-[#FFFFFF] rounded-[3px] px-[2px] cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.28354 10.7724C8.80353 10.7724 10.8464 8.72956 10.8464 6.20957C10.8464 3.68958 8.80353 1.64673 6.28354 1.64673C3.76356 1.64673 1.7207 3.68958 1.7207 6.20957C1.7207 8.72956 3.76356 10.7724 6.28354 10.7724Z" stroke="#4A5567" strokeWidth="0.684426" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.4581 2.10303H4.91439C4.02463 4.76773 4.02463 7.65144 4.91439 10.3161H4.4581" stroke="#4A5567" strokeWidth="0.684426" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.65234 2.10303C8.5421 4.76773 8.5421 7.65144 7.65234 10.3161" stroke="#4A5567" strokeWidth="0.684426" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.17676 8.0349V7.57861C4.84146 8.46837 7.72517 8.46837 10.3899 7.57861V8.0349" stroke="#4A5567" strokeWidth="0.684426" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.17676 4.8409C4.84146 3.95115 7.72517 3.95115 10.3899 4.8409" stroke="#4A5567" strokeWidth="0.684426" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-roboto font-normal text-[8.56px] leading-[11px] text-[#4A5567]">
                      English
                    </span>
                    <svg width="8.76" height="8.76" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6L8 10L12 6" stroke="#4A5567" strokeWidth="0.547541"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="font-roboto font-normal text-[8.56px] leading-[11px] text-[#4A5567] text-center">
                © 2025 CAPShield. All Rights Reserved.
              </p>
            </div>
          </div>
          {/* Right Section */}
          <div className="w-full lg:w-1/2 bg-[#8E5CFF] flex items-start pt-[16px] px-[84px] pb-[300px]">
            <div className="flex flex-col items-center gap-[20.78px] max-w-[506px]">
              <div className="w-[400px] h-[430px] rounded-[7.46px] flex items-center justify-center text-white text-lg">
                <img src={loginIllustration} alt="SignIN Illustration" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-center gap-[11.43px] w-full">
                <h2 className="font-roboto font-semibold text-[33.25px] leading-[39px] text-[#FFFFFF] text-center">
                  Secure. Simple. Early Access.
                </h2>
                <p className="font-roboto font-normal text-[18.70px] leading-[22px] text-[#FFFFFF] text-center">
                  Early access to presales, staking rewards, and a token that helps de-risk your investments
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-[6px] bg-white/40 z-10" />
      </div>
      {/* Centered Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-[400px] font-roboto relative">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
            onClick={() => navigate('/login')}
            aria-label="Close"
          >
            ×
          </button>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[21.76px] font-semibold text-[#7A44FF]">CAPShield</span>
          </div>
          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <h3 className="text-[18px] font-semibold text-[#000000] mb-2">Enter your email</h3>
              <input
                type="email"
                className="w-full mb-4 p-2 border rounded"
                value={email}
                onChange={e => setEmail(sanitizeInput(e.target.value, 'email'))}
                placeholder="Email"
                required
              />
              <button
                type="submit"
                className="w-full h-[44px] bg-[#7A44FF] rounded-[8px] font-roboto font-semibold text-[16px] leading-[18px] text-[#FFFFFF] hover:bg-purple-700 mt-2"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
              {formErrors.verifyError && <p className="text-red-500 text-sm mt-2">{formErrors.verifyError}</p>}
            </form>
          ) : (
            <form onSubmit={handleUpdatePassword}>
              <h3 className="text-[18px] font-semibold text-[#000000] mb-2">Reset Password</h3>
              <input
                type="text"
                className="w-full mb-2 p-2 border rounded"
                value={otp}
                onChange={e => setOtp(sanitizeInput(e.target.value, 'otp'))}
                placeholder="Enter OTP"
                maxLength={6}
                required
              />
              <div className="relative w-full mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 border rounded pr-10"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="16.8"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.24218 5.62055L6.32587 8.53686C5.95124 8.16224 5.7207 7.64929 5.7207 7.0787C5.7207 5.93754 6.64286 5.01538 7.78403 5.01538C8.35461 5.01538 8.86756 5.24592 9.24218 5.62055Z"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.1375 3.488C10.1288 2.72723 8.97615 2.31226 7.78311 2.31226C5.74861 2.31226 3.85242 3.51106 2.53259 5.58591C2.01388 6.39856 2.01388 7.7645 2.53259 8.57715C2.9879 9.29182 3.51814 9.90851 4.09449 10.4042"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.7207 11.4185C6.37774 11.6952 7.07512 11.845 7.78403 11.845C9.81853 11.845 11.7147 10.6462 13.0346 8.57138C13.5533 7.75873 13.5533 6.39279 13.0346 5.58014C12.8444 5.28044 12.6369 4.99803 12.4236 4.73291"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.80694 7.48193C9.65709 8.29458 8.99429 8.95738 8.18164 9.10723"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.32582 8.53687L2.02051 12.8422"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5465 1.31519L9.24121 5.6205"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16.6"
                      height="16.6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4.5C7.30558 4.5 3.42532 7.26832 1.18132 11.25C0.939558 11.7111 0.939558 12.2889 1.18132 12.75C3.42532 16.7317 7.30558 19.5 12 19.5C16.6944 19.5 20.5747 16.7317 22.8187 12.75C23.0604 12.2889 23.0604 11.7111 22.8187 11.25C20.5747 7.26832 16.6944 4.5 12 4.5Z"
                        stroke="#A0AEBF"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#A0AEBF"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              {isPasswordFocused && (
                <div className="mb-2">
                  <p className="font-roboto font-normal text-[10.96px] text-[#A0AEBF] mb-1">
                    Password must include:
                  </p>
                  {(() => {
                    const checks = [
                      {
                        label: '8 characters',
                        valid: newPassword.length >= 8,
                      },
                      {
                        label: '1 Uppercase',
                        valid: /[A-Z]/.test(newPassword),
                      },
                      {
                        label: '1 Lowercase',
                        valid: /[a-z]/.test(newPassword),
                      },
                      {
                        label: '1 Number',
                        valid: /[0-9]/.test(newPassword),
                      },
                      {
                        label: '1 Special character',
                        valid: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword),
                      },
                    ];
                    return (
                      <div className="flex flex-col gap-0.5">
                        {checks.map((item, idx) => (
                          <div key={item.label} className="flex items-center gap-1">
                            {item.valid ? (
                              <svg width="10.8" height="8.4" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.19618 0.450859C8.38061 0.608935 8.40196 0.886585 8.24389 1.07101L4.00335 6.0183L1.03131 3.54159C0.844707 3.38609 0.819496 3.10876 0.974996 2.92216C1.1305 2.73556 1.40782 2.71035 1.59442 2.86585L3.90005 4.78721L7.57604 0.498563C7.73411 0.314141 8.01176 0.292783 8.19618 0.450859Z" fill="#13C313" />
                              </svg>
                            ) : (
                              <svg width="10.8" height="8.4" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="5" cy="5" r="4" stroke="#F87171" strokeWidth="1.5" fill="none" />
                                <path d="M3.2 3.2L6.8 6.8M6.8 3.2L3.2 6.8" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" />
                              </svg>
                            )}
                            <span className={`font-roboto font-normal text-[10.96px] ${item.valid ? 'text-green-600' : 'text-red-500'}`}>{item.label}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}
              <div className="relative w-full mb-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full p-2 border rounded pr-10"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <svg
                      width="18"
                      height="16.8"
                      viewBox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.24218 5.62055L6.32587 8.53686C5.95124 8.16224 5.7207 7.64929 5.7207 7.0787C5.7207 5.93754 6.64286 5.01538 7.78403 5.01538C8.35461 5.01538 8.86756 5.24592 9.24218 5.62055Z"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.1375 3.488C10.1288 2.72723 8.97615 2.31226 7.78311 2.31226C5.74861 2.31226 3.85242 3.51106 2.53259 5.58591C2.01388 6.39856 2.01388 7.7645 2.53259 8.57715C2.9879 9.29182 3.51814 9.90851 4.09449 10.4042"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.7207 11.4185C6.37774 11.6952 7.07512 11.845 7.78403 11.845C9.81853 11.845 11.7147 10.6462 13.0346 8.57138C13.5533 7.75873 13.5533 6.39279 13.0346 5.58014C12.8444 5.28044 12.6369 4.99803 12.4236 4.73291"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.80694 7.48193C9.65709 8.29458 8.99429 8.95738 8.18164 9.10723"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.32582 8.53687L2.02051 12.8422"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5465 1.31519L9.24121 5.6205"
                        stroke="#A0AEBF"
                        strokeWidth="1.03743"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16.6"
                      height="16.6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4.5C7.30558 4.5 3.42532 7.26832 1.18132 11.25C0.939558 11.7111 0.939558 12.2889 1.18132 12.75C3.42532 16.7317 7.30558 19.5 12 19.5C16.6944 19.5 20.5747 16.7317 22.8187 12.75C23.0604 12.2889 23.0604 11.7111 22.8187 11.25C20.5747 7.26832 16.6944 4.5 12 4.5Z"
                        stroke="#A0AEBF"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#A0AEBF"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  className={`text-[#7A44FF] text-[13px] underline hover:text-[#5a2fcf] ${timer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleResendOtp}
                  disabled={timer > 0}
                >
                  Resend OTP{timer > 0 ? ` (${timer}s)` : ''}
                </button>
              </div>
              <button
                type="submit"
                className="w-full h-[44px] bg-[#7A44FF] rounded-[8px] font-roboto font-semibold text-[16px] leading-[18px] text-[#FFFFFF] hover:bg-purple-700 mt-2"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
              {formErrors.verifyError && <p className="text-red-500 text-sm mt-2">{formErrors.verifyError}</p>}
              {formErrors.otp && <p className="text-red-500 text-sm mt-2">{formErrors.otp}</p>}
              {formErrors.password && <p className="text-red-500 text-sm mt-2">{formErrors.password}</p>}
              {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-2">{formErrors.confirmPassword}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoFactorPage;