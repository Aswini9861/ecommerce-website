import Layout from "../../components/layout/Layout"
import Usermenu from "../../components/layout/UserMenu"
import { useAuth } from "../../context/auth"

const Dashboard = ()=>{
    const [auth] = useAuth()
    return (
        <Layout>
        <div className="container-fluid">
    <div className="row">
      <div className="col-md-3"><Usermenu/></div>

    <div className="col-md-9 mt-2">
    <div className="card w-75 p-3">
    <h4>name:{auth.user.name}</h4>
    <h4>Email:{auth.user.email}</h4>
    <h4>phone:{auth.user.phone}</h4>

    </div>

    </div>
  </div>
</div>
</Layout>
    )
}

export default Dashboard