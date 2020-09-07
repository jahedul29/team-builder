import React, { useState, useEffect } from "react";
import Member from "../Member/Member";
import { useContext } from "react";
import { AddedMembersContext } from "../../App";
import { Button } from "react-bootstrap";
import { addRequestedMemberToDatabase } from "../../utilities/databaseManager";
import "./Home.css";

const Home = () => {
  const [allMembers, setAllMembers] = useState([]);
  // Retrieving state from context api
  const { addedMembers, setAddedMembers } = useContext(AddedMembersContext);

  useEffect(() => {
    const url = `https://randomuser.me/api/?results=15`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const newMembers = data.results.filter(
          (member) => !addedMembers.includes(member)
        );
        setAllMembers(newMembers);
      });
  }, [addedMembers]);

  //Function to add member
  const handleAddMember = (member) => {
    const newMember = addedMembers.find(
      (mb) => mb.login.username === member.login.username
    );
    let newAddedMembers = [];
    if (!newMember) {
      //! Adding a property isConfirmed to check it is confirmed or not
      member.isConfirmed = false;
      newAddedMembers = [...addedMembers, member];
      addRequestedMemberToDatabase(member.login.username, member);
      setAddedMembers(newAddedMembers);
      document.getElementById(member.login.username).style.display = "none";
    }
  };

  return (
    <div>
      <h3 className="title">Available Members</h3>
      <div className="d-flex flex-column align-items-center">
        {allMembers.map((member) => (
          <Member
            key={member.login.username}
            handleAddMember={handleAddMember}
            member={member}
          >
            <Button
              className="all-button"
              onClick={() => handleAddMember(member)}
              variant="primary"
            >
              Add Member
            </Button>
          </Member>
        ))}
      </div>
    </div>
  );
};

export default Home;
