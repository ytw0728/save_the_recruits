import { NextComponentType, NextPageContext } from "next";
import styled from "styled-components";


const Wrap = styled.ul`
    box-sizing: border-box;
    margin: 3vh 0 5vh 0;
    padding: 1rem .5rem;
    list-style: none;

    border-top: solid .1rem white;
    border-bottom: solid .1rem white;
    border-radius: .1rem;

`;
const Line = styled.li`
    width: 100%;
    color: white;
    text-align: center;
    padding: min(.5rem, 1vh) 0;
    font-size: 1rem;
`

export type InfoBoxProps = {
    infos: string[];
}
const InfoBox: NextComponentType<NextPageContext, any, InfoBoxProps> = (props) => {
    return (
        <Wrap>
            {props.infos.map((s, idx) => 
                <Line key={idx}>{s}</Line>
            )}
        </Wrap>
    )
}

export default InfoBox;