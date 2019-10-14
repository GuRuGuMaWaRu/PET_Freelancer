import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            exact
            to="/"
            activeStyle={{
              fontWeight: "bold",
              color: "red"
            }}
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add"
            activeStyle={{
              fontWeight: "bold",
              color: "red"
            }}
          >
            Add Project
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
