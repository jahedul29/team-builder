import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import "./TeamMemberDetails.css";
import { removeRequestedMemberFromDatabase } from "../../utilities/databaseManager";
import { AddedMembersContext } from "../../App";

const TeamMemberDetails = (props) => {
  // Retrieving state from context api
  const { confirmedMembers, setConfirmedMembers } = useContext(
    AddedMembersContext
  );

  const {
    name,
    email,
    picture,
    registered,
    location,
    cell,
    login,
  } = props.member;
  const { age } = registered;
  const { username } = login;
  const { city } = location;
  const fullName = `${name.title}. ${name.first} ${name.last}`;

  const handleRemove = (member) => {
    const remainingConfirmedMembers = confirmedMembers.filter(
      (m) => m.login.username !== member.login.username
    );
    setConfirmedMembers(remainingConfirmedMembers);
    removeRequestedMemberFromDatabase(member.login.username);
  };

  return (
    <div id={username} className="team-member d-flex align-items-center">
      <div className="member-img">
        <img src={picture.large} alt="" />
      </div>
      <div>
        <h2>{fullName}</h2>
        <p>Email: {email}</p>
        <p>UserName: {username}</p>
        <p>Age: {age}</p>
        <p>Phone: {cell}</p>
        <p>City: {city}</p>
        <Button
          onClick={() => handleRemove(props.member)}
          className="all-button"
          size="sm"
          variant="danger"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default TeamMemberDetails;
