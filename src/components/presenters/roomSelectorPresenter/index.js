import SearchRoomView from '../../view/searchRoom';
import RoomResultsView from '../../view/roomResults';
import CreateRoomView from '../../view/createRoom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomSelectorPresenter(props) {
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [rooms, setRooms] = useState(props.model.rooms);
    const navigate = useNavigate();
    useEffect(() => {
        props.model.addObserver(() => {
            setRooms(props.model.rooms);
        })
    }, [])
    return (
        <div>
            <CreateRoomView />
            <SearchRoomView /> 
            <RoomResultsView
                rooms={rooms}
                onJoin={(roomId) => {
                    setSelectedRoomId(roomId);
                    props.model.joinRoom(props.model.myId, roomId);
                    navigate('/play');
                }
                }/>
        </div>
    )
}