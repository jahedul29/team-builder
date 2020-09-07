import React, { useContext } from "react";
import { AddedMembersContext } from "../../App";
import { Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "react-bootstrap";

const Header = () => {
  // Retrieving state from context api
  const { addedMembers } = useContext(AddedMembersContext);

  return (
    <header className="d-flex align-items-center">
      <Link to="/home">
        <strong>Team Builder</strong>
      </Link>
      <Link to="/requested">Requested Members</Link>
      <Link to="/teammembers">Team Members</Link>
      <Link to="/requested">
        <FontAwesomeIcon
          style={{ marginLeft: "5%", color: "orange", fontSize: "25px" }}
          icon={faUser}
        />
      </Link>
      <Badge variant="primary">{addedMembers.length}</Badge>
    </header>
  );
};

export default Header;
