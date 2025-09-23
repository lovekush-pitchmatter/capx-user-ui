import Layout from "../../components/layout/Layout";

const notificationsList = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "April Qoo",
    text: "liked your post",
    time: "30 minutes ago",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/40?img=2",
    name: "April Qoo",
    text: "commented on your post",
    time: "2 hours ago",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "April Qoo",
    text: "requested to join your organisation",
    time: "14 hours ago",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "April Qoo",
    text: "requested to join your organisation",
    time: "14 hours ago",
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/40?img=3",
    name: "April Qoo",
    text: "requested to join your organisation",
    time: "14 hours ago",
  },

];

const NotificationPage = () => {
  return (
    <Layout>
      <div>
        <h2 className="text-2xl text-start dark:text-white font-semibold mb-6">
          Notifications
        </h2>

        <div className="flex flex-col gap-4">
          {notificationsList.map((notif) => (
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
      </div>
    </Layout>
  )
};

export default NotificationPage;