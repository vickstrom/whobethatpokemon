import CreateRoomView from '../../view/createRoom';
import JoinRoomView from '../../view/joinRoom';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './roomPresenter.css';

const getRoomIdFromUrl = url => {
    try {
        const newrl = new URL(url);
        const id = newrl.searchParams.get("roomId");
        return id;
        }catch{
            return false;
        }
    }

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
                        props.model.createRoom()
                            .then(() => {
                                props.model.joinRoom(props.model.userId, true);
                                navigate('/play');
                            })
                    }} />
                    <JoinRoomView
                        message={message}
                        onRoomName={(e) => {
                            setJoinRoomInput(e.target.value)
                        }}
                        onJoin={() => {
                            if(joinRoomInput === ""){
                                setMessage(messages[0]);
                            }
                            else{
                                let room = joinRoomInput;
                                const roomId = getRoomIdFromUrl(joinRoomInput);
                                if(roomId){
                                    room = roomId;
                                }
                                props.model.roomExists(room)
                                .then(e => {
                                    if(e){
                                    setMessage(messages[1]);
                                    props.model.joinRoom(room);
                                    navigate('/play');
                                }else {
                                    setMessage(messages[0]);
                                }})
                            }}}
                        />
            </div>
        </div>
    )
}