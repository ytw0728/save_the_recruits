import { NextComponentType, NextPageContext } from "next";
import InfoBox from "../atoms/box/InfoBox";
import RoundButton from "../atoms/button/RoundButton";
import Step from "../atoms/step/Step";

export type InfoScreenProps = {
    onNext: () => void;
}
const InfoScreen: NextComponentType<NextPageContext, any, InfoScreenProps> = (props) => {
    return (
        <>
            <Step now={0} total={3}/>
            <InfoBox
                infos={[
                    '입소일 기준 일주일부터 가능합니다.',
                    '이름, 제목, 내용을 작성해야 합니다.',
                    '[이름]은 3자 이상!',
                    '[제목]은 10자 이상!',
                    '[내용]도 10자 이상!',
                ]}
            />
            <RoundButton onClick={() => props.onNext()}>다음</RoundButton>
        </>
    );
}

export default InfoScreen;