import * as React from 'react';

export interface FormResult {
    [key: string]: string;
}

export type OnSubmitCallBack = (data: FormResult) => void;

function saveInput<T>(onSubmit: OnSubmitCallBack, clearOnSubmit: boolean, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const data: FormResult = [].reduce.call(
        form.elements,
        (newData: FormResult, element: HTMLInputElement) => {
            if (element.name) {
                newData[element.name] = element.value;
                if (clearOnSubmit) {
                    element.value = '';
                }
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
    clearOnSubmit?: boolean;
}

export function BasicForm({children, onData, clearOnSubmit = true, ...rest}: BasicFormProps) {
    return (
        <form
            onSubmit={saveInput.bind(null, onData, clearOnSubmit)}
            {...rest}
        >
            {children}
        </form>
    );
}
