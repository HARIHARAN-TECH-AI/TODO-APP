import { useEffect, useState } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function Task() {
  const API = "http://localhost:4040/api";

  useEffect(() => {
    FetchResult();
  }, []);

  const [Formdata, Setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [Edit, Setedit] = useState(null);
  const [Data, Setdata] = useState([]);

  async function FetchResult() {
    const res = await axios.get(`${API}/find`);
    Setdata(res.data.data);
  }

  function handlechange(e) {
    const { name, value } = e.target;
    Setformdata({ ...Formdata, [name]: value });
  }

  async function AddTask() {
    if (Formdata.name === "" || Formdata.email === "" || Formdata.password === "") {
      toast.warn("Please provide all details");
      return; // stop execution
    }

    if (Edit) {
      await axios.put(`${API}/update/${Edit}`, Formdata);
      toast.info("User updated!");
      Setedit(null);
    } else {
      await axios.post(`${API}/insert`, Formdata);
      toast.success("User Added!");
    }

    Setformdata({ name: "", email: "", password: "" });
    FetchResult();
  }

  async function EditData(id, data) {
    Setformdata(data);
    Setedit(id);
  }

  async function DelTask(id) {
    await axios.delete(`${API}/delete/${id}`);
    toast.error("User Deleted");
    FetchResult();
  }

  return (
    <>
    <style>{`
  body {
    font-family: Arial, sans-serif;
    background: #f4f7fa;
  }

  input {
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: 0.3s;
    width: 250px;
  }

  input:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0,123,255,0.3);
  }

  .add-btn {
    background-color: #28a745;
    color: white;
    padding: 10px 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    transition: 0.3s;
  }

  .add-btn:hover {
    background-color: #218838;
    transform: scale(1.05);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-family: Arial, sans-serif;
    box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
  }

  th {
    background-color: #007bff;
    color: white;
    font-size: 16px;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  button {
    margin: 2px;
    padding: 8px 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  .edit-btn {
    background-color: #ffc107;
    color: black;
  }

  .delete-btn {
    background-color: #dc3545;
    color: white;
  }
`}</style>


      Enter Name:
      <input
        type="text"
        name="name"
        value={Formdata.name}
        onChange={handlechange}
      />
      Enter Email:
      <input
        type="email"
        name="email"
        value={Formdata.email}
        onChange={handlechange}
      />
      Enter Password:
      <input
        type="password"
        name="password"
        value={Formdata.password}
        onChange={handlechange}
      />
      <button onClick={AddTask} className="add-btn">{Edit ? "Update" : "ADD"}</button>

      {Data && (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => EditData(data._id, data)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => DelTask(data._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}

export default Task;
