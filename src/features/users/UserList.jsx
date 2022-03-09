import { fetchUsers, userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import "./styles.css"; 

export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
  
    dispatch(userDeleted({ id }));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Dashboard</h1>
        
      </div>
      <div className="row">
      <h3 className="ten columns">User list</h3>
          <Link to="/add-user">
            <button className="button-primary">Add user</button>
          </Link>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>City</th>
                <th>Edit</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ id, name, email,username,address }, i) => (
                  <>
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{username &&username  }</td>
                    <td>{email}</td>
                    <td>{address && address.city}</td>
                    <td>
                      <Link to={`/edit-user/${id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                    <td>
                        <a  className="button" href="#delete-confirmation">Delete </a>
                      </td>                
                  </tr>
                    <div id="delete-confirmation" className="overlay">
                    <div className="popup">
                      <h2>Delete</h2>
                      <a className="close" href="#">&times;</a>
                      <div className="content">
                        <hr/>
                        <p>Are you sure you want to delete this user ?</p>
                        <hr/>
                        <div className="">
                          <a className=" button" href="#">cancel</a>
                          <a  className="button" onClick={() => handleDelete(id)} href="#"> delete</a>
                        </div>

                      </div>
                    </div>
                  </div>
                  </>
                ))}
            </tbody>
          </table>
        )}
      </div>
    
    </div>
  );
}
