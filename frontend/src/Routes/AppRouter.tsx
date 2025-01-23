import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import EventPage from "../Pages/Events/Event";
import UserInfo from "../Pages/UserInfo/UserInfo";
import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "../Components/Layout/MainLayout";
import React, { Suspense } from "react";
import InternalServerError from "../Components/Error/500";
import NotFoundPage from "../Components/Error/404";
import SocketProvider from "../Components/Context/SocketContext";

const Login = React.lazy(() => import("../Pages/Login/Login"));
const Signup = React.lazy(() => import("../Pages/Signup/Signup"));
const GroupChat = React.lazy(() => import("../Pages/GroupChat/GroupChat"));
function AppRoute() {
    return (
        <div>
            <BrowserRouter>
                    <Suspense>
                <Routes>

                   
                    
                        <Route path="/login" element={<Login />} />
                    
                  
                        <Route path="/signup" element={<Signup />} />
                  

                    <Route
                        path="/"
                        element={
                            <ProtectedRoutes>
                                <MainLayout>
                                    <Home />
                                </MainLayout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            <ProtectedRoutes>
                                <SocketProvider>
                                    
                                        <GroupChat />
                                   
                                </SocketProvider>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/events"
                        element={
                            <ProtectedRoutes>
                                <MainLayout>
                                    <EventPage />
                                </MainLayout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoutes>
                                <MainLayout>
                                    <UserInfo />
                                </MainLayout>
                            </ProtectedRoutes>
                        }
                    />
                    <Route path="/500" element={<InternalServerError />} />
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default AppRoute;
