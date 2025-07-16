import React, { useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../store/slices/profileSlice';
import { logout } from '../../store/slices/authSlice';
import encryptData from '../../utils/encryption/encryption';
import hashing from '../../utils/encryption/hashing';

// Inline Modal implementation
const InlineModal = ({ onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md mx-4 relative">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold focus:outline-none"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      {children}
    </div>
  </div>
);

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [password, setPassword] = useState('');
  const [twofa, setTwofa] = useState('');
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    let data = { password };
    if (twofa) { data = { ...data, twofa }; } else data.twofa = "";
    const { encryptedData, id } = encryptData(data);
    const { reqdata } = hashing(data, id);
    const payload = { data: encryptedData, reqid: id, reqdata };
    const result = await dispatch(deleteAccount(payload));
    if (result.type && result.type.endsWith('fulfilled')) {
      setSuccessMsg('Account deleted successfully.');
      setTimeout(() => {
        dispatch(logout());
      }, 2000);
      setErrorMsg('');
    } else {
      // Try to extract error message from result
      let msg = 'Incorrect credentials';
      if (result.payload) {
        msg = result.payload;
      } else if (result.error && result.error.message) {
        msg = result.error.message;
      }
      setErrorMsg(msg);
      setError(true);
      setTimeout(() => {
        setError(false);
        setErrorMsg('');
      }, 4000);
    }
    setShowModal(false);
  };

  return (
    <div id='delete-account' className="max-w-4xl mx-auto  bg-red-50 sm:py-8 p-4 rounded-2xl shadow-md text-center">
      <div className="max-w-xl mx-auto ">
        <h2 className="md:text-3xl text-2xl font-semibold mb-4 text-black">Delete Your Account</h2>
        <p className="mb-4 text-gray-800 md:text-xl font-medium sm:text-lg">
          To permanently delete your CAPShield account, please confirm your password below.
        </p>
        <div className="italic text-start font-semibold  text-red-500 text-xs mb-4 gap-1">
          <p className=" flex  md:items-center justify-start "><AiOutlineWarning size={30} className='pr-1'/>Warning: This action is irreversible. All your data and assets will be permanently deleted. You will not be able to login through this email id again.</p>
        </div>

        {errorMsg && (
          <div className="mb-4 border border-red-800 bg-red-100 text-red-900 rounded" style={{ borderRadius: 5, padding: '12px 20px', fontWeight: 600 }}>
            {errorMsg}
          </div>
        )}  
        {successMsg && (
          <div className="mb-4 border border-green-800 bg-green-100 text-green-900 rounded" style={{ borderRadius: 5, padding: '12px 20px', fontWeight: 600 }}>
            {successMsg}
          </div>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg mt-4 transition"
        >
          Delete Account
        </button>
        {showModal && (
          <InlineModal onClose={() => { setShowModal(false); setErrorMsg(''); }}>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Confirm Account Deletion</h3>
              <p className="mb-4">Please enter your password{user.is_2fa_active ? ' and 2FA code' : ''} to confirm.</p>
              <input
                type="password"
                className={`w-full px-4 py-3 border ${error ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400 mb-2`}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                  if (errorMsg) setErrorMsg('');
                }}
              />
              {user.is_2fa_active && (
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 placeholder-gray-400 mb-2"
                  placeholder="Enter 2FA Code"
                  value={twofa}
                  onChange={(e) => { setTwofa(e.target.value); if (errorMsg) setErrorMsg(''); }}
                />
              )}
              {errorMsg && (
                <p className="text-left text-sm text-red-500 mt-1 italic">*{errorMsg}</p>
              )}
              <div className="flex justify-end gap-4 mt-4 w-full">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => { setShowModal(false); setErrorMsg(''); }}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-6 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </InlineModal>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;
