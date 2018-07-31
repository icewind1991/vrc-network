import './FriendsPage.css';
import { Api } from 'vrcapi/build/Api';
import { LoadComponent } from './LoadComponent';
import * as React from 'react';
import { createHook } from './Hook';
import { ModerationItemResponse } from 'vrcapi/build/ApiReponses';
import './UserView.css';
import { Link } from 'react-router-dom';

export function BlockedByListPage({api}: { api: Api }) {
    const reloadHook = createHook();

    return (
        <LoadComponent
            reloadHook={reloadHook}
            load={api.getPlayerModerated.bind(api)}
            renderer={(items: ModerationItemResponse[], loading) => {
                let blockedUsers: ModerationItemResponse[] =
                    items.reduce(
                        (users: ModerationItemResponse[], item: ModerationItemResponse) => {
                            if (item.type === 'block') {
                                users.push(item);
                            } else if (item.type === 'unblock') {
                                users = users.filter(user => user.sourceUserId !== item.sourceUserId);
                            }
                            return users;
                        },
                        []
                    );
                return (
                    <span>
                        <button className={`reload ${loading ? 'loading' : ''}`} onClick={reloadHook.trigger}/>
                        <h3>{blockedUsers.length} users blocked you</h3>
                        <table className="userView">
                            <tbody>
                                {blockedUsers.map((user, key) => (
                                    <BlockedByUserView key={key} user={user}/>
                                ))}
                            </tbody>
                        </table>
                    </span>
                );
            }}
        />
    );
}

const options = {year: 'numeric', month: 'long', day: 'numeric'};

function BlockedByUserView({user}: { user: ModerationItemResponse }) {
    return (
        <tr>
            <td>
                <Link to={`users/${user.sourceUserId}`}>
                    {user.sourceDisplayName}
                </Link>
            </td>
            <td>{(new Date(user.created)).toLocaleDateString('en-US', options)}</td>
        </tr>
    );
}
