import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
    return (
<div className="content-header">
  <div className="container">
    <div className="row mb-2">
      <div className="col-sm-6">
        {/* <h1 className="m-0"> Top Navigation <small>Example 3.0</small></h1> */}
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/clienthome">Client Home</Link></li>
          <li className="breadcrumb-item"><Link to="/sellerhome">Seller Home</Link></li>
          <li className="breadcrumb-item"><Link to="/product">Product</Link></li>
          <li className="breadcrumb-item active"><Link to="/about">About</Link></li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>

    )
}
export default Header;