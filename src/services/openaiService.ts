import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
import { ChatCompletionMessageParam } from "openai/resources";

function getMessages(num_rooms: number): ChatCompletionMessageParam[] {
  const messages = [
    {
      role: "system",
      content: `You are a cosmic horror story writer that is writing a horror game consisting in some rooms with doors leading to other rooms. The game is simple, each room has a title, a description that is meant to be scary and surprising to the reader, and this room must lead to other two, and these two must lead to other two. The response must be a JSON in this format: 
        [{
          "title": "Quarto vazio com o sol errado",
          "text": "Você está em um quarto vazio. A luz do sol bate de norte a sul, apesar de você ter certeza que nunca saiu do planeta terra. À sua frente, estão duas portas: ",
          "path": "45fm",
          "doors": [
            {
              "path": "af3x",
              "text": "Porta de ferro fundido",
              "color": "#123400"
            },
            {
              "path": "df45",
              "text": "Porta de aço escovado",
              "color": "#103400"
            }
          ]
        }]
        `,
    },
    {
      role: "user",
      content:
        "Generate 1 rooms following that format and feeling to the doors. in brazillian portuguese.",
    },
    {
      role: "assistant",
      content: `[{
      "title": "Quarto com cheiro de roupa suja",
      "text": "Este quarto possui um cheiro muito característico de roupa suja. Um cheiro que remete à um passado que não existe mais, onde aquela senhora com rosto de polvo lavava suas roupas no rio de água escura e turva. À sua frente, há duas portas:  ",
      "path": "0k7h",
      "doors": [
        {
          "path": "3d0o",
          "text": "Porta de quarto de criança",
          "color": "#123400"
        },
        {
          "path": "k87m",
          "text": "Porta de repartição pública",
          "color": "#08765F"
        }
      ]
    }]`,
    },
    {
      role: "user",
      content: `Generate ${num_rooms} following that format and feeling to the doors. Answer In Brazillian Portuguese, please. `,
    },
  ] as ChatCompletionMessageParam[];

  return messages;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG,
});

export default async function generate(numberGenerated: number) {
  const completion = await openai.chat.completions.create({
    messages: getMessages(numberGenerated),
    model: "gpt-4",
  });

  return completion.choices[0].message.content ?? "{}";
}
