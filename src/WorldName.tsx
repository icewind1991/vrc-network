import * as React from 'react';
import { Api } from 'vrcapi/build/Api';
import { WorldInfo } from 'vrcapi/build/Data';
import { LoadComponent } from './LoadComponent';

export function WorldName({worldId, api}: { worldId: string, api: Api }) {
    return (
        <LoadComponent
            load={api.getWorldInfoById.bind(api, worldId)}
            renderer={(worldInfo: WorldInfo) => worldInfo.name}
            placeholder="Loading world info..."
        />
    );
}
