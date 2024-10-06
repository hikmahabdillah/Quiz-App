import { useEffect, useState } from "react";
// import axios from "axios";

const getData = async () => {
  try {
    const response = await import("../assets/data/userDummy.json");
    return response.default;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getUserData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getData();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return users;
};
