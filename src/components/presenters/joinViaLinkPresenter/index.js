import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../view/spinner';

export default function JoinViaLinkView(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const id = searchParams.get('roomId');
        console.log("id is: ", id);
        if (!id) {
            navigate('/');
            return;
        }
        if (!props.model.databaseHandler.user) {
            navigate(`/?roomId=${id}`);
            return;
        }
        else {
            props.model.joinRoom(props.model.databaseHandler.user.uid, false);
            navigate('/play');
            return;
        }
    }, [])
    return (
        <div>
            <p>Joining room...</p>
            <Spinner />
        </div>
    )
}
