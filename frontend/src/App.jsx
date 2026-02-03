import React, { useEffect, useState } from "react";
import UserList from "./components/UserList";
import Pagination from "./components/Pagination";
import { api } from "./components/api.js";
import Style from "./App.module.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [serialNo, setSerialNo] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchingData = async (page = 1, limit = 5) => {
    try {
      setLoading(true);
      const res = await api.get(`/users?page=${page}&limit=${limit}`);
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSerialNo = (page, limit) => {
    setSerialNo(page * limit - limit + 1);
  };

  useEffect(() => {
    fetchingData(1, 5);
  }, []);

  return (
    <>
      <div className={Style.main}>
        <div className={Style.main_container}>
          <UserList users={users} serialNo={serialNo} loading={loading} />{" "}
          &nbsp;&nbsp;
          <Pagination
            fetchingData={fetchingData}
            getSerialNo={getSerialNo}
            limit={5}
          />
          <div className={Style.copyright_notice}>
            &copy; {new Date().getFullYear()} Vivek Kumar. All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
