import React from "react";
import Style from "./UserList.module.css";

const UserList = ({ users, serialNo, loading }) => {
  const isData = users.length !== 0;

  return (
    <div className={Style.userlist_container}>
      <div className={Style.all_contact_Container}>
        <h3>All Contacts</h3>
      </div>
      <div>
        <table className={Style.table}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Loading Record...
                </td>
              </tr>
            ) : !isData ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Record not Found!
                </td>
              </tr>
            ) : (
              users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{serialNo + index}.</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
