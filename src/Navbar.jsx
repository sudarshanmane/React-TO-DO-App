import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-violet-950 w-full font-sans text- font-semibold flex justify-around p-2">
        <Link to={"/to-do-list"} className="bg-orange-300 p-1 px-3 rounded">
          List
        </Link>

        <Link to={"/create-to-do"} className="bg-orange-300 p-1 px-3 rounded">
          Create To Do
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
