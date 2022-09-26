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

  useEffect(() => {
    fetchChannels();
    fetchUsers();
  }, []);

  console.log(login);
  if (login) {
    if (user === "admin") {
      return (
        <Container>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
              Fake Discord
            </Navbar.Brand>
            <Nav className="ms-auto">
            <Nav.Link as={Link} to={'/'}>{user}</Nav.Link>
            </Nav>
            <Button variant='dark' onClick={() => setlogin(false)}>Logout</Button>
          </Navbar>
          <Row>
            <Col md={2} >
              <Sidebar channels={channels} />
            </Col>
            <Col xlg='auto'>
              <Routes>
                <Route path="/backendcontrols" element={<Backend />} />
                <Route path="/" element={<Home user={user} />} />
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
    }
    return (
        <Container>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
              Fake Discord
            </Navbar.Brand>
            <Nav className="ms-auto">
            <Nav.Link as={Link} to={'/'}>{user}</Nav.Link>
            </Nav>
            <Button variant='dark' onClick={() => setlogin(false)}>Logout</Button>
          </Navbar>
          <Row>
            <Col md={2} >
              <Sidebar channels={channels} />
            </Col>
            <Col xlg='auto'>
              <Routes>
                <Route path="/backendcontrols" element={<Backend />} />
                <Route path="/" element={<Home user={user} />} />
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
        <Container fluid>
          <Row>
            <Col>
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
