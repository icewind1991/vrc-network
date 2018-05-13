export type Listener = () => void;

export interface Hook {
    on: (listener: Listener) => void;
    trigger: () => void;
}

export function createHook(): Hook {
    const listeners: Listener[] = [];
    return {
        on: listener => listeners.push(listener),
        trigger: () => listeners.forEach(listener => listener())
    };
}
