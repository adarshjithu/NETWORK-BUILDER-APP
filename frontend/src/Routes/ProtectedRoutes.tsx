import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({children}:any) {
    const user = useSelector((data: RootState) => data?.auth);
    console.log(user)
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.userData) {
            navigate("/login");
        }
    }, [user]);
    return <div>{children}</div>;
}

export default ProtectedRoutes;
