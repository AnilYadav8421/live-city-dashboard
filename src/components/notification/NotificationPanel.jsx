import { useEffect, useState } from "react";
import { socketService } from "../../services/socketService";

const NotificationPanel = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socketService.connect();
        socketService.addListener((message) => {
            setNotifications((prev) => [...prev, message]);
        });
    }, []);

    const sendTestNotification = () => {
        const msg = `🔔 Notification received at ${new Date().toLocaleTimeString()}`;
        socketService.sendMessage(msg);
    };

    return (
        <div className="flex flex-col h-full">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Notifications
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                        Live Updates
                    </p>
                </div>

                <button
                    onClick={sendTestNotification}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
                >
                    Send Test
                </button>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {notifications.length === 0 ? (
                    <p className="text-sm text-gray-400">
                        No notifications yet
                    </p>
                ) : (
                    notifications.map((msg, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 bg-white shadow-sm"
                        >
                            {msg}
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default NotificationPanel;
