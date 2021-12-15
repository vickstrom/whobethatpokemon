import './inviteFriends.css';
import Button from '../button';

export default function InviteFriendsView(props) {
    const path = window.location.pathname;
    const baseURL = window.location.href.slice(0, -path.length);
    return (
        <div className={'invite-friends'} hidden={props.hidden}>
            <h2>Invite your friends with this link: </h2>
            <input type="text" value={`${baseURL}/?roomId=${props.roomId}`}></input>
            <Button color="green" onClick={() => {navigator.clipboard.writeText(`${baseURL}/?roomId=${props.roomId}`)}}>Clipboard</Button>
        </div>
    )
}