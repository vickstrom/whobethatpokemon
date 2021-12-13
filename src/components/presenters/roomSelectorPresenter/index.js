import SearchRoomView from '../../view/searchRoom';
import RoomResultsView from '../../view/roomResults';
import CreateRoomView from '../../view/createRoom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './roomSelector.css';
import Room from '../../../model/roomModel';

export default function RoomSelectorPresenter(props) {
    const [createRoomInput, setCreateRoomInput] = useState("");
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [rooms, setRooms] = useState(props.model.rooms);
    const navigate = useNavigate();
    useEffect(() => {
        props.model.addObserver(() => {
            setRooms(props.model.rooms);
        });
        props.model.databaseHandler.subscribeToRooms((snapshot) => {
            if (snapshot.exists()) {
                const rooms = snapshot.val();
                const rooms_ids = Object.keys(snapshot.val());
                for (let i = 0; i < rooms_ids.length; i++) {
                    const room_id = rooms_ids[i];
                    props.model.addRoom(new Room(props.model.databaseHandler, room_id, rooms[room_id].title)); 
                }
            }
        });
    }, []); 
    return (
        <div>
            <div className='roomSelector'>
                <div>
                    <div className={'intro'}>
                        <CreateRoomView 
                            onSubmit={(e) => {

                            }}
                            onChange={(e) => {
                                setCreateRoomInput(e.target.value);
                            }} />
                        <SearchRoomView /> 
                    </div>
                </div>
            </div>
            <div className={'roomSelector'}>
                <div>
                    <div className={'intro'}>
                        <RoomResultsView
                        rooms={rooms}
                        onJoin={(roomId) => {
                            setSelectedRoomId(roomId);
                            props.model.joinRoom(props.model.databaseHandler.user.uid, roomId);
                            navigate('/play');
                        }
                        }/>
                    </div>
                </div>
            </div>
        </div>
    )
}