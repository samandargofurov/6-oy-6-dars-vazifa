import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { nanoid } from "nanoid";

import { validate, getUsers } from "./utilits/functions";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [nat, setNat] = useState("");

  useEffect(() => {
    let u = getUsers();
    setUsers(u);
  }, []);

  function handleRadio(value) {
    setNat(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isValid = validate(name, age, email, pass, nat);
    if (isValid) {
      const user = {
        name: name,
        email: email,
        age: age,
        pass: pass,
        nat: nat,
        id: nanoid()
      }

      let copied = JSON.parse(JSON.stringify(users));
      copied.push(user)
      localStorage.setItem('users', JSON.stringify(copied));
      setName('');
      setAge(0);
      setEmail('');
      setPass('')
      setNat('');
    }
  }

  return (
    <>
      <div className="container">
        <h2 className="text-center mt-2 mb-3">Users information</h2>

        <form className="w-50 mx-auto d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {  
              setName(e.target.value);
            }}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />

          <div className="radio">

            <div className="form-check">
              <input 
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="uzbek"
                value="uzbek"
                onChange={(e) => {
                  handleRadio(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="uzbek">Uzbek</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="russian"
                value="russian"
                onChange={(e) => {
                  handleRadio(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="russian">Russian</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="english"
                value="english"
                onChange={(e) => {
                  handleRadio(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="english">English</label>
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-4">Submit</button>
        </form>

        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Password</th>
              <th>Nationality</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>1</td>
              <td>john</td>
              <td>34</td>
              <td>john@gamil.com</td>
              <td>123</td>
              <td>uzbek</td>
              <td>
                <div className="d-flex gap-2">
                  <FaRegTrashAlt />
                  <FaEdit />
                </div>
              </td>
            </tr>

          </tbody>
          
        </table>
        
      </div>
    </>
  );
}

export default App;
