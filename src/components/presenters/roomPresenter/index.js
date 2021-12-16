import CreateRoomView from '../../view/createRoom';
import JoinRoomView from '../../view/joinRoom';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './roomPresenter.css';

export default function RoomPresenter(props) {
    const messages = ["room does not exist", ""]
    const navigate = useNavigate();
    const [joinRoomInput, setJoinRoomInput] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [message, setMessage] = useState("");

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
                        props.model.databaseHandler.createRoom("")
                            .then(() => {
                                props.model.joinRoom(props.model.databaseHandler.user.uid, true);
                                navigate('/play');
                            })
                    }}
                    />
                    <JoinRoomView
                        message={message}
                        onRoomName={(e) => {
                            setJoinRoomInput(e.target.value)
                        }}
                        onJoin={(roomId) => {
                            //console.log(joinRoomInput);
                            props.model.roomExists(joinRoomInput)
                            .then(e => {
                                //console.log(e);
                                if(e){
                                setMessage(messages[1]);
                                props.model.joinRoom(joinRoomInput);
                                navigate('/play');
                            }else {
                                setMessage(messages[0]);
                            }})
                        }}
                        />
            </div>
        </div>
    )
}