import SearchRoomView from '../../view/searchRoom';
import RoomResultsView from '../../view/roomResults';
import CreateRoomView from '../../view/createRoom';

export default function RoomSelectorPresenter() {
    return (
        <div>
            <CreateRoomView />
            <SearchRoomView /> 
            <RoomResultsView />
        </div>
    )
}