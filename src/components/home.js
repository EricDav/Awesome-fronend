import { useState }  from 'react';
import { useHistory } from "react-router-dom";

export const Home = () => {
    let history = useHistory();
    const [name, setName] = useState('');
    const onChangeName = e => setName(e.target.value);
    const onSaveUser = () => {
        if (name) {
            localStorage.setItem('currentUser', JSON.stringify({name: name}));
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
            <input onClick={onSaveUser} type="submit" value="Submit"></input>
        </div>
    </div>
    )
}