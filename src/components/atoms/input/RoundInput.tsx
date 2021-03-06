import { NextComponentType, NextPageContext } from "next";
import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";

const Input = styled.input`
    position: relative;
    box-sizing: border-box;
    padding: 0 1.5rem;
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    border: solid 3px white;

    text-align: center;
    display: inline-block;
    outline: none;
    focus {
        outline: none;
    }
    font-size: 1.2rem;
    line-height: 3rem;
    color: white;
    font-weight: 400;
    background: transparent;
`

const debouncing = (d: string, time: number, onChange?: ((d: string) => void)) => {
    const handler = setTimeout(() => {
        onChange?.(d);
    }, time);
    return {clear: () => clearTimeout(handler)};
}

export type RoundInputProps = {
    id?: string;
    value: string;
    onChange?: (d: string) => void;
}
const RoundInput: NextComponentType<NextPageContext, any, RoundInputProps> = (props) => {
    const clearRef = useRef({clear: () => {}});
    const [v, setV] = useState<string>(props.value);
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearRef.current?.clear();
        setV(e.target.value);
        clearRef.current = debouncing(e.target.value, 200, props.onChange);
    }
    return (
        <Input id={props.id} onChange={onChange} value={v}/>
    )
}

export default RoundInput;