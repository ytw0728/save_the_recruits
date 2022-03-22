import { NextComponentType, NextPageContext } from "next";
import styled from "styled-components";

const Label = styled.label`
    color: white;
    font-size: 1.5rem;
    line-height: 3rem;

    transition: all .5s ease;

    user-select: none;
`;

const InputLabel: NextComponentType<NextPageContext, any, {htmlFor?: string}> = (props) => {
    return (
        <Label htmlFor={props.htmlFor}>
            {props.children}
        </Label>
    )
}

export default InputLabel;