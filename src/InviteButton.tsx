import * as React from 'react';
import './UserView.css';
import { Api } from 'vrcapi/build/Api';
import { InstanceId, User, WorldInfo } from 'vrcapi/build/Data';
import { LoadComponent } from './LoadComponent';
import { FormEvent } from 'react';

import './InviteButton.css';

const inviteBotUserId = 'usr_bb198672-68fd-4533-bf2e-d5d37817a995';

function inviteUser(api: Api, user: User, instance: InstanceId, text: string, self: boolean = false) {
    if (self) {
        return api.sendNotification(inviteBotUserId, 'requestinvite', text, instance);
    } else {
        return api.inviteUser(user.id, instance, text);
    }
}

interface InviteButtonInnerProps {
    api: Api;
    instance: InstanceId;
    user: User;
    friends: User[];
    world: WorldInfo;
}

interface InviteButtonInnerState {
    expanded: boolean;
    filter: string;
}

class InviteButtonInner extends React.Component<InviteButtonInnerProps, {}> {
    state: InviteButtonInnerState = {
        expanded: false,
        filter: ''
    };

    getDropDown() {
        const filteredFriends = this.props.friends.filter(friend => (
            this.state.filter === '' ||
            (friend.userName.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1) ||
            (friend.displayName.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
        ));

        if (this.state.expanded) {
            return (
                <div className="dropdown">
                    <input
                        autoFocus={true}
                        type="text"
                        placeholder="Filter"
                        onInput={(e: FormEvent<HTMLInputElement>) => this.setState({filter: e.currentTarget.value})}
                    />
                    <div>
                        {filteredFriends
                            .sort((a, b) => a.displayName.localeCompare(b.displayName))
                            .map((friend, key) => (
                            <button
                                key={key}
                                onClick={() => inviteUser(
                                    this.props.api,
                                    friend,
                                    this.props.instance,
                                    `Join ${this.props.world.name}`
                                )}
                            >
                                {friend.displayName}
                            </button>
                        ))}
                    </div>
                </div>
            );
        } else {
            return [];
        }
    }

    render() {

        return (
            <span className="inviteButton">
                <span className="buttons">
                    <button
                        onClick={() => inviteUser(
                            this.props.api,
                            this.props.user,
                            this.props.instance,
                            `Join ${this.props.world.name}`,
                            true
                        )}
                    >
                        Invite Self
                    </button>
                    <button onClick={() => this.setState({expanded: !this.state.expanded})} title="Invite friends">
                        {this.state.expanded ? '▲' : '▼'}
                    </button>
                </span>
                {this.getDropDown()}
            </span>
        );
    }
}

export interface InviteButtonProps {
    api: Api;
    instance: InstanceId;
}

export function InviteButton({instance, api}: InviteButtonProps) {
    return (
        <span className="inviteButtonHolder">
        <LoadComponent
            load={() => {
                return Promise.all([
                    api.getCurrentUser(),
                    api.getFriends(),
                    api.getWorldInfoById(instance.world)
                ]);
            }}
            renderer={([currentUser, friends, world]: [User, User[], WorldInfo]) => (
                <InviteButtonInner
                    instance={instance}
                    api={api}
                    user={currentUser}
                    friends={friends}
                    world={world}
                />
            )}
            placeholder={<span className="inviteButton">
                <span className="buttons">
                    <button>
                        Loading...
                    </button>
                    <button>▼</button>
                </span>
            </span>}
        />
        </span>
    );
}
