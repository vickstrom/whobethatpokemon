import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPresenter(props) {
    const [displayName, setDisplayName] = useState("");
    const navigate = useNavigate();
    return (
        <div>
            <input type="text" onChange={e => setDisplayName(e.target.value)} />
            <button onClick={() => {
                props.model.databaseHandler.setAccountDetails(displayName).then(() => {
                    navigate('/rooms');
                });
                console.log("register")

            }}>Register</button>
        </div>
    ) }