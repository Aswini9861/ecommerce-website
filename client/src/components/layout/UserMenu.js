import { Link } from "react-router-dom";

const Usermenu =()=>{
    return (
        <div className="text-center">
    <div className="list-group ">
    <h3>user Panel</h3>
      <Link
        to={"/dashboard/user/profile"}
        className="list-group-item list-group-item-action"
      >
        Profile
      </Link>
      <Link
        to={"/dashboard/user/order"}
        className="list-group-item list-group-item-action"
      >
        Order
      </Link>
    </div>
    </div>
    )
}

export default Usermenu