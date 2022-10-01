import { NavLink, Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

const Sidebar = (props) => {
  const { channels } = props;
  console.log("logging channels from sidebar:", channels);
  if (channels.channels !== undefined) {
    return (
      <>
        <Row className=""> 
          <Col className="">
            <div className="d-grid text-truncate ">
              <h3>Channels</h3>
              {channels.channels.map((channels) => (
                <>
                  <NavLink
                    to={"/channel/" + channels.channel}
                    className={({ isActive }) =>
                      (isActive ? "active" : "inactive") + " hover"
                    }
                  >
                    <Button
                      id="channel_button"
                      className="btn text-start "
                      type="button"
                    >
                      #{channels.channelName}
                    </Button>
                  </NavLink>
                  <br></br>
                </>
              ))}
            </div>
            <Col>
            </Col>
            <Row className="text-end mb-1 mt-1">
              <Col>
                <Link to={"/createChannel/"}>
                  <Button variant="light">
                    <strong>+</strong>
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <div className="channel">
      <h3>Channels</h3>
      <Link to={"/createChannel/"}>
        <button>+</button>
      </Link>
    </div>
  );
};

export default Sidebar;
