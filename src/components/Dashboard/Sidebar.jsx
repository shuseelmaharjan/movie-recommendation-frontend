import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {

  return (
    <div
      className={`d-flex flex-column text-white p-3 col-md-3 col-lg-2` }
      style={{height:'93vh', background:'#81001b'}}
    >

      <nav className="nav flex-column">
        <Link className="nav-link text-white">
        <span className='mx-2'><MdDashboard/></span>
        Dashboard
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
