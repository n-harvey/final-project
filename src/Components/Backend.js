import { useEffect, useState } from "react"
import {Row, Col} from "react-bootstrap"
import { managerAPI } from "../REST/API"






const BackendControls = () => {
    const [API, setAPI] = useState([])
    
    const createChannels = async () =>
    {
        await managerAPI.post({ 
            type: 'channels', 
            channels: [
                {   channel: 1,
                    channelName: 'general chat',
                    messages: [{
                        time: '',
                        user: '',
                        message: 'This is the start of #general chat message history'
                    },
                    {
                        time: '12:38 AM',
                        user: 'admin',
                        message: 'Testing channel 1'
                    },
                    {
                        time: '12:38 AM',
                        user: 'admin',
                        message: 'Testing channel 1 2'
                    },
                    {
                        time: '12:38 AM',
                        user: 'admin',
                        message: 'channel 1'
                    }]
                },
                {   channel: 2,
                    channelName: 'Channel 2',
                    messages: [{
                        time: '',
                        user: '',
                        message: 'This is the start of #Channel 2 message history'
                    }]
                },
                {   channel: 3,
                    channelName: 'Channel 3',
                    messages: [{
                        time: '',
                        user: '',
                        message: 'This is the start of #Channel 3 message history'
                    }]
                }
            ]
        })
    }

    const createUsers = async () => {
        await managerAPI.post({
            type: 'users',
            users: [{username: 'admin', password: 'admin'}]
        })
    }

    const fetchData = async () => {
        const resp = await managerAPI.get()
        console.log('logging fetch data resp', resp)
        setAPI([...resp])
    }

    const deleteNode = async (id) => {
        console.log(id)
        await managerAPI.delete(id)
        fetchData()
    }

    return(
        
        <>{console.log('logging current API', API)}
        <Row className="text-center">
            <Col>
                <button className="btn btn-primary" onClick={createChannels}>Create Channel Array in API</button>
            </Col>
            <Col>
                <button className="btn btn-primary" onClick={createUsers}>Create User Array in API</button>
            </Col>            
        </Row>
            <Row>
                <Col>
                <button onClick={fetchData}>Display API</button>
                </Col>
            </Row>
            <Row>

                {API.map((object) => {
                    return (
                    <>
                    <Col className="channel">
                    <p>API ID: {object._id}</p>
                    <p>Object Type: {object.type}</p>
                    <button className="btn btn-danger" onClick={() => deleteNode(object._id)}>Delete Node</button>
                    </Col>
                    </>
                    )
                })}
                
            </Row>
           </>
    )
}

export default BackendControls