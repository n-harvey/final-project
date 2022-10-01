import Login from "./login";
import Sidebar from "./sidebar";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import NewUser from "./NewUser";
import Channel from "./Channel";
import PageNotFound from "./PageNotFound";
import Home from "./Home";
import CreateChannel from "./createChannel";
import Backend from "./Backend";
import { managerAPI } from "../REST/API";

const Mainpage = () => {
  const [login, setlogin] = useState(false);
  const [user, setUser] = useState("");
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const createChannel = async (channelName) => {
    const resp = await managerAPI.get();
    const API = resp.filter((object) => object.type === "channels")[0];
    const ID = API._id;
    delete API._id;
    API.channels.push({
      channel: API.channels.length + 1,
      channelName: channelName,
      messages: [
        {
          time: "",
          user: "",
          message: `This is the start of the #${channelName} channel`,
        },
      ],
    });
    await managerAPI.put(ID, API);
    await fetchChannels();
    navigate(`/channel/${API.channels.length}`);
  };

  const fetchChannels = async () => {
    const resp = await managerAPI.get();
    const channels = resp.filter((object) => object.type === "channels");
    console.log("logging api channels", ...channels);
    setChannels(...channels);
  };

  const fetchUsers = async () => {
    const resp = await managerAPI.get();
    const users = resp.filter((object) => object.type === "users");
    console.log("logging api users", ...users);
    setUsers(...users);
  };

  const createUser = async (username, password) => {
    const resp = await managerAPI.get();
    const API = resp.filter((object) => object.type === "users")[0];
    const ID = API._id;
    delete API._id;
    API.users.push({ username: username, password: password });
    await managerAPI.put(ID, API);
    await fetchUsers();
  };

  const deleteUser = async (user) => {
    console.log(user.user)
    const resp = await managerAPI.get()
    const API = resp.filter((object) => object.type ==="users")[0]
    const ID = API._id
    delete API._id
    API.users = API.users.filter((users) => users.username !== user.user)
    setlogin(false)
    await managerAPI.put(ID, API)
    await fetchUsers()

  }

  useEffect(() => {
    fetchChannels();
    fetchUsers();
  }, []);

  console.log(login);
  if (login) {
      return (
        <Container fluid className="">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Flack</Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to={"/"}>
                {user}
              </Nav.Link>
            </Nav>
            <Button
              variant="dark"
              onClick={() => {
                setlogin(false);
                navigate("/");
              }}
            >
              Logout
            </Button>
          </Navbar>
          <Row className="mx-0">
            <Col sm={3} md={1} className="sidebar">
              <Sidebar channels={channels} />
            </Col>
            <Col className="channel">
              <Routes>
                <Route path="/backendcontrols" element={<Backend />} />
                <Route path="/" element={<Home user={user} deleteUser={deleteUser} />} />
                <Route
                  path="/channel/:channelID"
                  element={<Channel user={user} />}
                />
                <Route
                  path="/createChannel"
                  element={<CreateChannel create={createChannel} />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      );
  } else {
    return (
      <>
        <Container fluid className=''>
          <Row className=''>
            <Col className='d-flex justify-content-center align-items-center vh-100'>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Login log={setlogin} user={setUser} users={users.users} />
                  }
                />
                <Route
                  path="/create"
                  element={
                    <NewUser
                      setUser={setUser}
                      setlogin={setlogin}
                      create={createUser}
                      users={users.users}
                    />
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default Mainpage;
