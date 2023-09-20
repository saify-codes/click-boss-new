import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory"
import { ConversationChain } from "langchain/chains"
import { NextResponse } from "next/server";
import axios from "axios";


const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.5 });
const memory = new BufferMemory()
const chain = new ConversationChain({ llm, memory })



export async function GET() {
    const response = await axios.get('https://connectors.windsor.ai/all?api_key=b74de8fd07e5f578dd467d232457a57fd187&date_from=2023-09-1&date_to=2023-09-14&fields=account_name,campaign,clicks,date,spend')
    const windsorData = response.data
    let data = ""
    for (const i of windsorData.data) {
        if (i.account_name.includes('ClickBoss'))
            data += `account_name: '${i.account_name}', campaign: '${i.campaign}', clicks: '${i.clicks}', date: '${i.date}', spend: '${i.spend}'\n`;
    }
    await memory.clear()
    await memory.saveContext({ input: data }, { output: "..." });
    return NextResponse.json({ msg: 'data fetching successful' })
}

export async function POST(req) {

    // console.log(await memory.loadMemoryVariables({}));
    const { prompt } = await req.json()
    const { response } = await chain.call({ input: prompt });
    return NextResponse.json({ user: 'bot', msg: response })


}
