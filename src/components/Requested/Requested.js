import React, { useContext } from "react";
import { AddedMembersContext } from "../../App";
import RequestedMember from "../RequestedMember/RequestedMember";
import { Row, Container } from "react-bootstrap";

const Requested = () => {
  // Retrieving state from context api
  const { addedMembers } = useContext(AddedMembersContext);

  return (
    <div>
      <h3 className="title">Requested Members</h3>
      <Container fluid="sm">
        <Row>
          {addedMembers.map((member) => (
            <RequestedMember
              key={member.login.username}
              member={member}
            ></RequestedMember>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Requested;
