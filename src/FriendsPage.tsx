import './FriendsPage.css';
import { Api } from 'vrcapi/build/Api';
import { User } from 'vrcapi/build/Data';
import { LoadComponent } from './LoadComponent';
import * as React from 'react';
import { UserList } from './UserList';
import { createHook } from './Hook';

export function FriendsPage({api}: { api: Api }) {
    const reloadHook = createHook();

    return (
        <LoadComponent
            reloadHook={reloadHook}
            load={api.getFriends.bind(api)}
            renderer={(friends: User[], loading) => <div>
                <button className={`reload ${loading ? 'loading' : ''}`} onClick={reloadHook.trigger}/>
                <UserList api={api} users={friends}/>
            </div>}
        />
    );
}
