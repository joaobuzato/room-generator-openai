import generate from "./services/openaiService";
import { Room, insertDoor, insertRoom } from "./services/doorApiService";

import { program } from "commander";

program
  .option("-n, --numTexts <number>", "Número de textos a serem gerados")
  .parse(process.argv)
  .action(async (options: { numTexts: number }) => {
    const numTexts = options.numTexts ?? 3;
    generate(numTexts).then((response) => {
      const rooms = JSON.parse(response);

      rooms.forEach(async (room: Room) => {
        const response = await insertRoom(room);
        console.log(response);
      });
      // const rooms = JSON.parse(response);
      // rooms.forEach(async (room: Room) => {
      //   insertRoom(room).then((response) => {
      //     const id = response.lastId;
      //     console.log("room Id", id);
      //     room.doors.forEach(async (door) => {
      //       await insertDoor(door, id);
      //     });
      //   });
      // });
    });
  });

program.parse();
