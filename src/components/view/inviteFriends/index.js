export default function InviteFriendsView(props) {
    const path = window.location.pathname;
    const baseURL = window.location.href.slice(0, -path.length);
    return (
        <div hidden={props.hidden}>
            <p>Invite your friends with this link: </p>
            <span>{`${baseURL}/?roomId=${props.roomId}`}</span>
        </div>
    )
}