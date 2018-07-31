import * as React from 'react';
import { LoadComponent } from './LoadComponent';
import { User } from 'vrcapi/build/Data';
import { Api } from 'vrcapi/build/Api';
import 'CurrentUser.css';
import { Link } from 'react-router-dom';

export interface CurrentUserDropDownProps {
    api: Api;
    user: User;
    logout: () => void;
}

export interface CurrentUserDropDownState {
    expanded: boolean;
}

class CurrentUserDropDown extends React.Component<CurrentUserDropDownProps, CurrentUserDropDownState> {
    state: CurrentUserDropDownState = {
        expanded: false
    };

    render() {
        return (
            <div className="dropdown-container">
                <span onClick={() => this.setState({expanded: !this.state.expanded})}>
                    <span>{this.props.user.userName}</span>
                    <span>{this.state.expanded ? '▲' : '▼'}</span>
                </span>
                {this.state.expanded ?
                    <span className="dropdown">
                        <Link to="/blocked">Block list</Link>
                        <Link to="/blocked_by">Block by list</Link>
                        <Link to="/favorites">Favorite list</Link>
                        <a
                            href="#"
                            onClick={e => {
                                e.preventDefault();
                                this.props.logout();
                            }}
                        >
                            Logout
                        </a>
                    </span> : []
                }
            </div>
        );
    }
}

export interface CurrentUserProps {
    api: Api;
    logout: () => void;
}

export function CurrentUser({api, logout}: CurrentUserProps) {
    return (
        <LoadComponent
            load={api.getCurrentUser.bind(api)}
            renderer={(user: User) => {
                return <div className="currentUser">
                    <CurrentUserDropDown logout={logout} user={user} api={api}/>
                </div>;
            }}
        />
    );
}
