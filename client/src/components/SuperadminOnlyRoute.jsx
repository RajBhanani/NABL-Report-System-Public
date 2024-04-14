import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const SuperadminOnlyRoute = () => {
  const { role } = useSelector((state) => state.auth).userInfo;
  return role === "superadmin" ? <Outlet /> : <div>Only for admins</div>;
};

export default SuperadminOnlyRoute;
