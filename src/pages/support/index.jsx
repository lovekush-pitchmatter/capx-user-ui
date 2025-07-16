import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Bounce, ToastContainer } from "react-toastify";
import Layout from "../../components/layout/Layout";
import { supportThunk } from "../../store/slices/generalSlice";

const Support = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.general);
  
  const [formData, setFormData] = useState({
    subject: "",
    message: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "message" && value.length > 400) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.subject.trim()) {
      toast.error("Please enter a subject.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    
    if (!formData.message.trim()) {
      toast.error("Please enter a message.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    try {
      const result = await dispatch(supportThunk(formData));
      if (result.payload.status === "ok") {
        toast.success("Support request submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setFormData({ subject: "", message: "" });
      } else {
        toast.error(result.payload.message || "Failed to submit support request.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
     
    } catch (error) {
      toast.error("Failed to submit support request. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <Layout>
      <div className="bg-white dark:bg-zinc-900 mx-auto rounded-xl w-full max-w-3xl px-4 py-6">
        <h2 className="text-xl text-start dark:text-white sm:text-2xl md:text-4xl font-semibold mb-6">
          Support
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A44FF] focus:border-transparent dark:bg-zinc-800 dark:border-zinc-600 dark:text-white outline-none"
              placeholder="Enter subject"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7A44FF] focus:border-transparent dark:bg-zinc-800 dark:border-zinc-600 dark:text-white outline-none resize-none"
              placeholder="Enter your message (max 400 characters)"
              required
            />
            <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
              {formData.message.length}/400
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7A44FF] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#6938E5] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Support;
