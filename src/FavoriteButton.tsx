import * as React from 'react';
import { Api } from 'vrcapi/build/Api';

export function FavoriteButton({api, worldId}: { api: Api, worldId: string }) {
    return <button onClick={api.addFavorite.bind(api, 'world', worldId)}>Favorite world</button>;
}
