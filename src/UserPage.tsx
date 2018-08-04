import { Api } from 'vrcapi/build/Api';
import { LoadComponent } from './LoadComponent';
import * as React from 'react';
import { User } from 'vrcapi/build/Data';
import { UserView } from './UserView';
import { BasicForm } from './BasicForm';

import 'UserPage.css';

export interface UserPageProps {
    userId: string;
    api: Api;
}

export function UserPage({userId, api}: UserPageProps) {
    return (
        <LoadComponent
            load={getUserInfo.bind(null, api, userId)}
            renderer={(user: User) => <div>
                <UserView user={user} api={api}/>
                <BasicForm
                    className="message"
                    onData={({text}: { text: string }) => {
                        if (text) {
                            api.sendNotification(userId, 'message', text, '');
                        }
                    }}
                >
                    <p>
                        <textarea name="text" placeholder="Send message"/>
                    </p>
                    <p>
                        <input type="submit" value="Send"/>
                    </p>
                </BasicForm>
            </div>}
        />
    );
}

function getUserInfo(api: Api, id: string): Promise<User> {
    const userPromise = api.getUserById(id);
    return api.getFriends().then(users => {
        for (const user of users) {
            if (user.id === id) {
                return user;
            }
        }
        return userPromise;
    });
}
