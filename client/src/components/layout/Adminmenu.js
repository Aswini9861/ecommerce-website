import { useNavigate, useLocation, Link } from "react-router-dom";

const Adminmenu = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center">
    <div className="list-group ">
    <h3>Admin Panel</h3>
      <Link
        to={"/dashboard/admin/createcategory"}
        className="list-group-item list-group-item-action"
      >
        Create Category
      </Link>
      <Link
        to={"/dashboard/admin/createproduct"}
        className="list-group-item list-group-item-action"
      >
        Create Products
      </Link>
      <Link
        to={"/dashboard/admin/product"}
        className="list-group-item list-group-item-action"
      >
        Products
      </Link>
      <Link
        to={"/dashboard/admin/users"}
        className="list-group-item list-group-item-action"
      >
        Users
      </Link>
      <Link
        to={"/dashboard/admin/adminorder"}
        className="list-group-item list-group-item-action"
      >
        Admin Order
      </Link>
    </div>
    </div>
  );
};

export default Adminmenu;
