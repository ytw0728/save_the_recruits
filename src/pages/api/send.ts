import axios, { AxiosInstance } from "axios";
import { NextApiRequest, NextApiResponse } from "next";


process.on('uncaughtException', function(err) {
    console.log(err)
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let {name, title, content} = req.body as { name: string; title: string; content: string }
    const client = axios.create({
        baseURL: 'https://www.thecamp.or.kr',
    })
    if (
        typeof name !== 'string' || name.length < 3 ||
        typeof title !== 'string' || title.length < 10 ||
        typeof content !== 'string' || content.length < 10
    ) {
        res.status(400)
        res.end()
        return
    }

    let cookies: string = ''
    try {
        cookies = await fetchLoginSessionKey(client)
        cookies = await login(client, process.env.EMAIL ?? '', process.env.PASSWORD ?? '', cookies)
        cookies += ' ' + await fetchSessionKey(client)
    } catch (e) {
        res.status(500).send(JSON.stringify(e))
        res.end()
        return
    }

    content.replace(/\r\n/g, '\n');
    content.replace(/\r/g, '\n');
    content.replace(/\n/g, '<br/>');

    title = title.length > 15 ? `${title.slice(0,15)}...` : title

    const messageList = []
    const header = (idx: number): string => `[${`00${idx}`.slice(-2)}] ${title} (${name}) | `
    const headerLen = header(0).length
    const contentWindow = 1500 - headerLen
    for (let index = 1; content.length >= contentWindow * (index - 1); index++){
        messageList.push(
            header(index).concat(
                content.slice(contentWindow * (index - 1), contentWindow * index - 1)
            )
        )
    }

    try {
        for (let message of messageList) {
            await sendMessage(client, cookies, title, message)
        }
        res.status(200).json({done: true})
    } catch (e) {
        console.error(e)
        res.setHeader('Error-Point', 'send message')
        res.status(500).send(JSON.stringify(e))
        res.end()
    }
}

async function fetchLoginSessionKey(client: AxiosInstance) {
    const response = await client.get('https://www.thecamp.or.kr/login/main.do')
    return (response.headers['set-cookie']?.map((c) => c.split(';')[0]).join('; ') ?? '')
}

async function login(client: AxiosInstance, email: string, password: string, cookies: string) {
    const response = await client.post('https://www.thecamp.or.kr/login/loginA.do', new URLSearchParams({
        state: 'email-login',
        autoLoginYn: 'N',
        findPwType: 'pwFind',
        userId: email,
        userPwd: password,
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': cookies
        }
    })
    return (response.headers['set-cookie']?.map((c) => c.split(';')[0]).join('; ') ?? '') + ';'
}

async function fetchSessionKey(client: AxiosInstance) {
    const response = await client.get('https://www.thecamp.or.kr/consolLetter/viewConsolLetterInsert.do')
    return (response.headers['set-cookie']?.map((c) => c.split(';')[0]).join('; ') ?? '')
}

async function sendMessage(client: AxiosInstance, cookies: string, title: string, content: string) {
    return await client.post('https://www.thecamp.or.kr/consolLetter/insertConsolLetterA.do', new URLSearchParams({
        boardDiv: 'sympathyLetter',
        tempSaveYn: 'N',
        sympathyLetterEditorFileGroupSeq: '',
        fileGroupMgrSeq: '',
        fileMgrSeq: '',
        sympathyLetterMgrSeq: '',
        traineeMgrSeq: process.env.TRAINEE_MGR_SEQ ?? '',
        sympathyLetterContent: content,
        trainUnitCd: process.env.TRAIN_UNIT_CD ?? '',
        trainUnitEduSeq: process.env.TRAIN_UNIT_EDU_SEQ ?? '',
        sympathyLetterSubject: title,
    }), {
        headers: {
            ...headers,
            'Content-Type': 'application/x-www/form/urlendecoded',
            Cookie: cookies,
        },
    }).then((res) => {
        if (res.data.resultCd === '9999') {
            throw new Error('서비스 비정상처리')
        }
        return res
    })
}
const headers = {
    'origin': 'https://www.thecamp.or.kr',
    'referer': 'https://www.thecamp.or.kr/consolLetter/viewConsolLetterInsert.do',
    'sec-ch-ua': `" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"`,
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': "macOS",
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Mac,intosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.83 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
}