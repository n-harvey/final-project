import { NavLink, Link } from 'react-router-dom'


const Sidebar = (props) => {
    
    const {channels} = props
    console.log('logging channels from sidebar:', channels)
    if(channels.channels !== undefined){
    return(
        <>
        <div className='channel d-grid text-truncate'>
            <h3>Channels</h3>
            {channels.channels.map((channels) => (
                <>
                <NavLink to={'/channel/' + channels.channel} className={({ isActive }) => (isActive ? 'active' : 'inactive') + ' hover'}><button id='channel_button' className='btn text-start ' type='button'>#{channels.channelName}</button></NavLink><br></br>
                </>
            ))}
            </div>
            <div className='text-end'>
            <Link to={'/createChannel/'}><button >+</button></Link>
            </div>
            </>
    )
            }
    return(
        <div className='channel'>
        <h3>Channels</h3>
        <Link to={'/createChannel/'}><button>+</button></Link>
    </div>
    )
}

export default Sidebar