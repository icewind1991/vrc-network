import * as React from 'react';
import { Api } from 'vrcapi/build/Api';
import { User } from 'vrcapi/build/Data';
import { UserView } from './UserView';

export interface UserListProps {
    api: Api;
    users: User[];
}

export function UserList({api, users}: UserListProps) {
    return (
        <div>
            {users
                .sort((a, b) => a.displayName.localeCompare(b.displayName))
                .map((user, key) => (
                    <UserView key={key} user={user} api={api}/>
                ))}
        </div>
    );
}
