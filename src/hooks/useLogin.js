import { useEffect, useState } from "react";
// import axios from "axios";

const getData = async () => {
  try {
    const response = await import("../assets/data/userDummy.json"); // mengambil data dummy user dari file.json yang dibuat
    return response.default; // untuk mendapatkan akses data utama yaitu user
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getUserData = () => {
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getData(); // get data users dari func getData
      setUsers(data); // tampung di state users
    };

    fetchUsers();
  }, []);

  return users; // func akan mengembalikan data pada state users
};
