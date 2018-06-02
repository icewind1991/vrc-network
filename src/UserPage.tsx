import { Api } from 'vrcapi/build/Api';
import { LoadComponent } from './LoadComponent';
import * as React from 'react';
import { User } from 'vrcapi/build/Data';
import { UserView } from './UserView';

export interface UserPageProps {
    userId: string;
    api: Api;
}

export function UserPage({userId, api}: UserPageProps) {
    return (
        <LoadComponent
            load={api.getUserById.bind(api, userId)}
            renderer={(user: User) => <UserView user={user} api={api}/>}
        />
    );
}
