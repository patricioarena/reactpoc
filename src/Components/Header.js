import React from 'react'
import Navigation from './Navigation'
const Header = () => {
    return (
<div className="content-header">
  <div className="container">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0"> Top Navigation <small>Example 3.0</small></h1>
      </div>{/* /.col */}
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Layout</a></li>
          <li className="breadcrumb-item active">Top Navigation</li>
        </ol>
      </div>{/* /.col */}
    </div>{/* /.row */}
  </div>{/* /.container-fluid */}
</div>

    )
}
export default Header;