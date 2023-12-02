import generate from "./services/openaiService";

import { program } from "commander";

program
  .option("-n, --numTexts <number>", "Número de textos a serem gerados")
  .parse(process.argv);

generate();
