import { NextComponentType, NextPageContext } from "next";
import { useEffect } from "react";
import { useLocalStorage } from "src/utils/useLocalStorage";
import InputBox from "../atoms/box/InputBox";
import TextfieldBox from "../atoms/box/TextfieldBox";
import RoundButton from "../atoms/button/RoundButton";
import Step from "../atoms/step/Step";
import RoundInputWithLabel from "../molecules/input/RoundInputWithLabel";
import RoundTextfieldWithLabel from "../molecules/input/RoundTextfieldWithLabel";


export type ContentsScreenProps = {
    step: number;
    onDone: (done: boolean) => void;
    onPrev: () => void;
    onSubmit: () => void;
}
const ContentsScreen: NextComponentType<NextPageContext, any, ContentsScreenProps> = (props) => {
    const [title, setTitle] = useLocalStorage('', 'title');
    const [content, setContent] = useLocalStorage('', 'content');
 
    useEffect(() => {
        if (title.length >= 10 && content.length >= 10) {
            props.onDone(true);
        } else {
            props.onDone(false);
        }
    }, [title, content])

    const onSubmit = () => {
        if (title.length < 10) {
            alert('제목을 10자 이상 입력해주세요.');
            return false;
        }

        if (content.length < 10) {
            alert('내용을 10자 이상 입력해주세요.');
            return false;
        }
        props.onSubmit();
    }
    return (
        <>
            <Step now={props.step} total={3}/>
            <InputBox>
                <RoundInputWithLabel value={title} onChange={(d) => setTitle(d)} label="제목 (10자 이상)"/>
            </InputBox>
            <TextfieldBox>
                <RoundTextfieldWithLabel value={content} onChange={(d) => setContent(d)} label="내용 (10자 이상)"/>
            </TextfieldBox>
            <RoundButton onClick={() => props.onPrev()}>이전</RoundButton>
            <RoundButton onClick={onSubmit}>보내기</RoundButton>
        </>
    );
}

export default ContentsScreen;