import CreateRoomView from '../../view/createRoom';
import JoinRoomView from '../../view/joinRoom';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './roomPresenter.css';

export default function RoomPresenter(props) {
    const navigate = useNavigate();
    const [joinRoomInput, setJoinRoomInput] = useState("");
    const [createRoomInput, setCreateRoomInput] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const joinRoomId = searchParams.get('roomId');
        if (joinRoomId) {
            props.model.joinRoom(joinRoomId, false);
            navigate('/play');
            return;
        }
    }, []);
    return (
        <div>
            <div className='roomSelector'>
                <CreateRoomView 
                    onSubmit={(e) => {
                        props.model.databaseHandler.createRoom(createRoomInput)
                            .then(() => {
                                props.model.joinRoom(props.model.databaseHandler.user.uid, true);
                                navigate('/play');
                            })
                    }}
                    onChange={(e) => {
                        setCreateRoomInput(e.target.value);
                    }} />
                    <JoinRoomView
                        onChange={(e) => {
                            setJoinRoomInput(e.target.value)
                        }}
                        onJoin={(roomId) => {
                            props.model.joinRoom(joinRoomInput);
                            navigate('/play');
                        }} />
            </div>
        </div>
    )
}