import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function RegisterPresenter(props) {
    const [displayName, setDisplayName] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('roomId');

    return (
        <div>
            <input type="text" onChange={e => setDisplayName(e.target.value)} />
            <button onClick={() => {
                props.model.databaseHandler.setAccountDetails(displayName).then(() => {
                    navigate('/room' + (id ? `?roomId=${id}` : ''));
                });
                console.log("register")

            }}>Register</button>
        </div>
    ) }