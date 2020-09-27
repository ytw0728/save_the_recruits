import { NextComponentType } from "next";
import styled from "styled-components";

const Box = styled.div`
    width: 100%;
    height: 20vh;
`
const TextfieldBox: NextComponentType = (props) => {
    return (
        <Box>
            {props.children}
        </Box>
    )
}

export default TextfieldBox;