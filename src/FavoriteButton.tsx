import * as React from 'react';
import { Api } from 'vrcapi/build/Api';
import { LoadComponent } from './LoadComponent';
import { WorldInfo } from 'vrcapi/build/Data';

export function FavoriteButton({api, worldId}: { api: Api, worldId: string }) {
    return (
        <LoadComponent
            load={api.getWorldInfoById.bind(api, worldId)}
            placeholder={<button disabled={true}>
                Favorite world
            </button>}
            renderer={(world: WorldInfo) => <button
                disabled={world.releaseStatus === 'private'}
                onClick={api.addFavorite.bind(api, 'world', worldId)}
            >
                Favorite world
            </button>}
        />

    );
}
