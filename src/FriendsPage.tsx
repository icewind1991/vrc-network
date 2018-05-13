import './FriendsPage.css';
import { Api } from 'vrcapi/build/Api';
import { User } from 'vrcapi/build/Data';
import { LoadComponent } from './LoadComponent';
import * as React from 'react';
import { UserList } from './UserList';

export function FriendsPage({api}: { api: Api }) {
    return (
        <LoadComponent
            load={api.getFriends.bind(api)}
            renderer={(friends: User[]) => <UserList api={api} users={friends}/>}
        />
    );
}
