import React, { useContext } from "react";
import { AddedMembersContext } from "../../App";
import TeamMemberDetails from "../TeamMemberDetails/TeamMemberDetails";

const TeamMembers = () => {
  // Retrieving state from context api
  const { confirmedMembers } = useContext(AddedMembersContext);

  return (
    <div>
      <h3 className="title">Team Members</h3>
      <div className="d-flex flex-column align-items-center">
        {confirmedMembers.map((member) => (
          <TeamMemberDetails
            key={member.login.username}
            member={member}
          ></TeamMemberDetails>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
