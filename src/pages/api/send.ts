import { NextApiRequest, NextApiResponse } from "next";
import * as TheCamp from 'the-camp-lib';
import Info from 'info';

process.on('uncaughtException', function(err) {
    console.log(err);
});
const soldier = new TheCamp.Soldier(
    Info.soldier.name,
    Info.soldier.birthday,
    Info.soldier.enterDate,
    Info.soldier.className as TheCamp.SoldierClassName,
    Info.soldier.groupName as TheCamp.SoldierGroupName,
    Info.soldier.unitName as TheCamp.SoldierUnitName,
    TheCamp.SoldierRelationship.FRIEND,
)

const client = new TheCamp.Client();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let {name, title, content} = req.body as {name: string; title: string; content: string;};
    if (
        typeof name !== 'string' || name.length < 3 ||
        typeof title !== 'string' || title.length < 10 ||
        typeof content !== 'string' || content.length < 10
    ) {
        res.status(400);
        res.end();
        return;
    }
    try {
        await client.login(Info.email, Info.password);
        if ((await client.fetchSoldiers(soldier)).length < 1) {
            await client.addSoldier(soldier);
        }
        const [trainee] = await client.fetchSoldiers(soldier);

        content.replace(/\r\n/g, '\n');
        content.replace(/\r/g, '\n');
        content.replace(/\n/g, '<br/>');

        title = title.length > 15 ? `${title.slice(0,15)}...` : title;

        const messageList = [];
        const header = (idx: number): string => `[${`00${idx}`.slice(-2)}] ${title} (${name}) | `;
        const headerLen = header(0).length;
        const contentWindow = 1500 - headerLen;
        for (let index = 1; content.length >= contentWindow * (index - 1); index++){
            messageList.push(new TheCamp.Message(
                title,
                header(index).concat(
                    content.slice(contentWindow * (index - 1), contentWindow * index - 1)
                ),
                trainee,
            ));
        }
        for (let message of messageList) {
            await client.sendMessage(soldier, message);
        }
        res.status(200).json({done: true});
    } catch {
        res.status(500).send('');
        res.end();
    }
}