import * as React from 'react';
import './App.css';
import { Api, Credentials } from 'vrcapi/build/Api';
import { InstanceId, User } from 'vrcapi/build/Data';
import { LoginPage } from './LoginPage';
import { FriendsPage } from './FriendsPage';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { InstancePage } from './InstancePage';
import { LoadComponent } from './LoadComponent';

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
            console.log(JSON.parse(credentials));
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
                <header className="App-header">
                    <h1 className="App-title">VRC Explorer</h1>
                    <LoadComponent
                        load={this.state.api.getCurrentUser.bind(this.state.api)}
                        renderer={(user: User) => <h3>{user.displayName}</h3>}
                    />
                </header>
                <BrowserRouter>
                    <div>
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
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
