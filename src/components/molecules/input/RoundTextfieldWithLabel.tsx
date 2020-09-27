import { NextComponentType, NextPageContext } from "next";
import { useEffect, useRef, useState } from "react";
import RoundTextfield from "src/components/atoms/input/RoundTextfield";
import InputLabel from "src/components/atoms/label/InputLabel";
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    max-height: 10rem;
    min-height: 3rem;
    
    transition: all .5s ease;

    & > label {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 1rem;
        font-weight: 500;
        color: black;
    }

    & textarea:focus + label, & textarea:not(:empty) + label {
        display: none;
    }
`
const Length = styled.div`
    box-sizing: border-box;
    padding: .5rem .5rem 0 0;
    width: 100%;
    text-align: right;
    color: white;
    font-size: .8rem;
    font-weight: 100;
`
export type RoundTextfieldWithLabelProps = {
    value: string;
    onChange?: (d: string) => void;
    label: string;
}
const RoundTextfieldWithLabel: NextComponentType<NextPageContext, any, RoundTextfieldWithLabelProps> = (props) => {
    const id = useRef<string>(Math.random().toString(36).substring(7));
    const [length, setLength] = useState<number>(props.value.length);
    useEffect(() => {
        setLength(props.value.length);
    }, [props.value]);

    return (
        <>
            <Wrapper>
                <RoundTextfield id={id.current} value={props.value} onChange={(d) => props.onChange?.(d)}/>
                <InputLabel htmlFor={id.current}>{props.label}</InputLabel>
            </Wrapper>
            <Length>{length} 자</Length>
        </>
    );
}

export default RoundTextfieldWithLabel;