import { NextComponentType, NextPageContext } from "next";
import { useRef } from "react";
import InputLabel from "src/components/atoms/label/InputLabel";
import RoundInput from "src/components/atoms/input/RoundInput";
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100%;
    min-height: 3rem;
    
    transition: all .5s ease;

    & > label {
        position: absolute;
        display: inline-block;
        width: fit-content;
        height: 3rem;
        font-weight: 500;
        top: 0;
    }

    & input:focus + label, & input:not([value=""]) + label {
        top: -3rem;
        line-height: 2rem;
        font-size: 1.2rem;
        font-weight: 600;
    }
`
export type RoundInputWithLabelProps = {
    value: string;
    onChange?: (d: string) => void;
    label: string;
}
const RoundInputWithLabel: NextComponentType<NextPageContext, any, RoundInputWithLabelProps> = (props) => {
    const id = useRef<string>(Math.random().toString(36).substring(7));
    return (
        <Wrapper>
            <RoundInput id={id.current} value={props.value} onChange={(d) => props.onChange?.(d)}/>
            <InputLabel htmlFor={id.current}>{props.label}</InputLabel>
        </Wrapper>
    );
}

export default RoundInputWithLabel;