import * as React from 'react';
import { Hook } from './Hook';

export interface ApiLoadComponentProps<T> {
    load: () => Promise<T>;
    renderer: (result: T, loading: boolean) => React.ReactNode;
    placeholder?: React.ReactNode;
    reloadHook?: Hook;
}

export interface ApiLoadComponentState<T> {
    result?: T;
    loading: boolean;
}

export class LoadComponent<T> extends React.Component<ApiLoadComponentProps<T>, ApiLoadComponentState<T>> {
    state: ApiLoadComponentState<T> = {
        loading: false
    };

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
        this.setState({loading: true});
        this.props.load().then(result => this.setState({result, loading: false}));
    }

    render() {
        if (this.state.result) {
            return this.props.renderer(this.state.result, this.state.loading);
        } else {
            return this.props.placeholder || [];
        }
    }
}
