import SearchRoomView from '../components/view/searchRoom'
import RoomResultsView from '../components/view/roomResults'
import CreateRoomView from '../components/view/createRoom'

export default function RoomSelectorPresenter() {
    return (
        <div>
            <CreateRoomView />
            <SearchRoomView /> 
            <RoomResultsView />
        </div>
    )
}