import { useEffect, useState } from 'react'

const MessageInput = (props) => {
    const {addMessage, channel, user} = props
    const [message, setMessage] = useState({
        time: '',
        user: user,
        message: ''
    })
    
    const today = new Date()
    const handleChange = (event) =>{
        setMessage({...message, message: event.target.value})
    }

    const currentTime = () =>{
        let hours = today.getHours()
        let mins = today.getMinutes()
        let time = ''
        if(mins < 10){
            mins = '0' + mins
        }
        if(hours >= 12){
            if(hours !== 12){
                hours = hours - 12
            }
            time = hours + ':' + mins + ' PM'
        }
        else if(hours === 0){
            hours = '0' + hours
            time = hours + ':' + mins + ' AM'
        }
        else{
            time = hours + ':' + mins + ' AM'
        }
        return time
    }

    const handleEnter = (event) => {
        setMessage({...message, time: currentTime()})
        if(event.code === "Enter"){
            addMessage(message)
            setMessage({...message, message: ''})
        }
    }

    return(
        <textarea rows='1' placeholder={'Message #' + channel} onChange={handleChange} onKeyDown={handleEnter} value={message.message}></textarea>
    )
}

export default MessageInput