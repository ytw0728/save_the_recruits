import { NextComponentType } from "next";
import styled from "styled-components";

const Box = styled.div`
    width: 100%;
    height: 3rem;
`
const InputBox: NextComponentType = (props) => {
    return (
        <Box>
            {props.children}
        </Box>
    )
}

export default InputBox;