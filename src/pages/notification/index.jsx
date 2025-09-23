import { useState } from "react";
import Layout from "../../components/layout/Layout";

const notificationsList = [
  { id: 1, avatar: "https://i.pravatar.cc/40?img=1", name: "April Qoo", text: "liked your post", time: "30 minutes ago" },
  { id: 2, avatar: "https://i.pravatar.cc/40?img=2", name: "April Qoo", text: "commented on your post", time: "2 hours ago" },
  { id: 3, avatar: "https://i.pravatar.cc/40?img=3", name: "April Qoo", text: "requested to join your organisation", time: "14 hours ago" },
  { id: 4, avatar: "https://i.pravatar.cc/40?img=4", name: "April Qoo", text: "requested to join your organisation", time: "14 hours ago" },
  { id: 5, avatar: "https://i.pravatar.cc/40?img=5", name: "April Qoo", text: "requested to join your organisation", time: "14 hours ago" },
  { id: 6, avatar: "https://i.pravatar.cc/40?img=6", name: "April Qoo", text: "liked your post", time: "1 day ago" },
  { id: 7, avatar: "https://i.pravatar.cc/40?img=7", name: "April Qoo", text: "commented on your post", time: "2 days ago" },
  { id: 8, avatar: "https://i.pravatar.cc/40?img=8", name: "April Qoo", text: "requested to join your organisation", time: "3 days ago" },
];

const NotificationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // calculate total pages
  const totalPages = Math.ceil(notificationsList.length / itemsPerPage);

  // get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notificationsList.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Layout>
      <div>
        <h2 className="text-2xl text-start dark:text-white font-semibold mb-6">
          Notifications
        </h2>

        <div className="flex flex-col gap-4">
          {currentItems.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <img
                src={notif.avatar}
                alt={notif.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm dark:text-white">
                  <span className="font-bold">{notif.name}</span> {notif.text}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-300">
                  {notif.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end gap-5 items-center mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationPage;
