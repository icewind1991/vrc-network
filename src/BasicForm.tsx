import * as React from 'react';

export interface FormResult {
    [key: string]: string;
}

export type OnSubmitCallBack = (data: FormResult) => void;

function saveInput<T>(onSubmit: OnSubmitCallBack, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const data: FormResult = [].reduce.call(
        form.elements,
        (newData: FormResult, element: HTMLInputElement) => {
            if (element.name) {
                newData[element.name] = element.value;
            }
            return newData;
        },
        {}
    );

    onSubmit(data);
}

export interface BasicFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    onData: OnSubmitCallBack;
}

export function BasicForm({children, onData, ...rest}: BasicFormProps) {
    return (
        <form
            onSubmit={saveInput.bind(null, onData)}
            {...rest}
        >
            {children}
        </form>
    );
}
