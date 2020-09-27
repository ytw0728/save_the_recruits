import { NextComponentType, NextPageContext } from "next";
import { Dispatch, SetStateAction } from "react";
import InputBox from "../atoms/box/InputBox";
import RoundButton from "../atoms/button/RoundButton";
import Step from "../atoms/step/Step";
import RoundInputWithLabel from "../molecules/input/RoundInputWithLabel";

export type NameScreenProps = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    onNext: () => void;
    onPrev: () => void;
}
const NameScreen: NextComponentType<NextPageContext, any, NameScreenProps> = ({name, setName, ...props}) => {
    const onNext = () => {
        if (Boolean(name)) {
            props.onNext();
        } else {
            alert('이름을 입력해주세요.')
        }
    }
    return (
        <>
            <Step now={1} total={3}/>
            <InputBox>
                <RoundInputWithLabel value={name} onChange={(d) => setName(d)} label="이름"/>
            </InputBox>
            <RoundButton onClick={() => props.onPrev()}>이전</RoundButton>
            <RoundButton onClick={onNext}>다음</RoundButton>
        </>
    );
}

export default NameScreen;