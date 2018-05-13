import * as React from 'react';
import { User } from 'vrcapi/build/Data';
import './UserView.css';
import { InstanceInfo } from './InstanceInfo';
import { Api } from 'vrcapi/build/Api';

export function UserView({user, api}: { user: User, api: Api }) {
    return (
        <table className="userView">
            <tbody>
            <tr>
                <td rowSpan={2}>
                    <img src={user.avatar.thumbnail}/>
                </td>
                <td>
                    {user.displayName}
                </td>
            </tr>
            <tr>
                <td>
                    <InstanceInfo instanceId={user.location} api={api}/>
                </td>
            </tr>
            </tbody>
        </table>
    );
}
