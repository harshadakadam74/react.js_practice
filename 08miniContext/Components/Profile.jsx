import React, {useContext} from 'react'
import UserContext from '../src/context/UserContext'

const Profile = () => {
  const {user} = useContext(UserContext)

  if(!user) return <div>Please login to view your profile</div>
//     return (<div>
//         {/* <h2>Welcome</h2>    
//         <p>Username: {user.username}</p>
//         <p>Password: {user.password}</p> */}
//     </div>
//   )
  return <div>WelCome {user.username}</div>
}

export default Profile
