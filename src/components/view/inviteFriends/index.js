import './inviteFriends.css';
import Button from '../button';
import Input from '../input';

export default function InviteFriendsView(props) {
    const path = window.location.pathname;
    const baseURL = window.location.href.slice(0, -path.length);
    let linkMessage = null; 
    if (props.hasCopied === null) {
        linkMessage = '';
    } else {
        if (props.hasCopied) {
            linkMessage = "Copy successful"
        } else {
            linkMessage = "Copy failed"
        }
    }
    return (
        <div className={'invite-friends'} hidden={props.hidden}>
            <div>
                <h2>Play with friends</h2>
            </div>
            <div>
                <Input type="text" value={`${baseURL}/?roomId=${props.roomId}`} readOnly={true}></Input>
            </div>
            <div>
            <Button color="green" onClick={() => {
                if (window.isSecureContext) {
                    navigator.clipboard.writeText(`${baseURL}/?roomId=${props.roomId}`)
                    props.copyLink(true)
                }
                else {
                    props.copyLink(false)
                }
                }} >Copy link</Button>
            </div>
            <div>
                {linkMessage}
            </div>
        </div>
    )
}