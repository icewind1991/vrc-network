import * as React from 'react';
import './InstanceInfo.css';
import { InstanceId } from 'vrcapi/build/Data';
import { Api } from 'vrcapi/build/Api';
import { WorldName } from './WorldName';
import { Link } from 'react-router-dom';

export function InstanceInfo({instanceId, api}: { instanceId: InstanceId | null, api: Api }) {
    if (instanceId) {
        return (
            <span>
                <Link to={`/instance/${instanceId.world}/${instanceId.instance}`}>
                <WorldName api={api} worldId={instanceId.world}/>
                 -
                    {instanceId.instance.split('~')[0]}
                    {` (${getInstanceType(instanceId.instance)})`}
                </Link>
            </span>
        );
    } else {
        return <span>Private world</span>;
    }
}

function getInstanceType(instanceId: string) {
    if (instanceId.indexOf('hidden') !== -1) {
        return 'Friends+';
    } else if (instanceId.indexOf('friends') !== -1) {
        return 'Friends';
    } else {
        return 'Public';
    }
}
