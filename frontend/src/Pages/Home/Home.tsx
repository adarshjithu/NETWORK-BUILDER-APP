
import { Link } from "react-router-dom";
import EventList from "../../Components/Events/EventsList";

const Home = () => {
  return (
    <div className="bg-gradient-to-t from-gray-800 via-black to-gray-900 min-h-screen flex flex-col">
      {/* Header */}
     

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center px-6 py-12">
        <div className="text-center text-white">
          <h2 className="text-5xl font-semibold mb-6">
            Welcome to the <span className="text-pink-500">Network Builder</span>
          </h2>
          <p className="text-lg mb-8">
            Manage and build your community, events, and connections seamlessly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* User Info Card */}
            <Link
              to="/profile"
              className="bg-gray-800 rounded-xl shadow-lg p-8 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-center mb-4 bg-indigo-600 rounded-full p-4">
                <i className="fas fa-user text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">User Info</h3>
              <p className="text-gray-400">
                Create, update, and manage member profiles with ease.
              </p>
            </Link>

            {/* Events Card */}
            <Link
              to="/events"
              className="bg-gray-800 rounded-xl shadow-lg p-8 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-center mb-4 bg-green-600 rounded-full p-4">
                <i className="fas fa-calendar-alt text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Events</h3>
              <p className="text-gray-400">
                Manage and RSVP to events while syncing with your calendar.
              </p>
            </Link>

            {/* Group Chats Card */}
            <Link
              to="/chat"
              className="bg-gray-800 rounded-xl shadow-lg p-8 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-center mb-4 bg-blue-600 rounded-full p-4">
                <i className="fas fa-comments text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Group Chats</h3>
              <p className="text-gray-400">
                Join discussions and collaborate with your community in real-time.
              </p>
            </Link>

            {/* Settings Card */}
            <Link
              to="/settings"
              className="bg-gray-800 rounded-xl shadow-lg p-8 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center justify-center mb-4 bg-red-600 rounded-full p-4">
                <i className="fas fa-cogs text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Settings</h3>
              <p className="text-gray-400">
                Adjust your account and notification preferences.
              </p>
            </Link>
          </div>
        </div>
      </main>
           <EventList/>
      {/* Footer */}
      <footer className="py-4 bg-black text-center">
        <p className="text-gray-300">
          &copy; {new Date().getFullYear()} Network Builder. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
