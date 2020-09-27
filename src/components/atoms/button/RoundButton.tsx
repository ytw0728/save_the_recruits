import { NextComponentType, NextPageContext } from "next";
import styled from "styled-components";

const Button = styled.button`
    box-sizing: border-box;
    padding: 0 2rem;
    min-width: 3rem;
    max-width: 100%;
    height: 3rem;
    vertical-align: middle;
    text-align: center;

    font-size: 1.2rem;
    font-weight: 600;
    border: none;
    border-radius: 1.5rem;
    background-color: white;
    margin: 2vh 2vw 0 2vw;
`
export type ButtonProps = {
    onClick: () => void;
}
const RoundButton: NextComponentType<NextPageContext, any, ButtonProps> = (props) => {
    return (
        <Button onClick={props.onClick}>
            {props.children}
        </Button>
    )
}
export default RoundButton