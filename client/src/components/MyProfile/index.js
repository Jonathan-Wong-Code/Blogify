import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_MY_PROFILE } from "../../queries/users";
function MyProfile() {
  const { data, error, loading } = useQuery(GET_MY_PROFILE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { me } = data;

  return (
    <section>
      <h2>My Profile</h2>
      <div>
        <h3>{me.name}</h3>
        <p>{me.email}</p>
      </div>
      <Link to="/update-password">Change Password</Link>
    </section>
  );
}

export default MyProfile;
