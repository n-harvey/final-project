import { Form, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { managerAPI } from "../REST/API";

const NewUser = (props) => {
  const { setUser, setlogin, create, users } = props;
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);

  const handleUser = (e) => setusername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const createAccount = () => {
    console.log("Logging users from createUser", users);
    console.log(
      "Was user name undefined",
      users.find((user) => user.username === username) === undefined
    );
    if (username !== "" && password !== "") {
      if (users.find((user) => user.username === username) === undefined) {
        create(username, password);
        setUser(username);
        setlogin(true);
        navigate("/");
      } else {
        console.log("user already exists");
        setInvalid(true);
        setusername("");
        setPassword("");
      }
    }
    else{
        setInvalid(true)
    }
  };

  if (invalid) {
    return (
      <Form>
        <Form.Group>
          <Form.Label className="text-white">User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            onChange={handleUser}
            value={username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="text-white">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePassword}
            value={password}
          ></Form.Control>
        </Form.Group>
        <Button onClick={createAccount}>Create New Account</Button>
        <Link to={"/"}>
          <Button>Back</Button>
        </Link>
        <Alert
        id='alerts'
          variant="danger text-center"
          dismissible
          onClose={() => setInvalid(false)}
        >
          User already exists
        </Alert>
      </Form>
    );
  }
  return (
    <Form>
      <Form.Group>
        <Form.Label className="text-white">User Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="username"
          onChange={handleUser}
          value={username}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-white">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          value={password}
        ></Form.Control>
      </Form.Group>
      <Button onClick={createAccount}>Create New Account</Button>
      <Link to={"/"}>
        <Button>Back</Button>
      </Link>
    </Form>
  );
};

export default NewUser;
