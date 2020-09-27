import { NextComponentType, NextPageContext } from "next";
import styled from "styled-components";


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 1.2rem;
    color: white;
    letter-spacing: 10px;
    margin-bottom: 5vh;
`
export type StepProps = {
    total: number;
    now: number;
}
const Step: NextComponentType<NextPageContext, any, StepProps> = (props) => {
    const now = Array.from({length: props.now}).map(() => String.fromCodePoint(0x1F929)).join('');
    const rest = Array.from({length: props.total - props.now}).map(() => String.fromCodePoint(0x1F642)).join('');
    return (
        <Wrapper>
            {`${now}${rest}`}
        </Wrapper>
    )
}

export default Step;