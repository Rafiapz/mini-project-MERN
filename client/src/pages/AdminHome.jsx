import React, { useEffect, useState } from "react";
import Search from "../components/Search/Search";
import Card from "../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { loadAllusers } from "../api/apiServies";
import HeaderAdmin from "../components/AdminHeader/HeaderAdmin";

function AdminHome() {
  const usersList = useSelector((state) => state.usersList);

  const [displayUsers, setDisplayUsers] = useState(usersList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllusers(setDisplayUsers));

    return () => {};
  }, []);

  const handleSearch = (query) => {
    if (query !== "") {
      const filtered = usersList.filter((user) => {
        return user.username.toLowerCase().startsWith(query.toLowerCase());
      });
      console.log(filtered);
      setDisplayUsers(filtered);
    } else {
      setDisplayUsers(usersList);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <Search handleSearch={handleSearch} />
      <Card setDisplayUsers={setDisplayUsers} usersList={displayUsers} />
    </>
  );
}

export default AdminHome;
