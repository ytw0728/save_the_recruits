import { NextComponentType } from "next";
import { useEffect, useRef, useState } from "react";
import ContentsScreen from "src/components/organisms/ContentsScreen";
import InfoScreen from "src/components/organisms/InfoScreen";
import NameScreen from "src/components/organisms/NameScreen";
import { useLocalStorage } from "src/utils/useLocalStorage";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    min-height: 600px;
`;
const loadingKeyframe = keyframes`
    10% { transform: rotate3d(0, 0, 1, 15deg)   translateX(4rem);  scale: 1;    opacity: 0; }
    20% { transform: rotate3d(0, 0, 1, 0 deg)   translateX(0);     scale: 2;    opacity: 1; }
    30% { transform: rotate3d(0, 0, 1, -15deg)  translateX(-4rem); scale: 1;    opacity: 0; }
`
const twinkle = keyframes`
    0%      { text-shadow: 0 0 .5rem rgba(255, 255, 255, 1); }
    10%     { text-shadow: 0 0 .5rem rgba(255, 255, 255, .7); }
    15%     { text-shadow: 0 0 .5rem rgba(255, 255, 255, .8); }
    40%     { text-shadow: 0 0 .5rem rgba(255, 255, 255, 1); }
    60%     { text-shadow: 0 0 .5rem rgba(255, 255, 255, .5); }
    80%     { text-shadow: 0 0 .5rem rgba(255, 255, 255, .9); }
    100%    { text-shadow: 0 0 .5rem rgba(255, 255, 255, .9); }
`
const Loading = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

    p {
        font-size: 1rem;
        font-weight: 600;
        color: white;
        animation: 5s ${twinkle} infinite;
    }
    span {
        margin-bottom: 10rem;
        position: absolute;
        font-size: 2rem;
        opacity: 0;
        :nth-child(1) { animation: 6s 0s ${loadingKeyframe} cubic-bezier(0.450, 0.500, 0.550, 0.500) infinite; }
        :nth-child(2) { animation: 6s .5s ${loadingKeyframe} cubic-bezier(0.450, 0.500, 0.550, 0.500) infinite; }
        :nth-child(3) { animation: 6s 1.0s ${loadingKeyframe} cubic-bezier(0.450, 0.500, 0.550, 0.500) infinite; }
        :nth-child(4) { animation: 6s 1.5s ${loadingKeyframe} cubic-bezier(0.450, 0.500, 0.550, 0.500) infinite; }
        :nth-child(5) { animation: 6s 2s ${loadingKeyframe} cubic-bezier(0.450, 0.500, 0.550, 0.500) infinite; }
        :nth-child(6) { animation: 6s 2.5s ${loadingKeyframe} cubic-bezier(0.450, 0.500, 0.550, 0.500) infinite; }
        :nth-child(7) { animation: 6s 3s ${loadingKeyframe} cubic-bezier(0.450, 0.500, 0.550, 0.500) infinite; }
    }


    background: rgba(0,0,0, .8);
`

const Viewport = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    max-width: 568px;
    width: 100%;
    padding: 2rem 1.5rem;
    height: 90%;
`;
const Title = styled.div`
    width: 100%;
    color: white;
    font-weight: 600;
    text-align: center;
`
const Description = styled.span`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 1vh;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: .8rem;
    span {
        :first-child {
            font-size: 1.2rem;
            margin-bottom: .5rem;
        }
        font-weight: 600;
        display: block;
        width: 100%;
        text-align: center;
    }
`

const MainLayout: NextComponentType = () => {
    const [step, setStep] = useState<number>(0);

    const [name, setName] = useLocalStorage('', 'name');
    const [title, setTitle] = useLocalStorage('', 'title');
    const [content, setContent] = useLocalStorage('', 'content');

    const [loading, setLoading] = useState<boolean>(false);

    const requestDate = useRef<Date>(new Date);

    useEffect(() => {
        if (Boolean(name) || Boolean(title) || Boolean(content)) {
            if (confirm('작성 중인 내용을 이어 작성하시겠습니까?')) {
                if (Boolean(content)) {
                    setStep(3);
                    return undefined;
                }
                if (Boolean(title)) {
                    setStep(2);
                    return undefined;
                }
                if (Boolean(name)) {
                    setStep(1);
                    return undefined;
                }
            } else {
                setName('');
                setTitle('');
                setContent('');
                return undefined;
            }
        }
    }, []);

    const onSubmit = () => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            const minimumDate = new Date(requestDate.current);
            minimumDate.setSeconds(minimumDate.getSeconds() + 3);

            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    const content = JSON.parse(xhr.responseText) as {done: boolean};
                    if (content.done) {
                        setTimeout(() => {
                            alert('편지가 전송되었습니다.');
                            setLoading(false);
                            setName('');
                            setTitle('');
                            setContent('');
                            setStep(0);
                            window.location.reload()
                        }, new Date() < minimumDate ? 3000 : 0);
                    }
                } else if (xhr.status === 400) {
                    setTimeout(() => {
                        alert('올바른 요청이 아닙니다. 다시 시도해주세요.');
                        setLoading(false);
                    }, new Date() < minimumDate ? 3000 : 0);
                } else {
                    setTimeout(() => {
                        alert('예상치 못한 오류입니다. 더캠프 사이트를 이용 부탁드립니다.');
                        setLoading(false);
                    }, new Date() < minimumDate ? 3000 : 0);
                }
            }
        }
        setLoading(true);
        xhr.open('POST', '/api/send');
        xhr.setRequestHeader('Content-Type', 'application/json');
        requestDate.current = new Date();
        xhr.send(JSON.stringify({
            name: name,
            title: title,
            content: content,
        }));
    }
    return (
        <Wrapper>
            <Viewport>
                <Title>훈련병에게 편지를...!</Title>
                <Description>
                    <span>{process.env.NEXT_PUBLIC_NAME ?? '이름'}</span>
                    { step === 0 && <span>{process.env.NEXT_PUBLIC_BIRTHDAY ?? 'MM/DD/YYYY 출생'} &nbsp;&nbsp; {process.env.NEXT_PUBLIC_ENTERDAY ?? 'MM/DD/YYYY 입소'}</span>}
                </Description>
                { step === 0 && <InfoScreen onNext={() => setStep(1)}/> }
                { step === 1 && <NameScreen name={name} setName={setName} onPrev={() => setStep(0)} onNext={() => setStep(2)}/> }
                { 
                    step >= 2 && 
                    <ContentsScreen step={step}
                        title={title}
                        setTitle={setTitle}
                        content={content}
                        setContent={setContent}
                        onPrev={() => setStep(1)}
                        onDone={(b) => setStep(b ? 3 : 2)}
                        onSubmit={onSubmit}
                    />
                }
            </Viewport>
            { loading && 
                <Loading>
                    <span>🌘</span> <span>🌗</span> <span>🌖</span>
                    <span>🌕</span> <span>🌔</span> <span>🌓</span>
                    <span>🌒</span>
                    <p>덕분에 훈련병의 밤은 흘러갑니다...</p>
                </Loading>
            }
        </Wrapper>
    )
}

export default MainLayout;