import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
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
  const [isDelete, setIsDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");

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
        id: nanoid(),
        visible: false,
      };

      let copied = JSON.parse(JSON.stringify(users));
      copied.push(user);
      localStorage.setItem("users", JSON.stringify(copied));
      setName("");
      setAge(0);
      setEmail("");
      setPass("");
    }
  }

  function handleShow(command, user) {
    let copied = JSON.parse(JSON.stringify(users));
    copied = copied.map((arg) => {
      if (arg.id == user.id && command == "show") {
        arg.visible = true;
      }

      if (arg.id == user.id && command == "hide") {
        arg.visible = false;
      }

      return arg;
    });

    setUsers(copied);
  }

  function handleUpdate() {
    if (updateId) {
      const isValid = validate(name, age, email, pass, nat);

      if (isValid) {
        const user = {
          name: name,
          email: email,
          age: age,
          pass: pass,
          nat: nat,
          id: updateId,
          visible: false,
        };

        let copied = JSON.parse(JSON.stringify(users));
        copied = copied.map((arg) => {
          if (arg.id == updateId) {
            arg = user;
          }
          return arg;
        });

        setUsers(copied);
        localStorage.setItem("users", JSON.stringify(copied));
        setUpdate(false);
        setName("");
        setAge(0);
        setEmail("");
        setPass("");
      }
    }
  }

  function handleUpdateItem(user) {
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
    setPass(user.pass);
    setUpdate(true);
    setNat(user.nat);
    setUpdateId(user.id);
  }

  function handleDelete(item) {
    let isDelete = confirm('Rostdan ham ochirmoqchimisiz')
    if (isDelete) {
      let copied = JSON.parse(JSON.stringify(users));
      copied = copied.filter(user => {
        return user.id != item.id
      })

      localStorage.setItem('users', JSON.stringify(copied))
      setUsers(copied)
    }
  }

  return (
    <>
      <div className="container">
        <h2 className="text-center mt-2 mb-3">Users information</h2>

        <form className="w-50 mx-auto d-flex flex-column gap-3">
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

          {!update && (
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
                <label className="form-check-label" htmlFor="uzbek">
                  Uzbek
                </label>
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
                <label className="form-check-label" htmlFor="russian">
                  Russian
                </label>
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
                <label className="form-check-label" htmlFor="english">
                  English
                </label>
              </div>
            </div>
          )}

          {update && (
            <div className="radio">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="uzbek"
                  checked={nat == "uzbek" ? true : false}
                  value="uzbek"
                  onChange={(e) => {
                    handleRadio(e.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="uzbek">
                  Uzbek
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="russian"
                  checked={nat == "russian" ? true : false}
                  value="russian"
                  onChange={(e) => {
                    handleRadio(e.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="russian">
                  Russian
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="english"
                  checked={nat == "english" ? true : false}
                  value="english"
                  onChange={(e) => {
                    handleRadio(e.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="english">
                  English
                </label>
              </div>
            </div>
          )}

          {!update && (
            <button
              onClick={handleSubmit}
              className="btn btn-primary w-100 mt-4"
            >
              Submit
            </button>
          )}

          {update && (
            <button
              onClick={handleUpdate}
              className="btn btn-primary w-100 mt-4"
            >
              Update
            </button>
          )}
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
            {users.length > 0 &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <span>{user.visible ? user.pass : "****"}</span>
                        <span>
                          {user.visible ? (
                            <FaEye
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleShow(() => {
                                  handleShow("hide", user);
                                });
                              }}
                            ></FaEye>
                          ) : (
                            <FaEyeSlash
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleShow("show", user);
                              }}
                            ></FaEyeSlash>
                          )}
                        </span>
                      </div>
                    </td>
                    <td>{user.nat}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <FaRegTrashAlt onClick={() => {handleDelete(user)}} style={{ cursor: "pointer" }} />
                        <FaEdit
                          onClick={() => {
                            handleUpdateItem(user);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
