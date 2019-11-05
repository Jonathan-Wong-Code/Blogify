import React from "react";
import { GET_ALL_USERS } from "../../queries/users";
import { useQuery } from "@apollo/react-hooks";

export default function AllUsersPage() {
  const { data, error, loading } = useQuery(GET_ALL_USERS, {
    fetchPolicy: "cache-and-network"
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { users } = data;
  console.log(data);
  return (
    <section>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
