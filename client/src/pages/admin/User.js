import React from 'react'
import Layout from '../../components/layout/Layout'
import Adminmenu from '../../components/layout/Adminmenu'

const User = () => {
  return (
    <Layout title={'All user'}>
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-3"><Adminmenu/></div>

    <div className="col-md-9 mt-2">
    <div className=" w-75 ">
    <div>All user</div>

    </div>

    </div>
  </div>
</div>

    </Layout>
  )
}

export default User