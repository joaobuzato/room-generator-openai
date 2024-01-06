import generate from "./services/openaiService";
import { insertRoom } from "./services/doorApiService";

import { program } from "commander";

program
  .option("-n, --numTexts <number>", "Número de textos a serem gerados")
  .parse(process.argv)
  .action(async (options: { numTexts: number }) => {
    const numTexts = options.numTexts ?? 3;
    const rooms = JSON.parse(await generate(numTexts));
    console.log(rooms);

    console.log(`Gerados ${numTexts} rooms com sucesso 🎉`);
  });

program.parse();
