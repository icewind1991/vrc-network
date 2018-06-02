import './FriendsPage.css';
import { Api } from 'vrcapi/build/Api';
import { Instance, InstanceId } from 'vrcapi/build/Data';
import { LoadComponent } from './LoadComponent';
import * as React from 'react';
import { UserList } from './UserList';
import { InviteButton } from './InviteButton';
import { createHook } from './Hook';

export function InstancePage({api, instanceId}: { api: Api, instanceId: InstanceId }) {
    const reloadHook = createHook();

    return (
        <LoadComponent
            reloadHook={reloadHook}
            load={api.getInstanceById.bind(api, instanceId)}
            renderer={(instance: Instance, loading) => (<span>
                <button className={`reload ${loading ? 'loading' : ''}`} onClick={reloadHook.trigger}/>
                <InviteButton api={api} instance={instanceId}/>
                <UserList api={api} users={instance.users}/>
            </span>)}
        />
    );
}
