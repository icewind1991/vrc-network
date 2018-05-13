import './FriendsPage.css';
import { Api } from 'vrcapi/build/Api';
import { Instance, InstanceId } from 'vrcapi/build/Data';
import { LoadComponent } from './LoadComponent';
import * as React from 'react';
import { UserList } from './UserList';
import { InviteButton } from './InviteButton';

export function InstancePage({api, instanceId}: { api: Api, instanceId: InstanceId }) {
    return (
        <LoadComponent
            load={api.getInstanceById.bind(api, instanceId)}
            renderer={(instance: Instance) => (<span>
                <InviteButton api={api} instance={instanceId}/>
                <UserList api={api} users={instance.users}/>
            </span>)}
        />
    );
}
