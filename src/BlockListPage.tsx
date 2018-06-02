import './FriendsPage.css';
import { Api } from 'vrcapi/build/Api';
import { LoadComponent } from './LoadComponent';
import * as React from 'react';
import { createHook } from './Hook';
import { BlockedUser } from 'vrcapi/build/ApiReponses';
import './UserView.css';
import { Link } from 'react-router-dom';

export function BlockListPage({api}: { api: Api }) {
    const reloadHook = createHook();

    return (
        <LoadComponent
            reloadHook={reloadHook}
            load={api.getBlockedUsers.bind(api)}
            renderer={(users: BlockedUser[], loading) => (<span>
                <button className={`reload ${loading ? 'loading' : ''}`} onClick={reloadHook.trigger}/>
                <h3>{users.length} blocked users</h3>
                <table className="userView">
            <tbody>
                {users.map((user, key) => (
                    <BlockedUserView key={key} user={user}/>
                ))}
            </tbody>
                </table>
            </span>)}
        />
    );
}

const options = { year: 'numeric', month: 'long', day: 'numeric' };

function BlockedUserView({user}: { user: BlockedUser }) {
    return (
        <tr>
            <td>
                <Link to={`users/${user.targetUserId}`}>
                    {user.targetDisplayName}
                </Link>
            </td>
            <td>{(new Date(user.created)).toLocaleDateString('en-US', options)}</td>
        </tr>
    );
}
