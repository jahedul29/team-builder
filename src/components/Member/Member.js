import React from "react";
import "./Member.css";

const Member = (props) => {
  const { name, email, picture, location, login } = props.member;
  const { username } = login;
  const { city } = location;
  const fullName = `${name.title}. ${name.first} ${name.last}`;

  return (
    <div id={username} className="single-member d-flex align-items-center">
      <div>
        <img className="w-100" src={picture.large} alt="" />
      </div>
      <div>
        <h2>{fullName}</h2>
        <p>Email: {email}</p>
        <p>City: {city}</p>
        {props.children}
      </div>
    </div>
  );
};

export default Member;
