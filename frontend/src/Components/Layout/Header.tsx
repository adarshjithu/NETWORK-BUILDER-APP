import { Link } from "react-router-dom"
import { logoutUser } from "../../api/userServices"
import { useDispatch } from "react-redux";
import { userLogout } from "../../features/authSlice";


function Header() {
  const dispatch = useDispatch()
  const logout = async()=>{
   const res = await logoutUser();
   if(res?.data?.success){
     dispatch(userLogout())
   }
  }
  return (
    <div> <header className="bg-black shadow-md py-5">
    <div className="container mx-auto flex justify-between items-center px-6">
      <h1 className="text-3xl font-extrabold text-white">
        <span className="text-pink-500">Network</span> Builder
      </h1>
      <nav className="flex space-x-6">
        <Link
          to="/"
          className="text-white hover:text-gray-400 transition"
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="text-white hover:text-gray-400 transition"
        >
          User Info
        </Link>
        <Link
          to="/events"
          className="text-white hover:text-gray-400 transition"
        >
          Events
        </Link>
        <Link
          to="/chat"
          className="text-white hover:text-gray-400 transition"
        >
          Group Chats
        </Link>
        <Link
        to={''}
           onClick={logout}
          className="text-white hover:text-gray-400 transition"
        >
          Logout
        </Link>
      </nav>
    </div>
  </header>
    </div>
  )
}

export default Header
