import './inviteFriends.css';

export default function InviteFriendsView(props) {
    const path = window.location.pathname;
    const baseURL = window.location.href.slice(0, -path.length);
    return (
        <div className={'invite-friends'} hidden={props.hidden}>
            <h2>Invite your friends with this link: </h2>
            <h3>{`${baseURL}/?roomId=${props.roomId}`}</h3>
        </div>
    )
}