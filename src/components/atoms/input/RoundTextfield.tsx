import { NextComponentType, NextPageContext } from "next";
import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
    position: relative;
    box-sizing: border-box;
    padding: 1rem 1.5rem;
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;

    display: inline-block;
    outline: none;
    focus {
        outline: none;
    }
    font-size: 1rem;
    line-height: 1.2rem;
    color: black;
    font-weight: 400;
    background: white;
`

const debouncing = (d: string, time: number, onChange?: ((d: string) => void)) => {
    const handler = setTimeout(() => {
        onChange?.(d);
    }, time);
    return {clear: () => clearTimeout(handler)};
}

export type RoundTextfieldProps = {
    id?: string;
    value: string;
    onChange?: (d: string) => void;
}
const RoundTextfield: NextComponentType<NextPageContext, any, RoundTextfieldProps> = (props) => {
    const clearRef = useRef({clear: () => {}});
    const [v, setV] = useState<string>(props.value);
    
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        clearRef.current?.clear();
        setV(e.target.value);
        clearRef.current = debouncing(e.target.value, 200, props.onChange);
    }
    return (
        <TextArea id={props.id} onChange={onChange} value={v}/>
    )
}

export default RoundTextfield;