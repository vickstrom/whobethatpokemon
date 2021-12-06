import SearchRoomView from '../../view/searchRoom';
import RoomResultsView from '../../view/roomResults';
import CreateRoomView from '../../view/createRoom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './roomSelector.css';

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
            <div className='roomSelector'>
                <div>
                    <div className={'intro'}>
                        <CreateRoomView />
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
                            props.model.joinRoom(props.model.myId, roomId);
                            navigate('/play');
                        }
                        }/>
                    </div>
                </div>
            </div>
        </div>
    )
}