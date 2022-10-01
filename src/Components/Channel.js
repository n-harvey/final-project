import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import MessageInput from "./MessageInput";
import { useEffect, useState, useRef } from "react";
import { managerAPI } from "../REST/API";

const Channel = (props) => {
  const { user } = props;
  const { channelID } = useParams();
  const id = parseInt(channelID);

  const [messages, setMessage] = useState([]);
  const [channel, setChannel] = useState({});
  const [API, setAPI] = useState({});

  const getMessages = async () => {
    const resp = await managerAPI.get();
    console.log("Response from getMessages", resp);
    const data = resp.filter((object) => object.type === "channels")[0]
      .channels[id - 1].messages;
    setChannel(
      resp.filter((object) => object.type === "channels")[0].channels[id - 1]
    );
    setAPI(resp.filter((object) => object.type === "channels")[0]);
    setMessage(data);
  };

  useEffect(() => {
    getMessages();
  }, [channelID, setMessage]);

  const addMessage = async (newMessage) => {
    const body = API;
    const ID = body._id;
    delete body._id;
    body.channels[id - 1].messages.push(newMessage);
    console.log("Logging updated message", body);
    await managerAPI.put(ID, body);
    getMessages();
    document.getElementById('dummy').focus()
  };

  const deleteMessage = async (index) => {
    console.log(index);
    const body = API;
    const ID = body._id;
    delete body._id;
    body.channels[id - 1].messages.splice(index, 1);
    await managerAPI.put(ID, body);
    getMessages();
  };

  const ScrollToBottom = () => {
    const elementRef = useRef()
    useEffect(() => elementRef.current.scrollIntoView())
    return <div className="mb-auto" ref={elementRef} />
  }

  return (
    <>
          <Row className="fw-bold channel">
            <Col>#{channel.channelName}</Col>
          </Row>
          <Row className="">
            <Col className="overflow-auto messages-container" id='message-box'>
              {messages.map((message) => {
                if (message.user === user || user === "admin")
                  return (
                    <>
                      <p>
                        {message.time} <strong>{message.user}</strong>{" "}
                        {message.message}{" "}
                        <br></br><button
                          className="btn btn-danger btn-small"
                          onClick={() =>
                            deleteMessage(messages.indexOf(message))
                          }
                        >
                          delete
                        </button>
                      </p>
                    </>
                  );
                return (
                  <p>
                    {message.time} <strong>{message.user}</strong>{" "}
                    {message.message}{" "}
                  </p>
                );
              })}
              <ScrollToBottom />
            </Col>
          </Row>
          
          <Row className="">
            <Col className="channel d-grid mt-auto">
              <MessageInput
                addMessage={addMessage}
                channel={channel.channelName}
                user={user}
              />
            </Col>
      </Row>
    </>
  );
};

export default Channel;
