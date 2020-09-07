import React, { useContext } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { AddedMembersContext } from "../../App";
import {
  removeRequestedMemberFromDatabase,
  addRequestedMemberToDatabase,
} from "../../utilities/databaseManager";

const RequestedMember = (props) => {
  // Retrieving state from context api
  const {
    addedMembers,
    setAddedMembers,
    confirmedMembers,
    setConfirmedMembers,
  } = useContext(AddedMembersContext);

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

  // Function to reject a request
  const handleReject = (member) => {
    const remainingMembers = addedMembers.filter(
      (m) => m.login.username !== member.login.username
    );
    removeRequestedMemberFromDatabase(member.login.username);
    setAddedMembers(remainingMembers);
  };

  // Function to Confirm a request
  const handleConfirm = (member) => {
    let newConfirmedMembers = [];
    if (
      !confirmedMembers.find((m) => m.login.username === member.login.username)
    ) {
      //! Adding a property isConfirmed to check it is confirmed or not
      member.isConfirmed = true;
      newConfirmedMembers = [...confirmedMembers, member];
      const newAddedMembers = addedMembers.filter(
        (m) => m.login.username !== member.login.username
      );
      addRequestedMemberToDatabase(member.login.username, member);
      setAddedMembers(newAddedMembers);
      setConfirmedMembers(newConfirmedMembers);
    } else {
      console.log("Exception Occurred");
    }
  };

  return (
    <Col sm={12} md={4}>
      <Card style={{ margin: "1% 0", backgroundColor: "whitesmoke" }}>
        <Card.Img style={{ width: "100%" }} variant="top" src={picture.large} />
        <Card.Body>
          <Card.Title>{fullName}</Card.Title>
          <Card.Text>
            Email: {email} <br />
            UserName: {username}
            <br />
            Age: {age}
            <br />
            Phone: {cell}
            <br />
            Location: {city}
            <br />
          </Card.Text>
          <Button
            className="all-button"
            onClick={() => handleConfirm(props.member)}
            style={{ marginRight: "10%" }}
            size="sm"
            variant="success"
          >
            Confirm
          </Button>
          <Button
            className="all-button"
            onClick={() => handleReject(props.member)}
            size="sm"
            variant="danger"
          >
            Reject
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RequestedMember;
