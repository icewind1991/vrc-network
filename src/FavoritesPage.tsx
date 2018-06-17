import * as React from 'react';
import { Api } from 'vrcapi/build/Api';
import { FavoriteItemResponse } from 'vrcapi/build/ApiReponses';
import { LoadComponent } from './LoadComponent';
import { WorldName } from './WorldName';
import 'FavoritesPage.css';

export function FavoritesPage({api}: { api: Api }) {
    return (
        <LoadComponent
            load={api.listFavorites.bind(api)}
            renderer={(favorites: FavoriteItemResponse[]) => <ul className="favorites">
                {favorites.filter(favorite => favorite.type === 'world')
                    .map((favorite, i) => <li key={i}><WorldName worldId={favorite.favoriteId} api={api}/></li>)
                }
            </ul>}
        />
    );
}
