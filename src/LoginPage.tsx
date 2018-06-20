import * as React from 'react';
import './LoginPage.css';
import { Credentials } from 'vrcapi/build/Api';
import { FormEvent } from 'react';

export interface LoginPageProps {
    onCredentials: (credentials: Credentials) => void;
    error?: string;
}

function onSubmit(onCredentials: (credentials: Credentials) => void, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;
    if (username && password) {
        onCredentials({username, password});
    }
}

export function LoginPage({onCredentials, error}: LoginPageProps) {
    return (
        <form id="loginForm" onSubmit={onSubmit.bind(null, onCredentials)} target="#">
            {error ? <p className="error">
                {error}
            </p> : []}
            <p>
                <input name="username" type="text" placeholder="Username"/>
            </p>
            <p>
                <input name="password" type="password" placeholder="Password"/>
            </p>
            <p>
                <input type="submit" value="login"/>
            </p>
        </form>
    );
}
