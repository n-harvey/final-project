import { useState } from "react"

const CreateChannel = (props) => {

    const {create} = props
    const [channelName, setChannelName] = useState('')

    const handleChange = (e) => {
        setChannelName(e.target.value)
    }

    return(
        <div>
            <input type='text' placeholder="Channel Name" onChange={handleChange} value={channelName}></input> <br></br>
            <button className='btn btn-primary' onClick={() => create(channelName)}>Create Channel</button>
        </div>
    )
}

export default CreateChannel