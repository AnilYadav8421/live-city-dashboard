// src/pages/Dashboard.jsx
import WeatherWidget from "../components/weather/WeatherWidget";
import NewsWidget from "../components/news/NewsWidget";
import NotificationPanel from "../components/notification/NotificationPanel";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, <span className="font-semibold">{user?.username}</span> 👋
            </p>
          </div>

          <div className="mt-4 md:mt-0 bg-white px-5 py-3 rounded-xl shadow-md border">
            <p className="text-sm text-gray-500">Live Status</p>
            <p className="text-green-600 font-semibold flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              All systems running
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* Weather */}
          <div className="xl:col-span-4">
            <div className= "bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                   Weather
                </h3>
                <p className="text-sm text-gray-500">Current city conditions</p>
              </div>
              <WeatherWidget />
            </div>
          </div>

          {/* News */}
          <div className="xl:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                   Latest News
                </h3>
                <p className="text-sm text-gray-500">Top city & world headlines</p>
              </div>
              <NewsWidget />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="mt-10">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                   Live Notifications
                </h3>
                <p className="text-sm text-gray-500">
                  Real-time system updates
                </p>
              </div>
            </div>
            <NotificationPanel />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
