import react, { useState }  from 'react';
import { useDispatch } from 'react-redux'
import { addUser } from '../features/user/userSlice';
import { useHistory, useNavigate } from "react-router-dom";

export const Home = () => {
    let history = useHistory();
    const [name, setName] = useState('');
    const [profileUrl, setProfileUrl] = useState('');

    const onChangeName = e => setName(e.target.value);
    const onChangeProfleUrl = e => setProfileUrl(e.target.profileUrl);
    const dispatch = useDispatch()
    const onSaveUser = () => {
        if (name) {
            localStorage.setItem('currentUser', JSON.stringify({name: name, profileUrl}));
            history.push('/posts')
        }
    }
    return (
    <div className="f-container">
        <p>Welcome to Awesome blog enter your display name to get started</p>
        <div className="container">
            <label>Full Name *</label>
            <input 
                onChange={onChangeName} 
                type="text" 
                id="fname" 
                value={name}
                placeholder="Your name.."
            >

                </input>

            <label >Link to profile picture</label>
            <input onChange={onChangeProfleUrl}  
            value = {profileUrl}
            type="text" id="lname" 
            name="lastname" 
            placeholder="Your last name..">

            </input>
            <input onClick={onSaveUser} type="submit" value="Submit"></input>
        </div>
    </div>
    )
}