import { NextApiRequest, NextApiResponse } from "next";
import * as TheCamp from 'the-camp-lib'

process.on('uncaughtException', function(err) {
    console.log(err)
})

const id = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

const NAME = process.env.SOLDIER_NAME || '';
const BIRTHDAY = process.env.SOLDIER_BIRTHDAY || '';
const ENTERDATE = process.env.SOLDIER_ENTER_DATE || '';
const CLASSNAME = process.env.SOLDIER_CLASS_NAME || '';
const GROUPNAME = process.env.SOLDIER_GROUP_NAME || '';
const UNITNAME = process.env.SOLDIER_UNIT_NAME || '';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    let {name, title, content} = req.body as { name: string; title: string; content: string }

    if (
        typeof name !== 'string' || name.length < 3 ||
        typeof title !== 'string' || title.length < 10 ||
        typeof content !== 'string' || content.length < 10
    ) {
        res.status(400)
        res.end()
        return
    }

    const soldier = new TheCamp.Soldier(
        NAME,
        BIRTHDAY,
        ENTERDATE,
        CLASSNAME as TheCamp.SoldierClassName,
        GROUPNAME as TheCamp.SoldierGroupName,
        UNITNAME as TheCamp.SoldierUnitName,
        TheCamp.SoldierRelationship.SIBLING,
    )

    let cookies: TheCamp.Cookie
    try {
        cookies = await TheCamp.login(id, password)
    } catch (e) {
        console.log(e)
        res.setHeader('Error-Point', 'login error')
        res.status(500).send(JSON.stringify(e))
        res.end()
        return
    }

    const trainee = soldier.clone()
    trainee.setTraineeMgrSeq(process.env.TRAINEE_MGR_SEQ!)

    const messageList = []
    content.replace(/\r\n/g, '\n');
    content.replace(/\r/g, '\n');
    content.replace(/\n/g, '<br/>');

    title = title.length > 15 ? `${title.slice(0,15)}...` : title

    const header = (idx: number): string => `[${`00${idx}`.slice(-2)}] ${title} (${name}) | `
    const headerLen = header(0).length
    const contentWindow = 1500 - headerLen
    for (let index = 1; content.length >= contentWindow * (index - 1); index++){
        messageList.push(
            new TheCamp.Message(
                title, 
                header(index).concat(
                    content.slice(contentWindow * (index - 1), contentWindow * index - 1)
                ),
                trainee
            )
        )
    }

    try {
        for (let message of messageList) {
            await TheCamp.sendMessage(cookies, trainee, message)
        }
    } catch (e) {
        console.error(e)
        res.setHeader('Error-Point', 'send message')
        res.status(500).send(JSON.stringify(e))
        res.end()
        return
    }

    res.status(200).json({done: true})
}
