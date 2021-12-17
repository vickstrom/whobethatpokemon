import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../view/spinner';

export default function JoinViaLinkPresenter(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [roomExists, setRoomExists] = useState(true);

    useEffect(() => {
        const id = searchParams.get('roomId');
        console.log("id is: ", id);
        if (!id) {
            navigate('/');
            return;
        }
        props.model.roomExists(id).then(exists => {
            if (exists) {
                navigate(`/?roomId=${id}`);
            } else {
                setRoomExists(false);
            }
            console.log('room exists ', roomExists);
        })
    }, [])
    return (
        <div>
            <div hidden={!roomExists}> 
                <h2>Joining room... {roomExists}</h2>
                <Spinner />
            </div>
            <p hidden={roomExists} style={{color: 'red'}}>Error: the room you are trying to join does not exist</p>
        </div>
    )
}
