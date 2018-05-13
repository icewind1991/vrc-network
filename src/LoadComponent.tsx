import * as React from 'react';
import { Hook } from './Hook';

export interface ApiLoadComponentProps<T> {
    load: () => Promise<T>;
    renderer: (result: T) => React.ReactNode;
    placeholder?: React.ReactNode;
    reloadHook?: Hook;
}

export interface ApiLoadComponentState<T> {
    result?: T;
}

export class LoadComponent<T> extends React.Component<ApiLoadComponentProps<T>, ApiLoadComponentState<T>> {
    state: ApiLoadComponentState<T> = {};

    componentDidMount() {
        if (!this.state.result) {
            this.load();
        }
        if (this.props.reloadHook) {
            this.props.reloadHook.on(this.load);
        }
    }

    componentWillReceiveProps() {
        if (!this.state.result) {
            this.load();
        }
        if (this.props.reloadHook) {
            this.props.reloadHook.on(this.load);
        }
    }

    load = () => {
        this.props.load().then(result => this.setState({result}));
    }

    render() {
        if (this.state.result) {
            return this.props.renderer(this.state.result);
        } else {
            return this.props.placeholder || [];
        }
    }
}
