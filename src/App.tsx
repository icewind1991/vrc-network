import * as React from 'react';
import './App.css';
import { Api, Credentials } from 'vrcapi/build/Api';
import { InstanceId } from 'vrcapi/build/Data';
import { LoginPage } from './LoginPage';
import { FriendsPage } from './FriendsPage';
import { Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { InstancePage } from './InstancePage';
import { CurrentUser } from './CurrentUser';
import { BlockListPage } from './BlockListPage';
import { UserPage } from './UserPage';

export interface AppState {
    api?: Api;
}

const crossHandler = (url: string) => url.replace('vrchat.com', 'vrc.icewind.me');

const inviteBotUserId = 'usr_bb198672-68fd-4533-bf2e-d5d37817a995';

class App extends React.Component<{}, AppState> {
    state: AppState = {};

    componentDidMount() {
        const credentials = sessionStorage.getItem('credentials');
        if (credentials) {
            this.onCredentials(JSON.parse(credentials));
        }
    }

    onCredentials(credentials: Credentials) {
        if (!this.state.api) {
            const api = new Api(credentials, crossHandler);
            this.setState({api});
            api.getFriendStatus(inviteBotUserId).then(({isFriend, outgoingRequest}) => {
                if (!(isFriend || outgoingRequest)) {
                    api.sendFriendRequest(inviteBotUserId);
                }
            });
        }
    }

    logout = () => {
        sessionStorage.removeItem('credentials');
        this.setState({api: undefined});
    }

    render() {
        if (!this.state.api) {
            return (
                <LoginPage
                    onCredentials={credentials => {
                        this.onCredentials(credentials);
                        sessionStorage.setItem('credentials', JSON.stringify(credentials));
                    }}
                />
            );
        }

        const api = this.state.api;

        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <header className="App-header">
                            <h1 className="App-title"><Link to="/">VRChat Network</Link></h1>
                            <CurrentUser api={this.state.api} logout={this.logout}/>
                        </header>
                        <div className="content">
                            <Route
                                exact={true}
                                path="/"
                                component={() => <FriendsPage api={api}/>}
                            />
                            <Route
                                path="/instance/:world/:instance"
                                component={({match}: { match: { params: InstanceId } }) =>
                                    <InstancePage api={api} instanceId={match.params}/>}
                            />
                            <Route
                                path="/blocked"
                                component={() => <BlockListPage api={api}/>}
                            />
                            <Route
                                path="/users/:userId"
                                component={({match}: { match: { params: { userId: string } } }) =>
                                    <UserPage api={api} userId={match.params.userId}/>}
                            />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
