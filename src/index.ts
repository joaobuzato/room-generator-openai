import generate from "./services/openaiService";

import { program } from "commander";

program
  .option("-n, --numTexts <number>", "Número de textos a serem gerados")
  .parse(process.argv)
  .action(async (options: { numTexts: number }) => {
    await generate(options.numTexts);

    console.log(`Gerados ${options.numTexts} rooms com sucesso 🎉`);
  });

program.parse();
