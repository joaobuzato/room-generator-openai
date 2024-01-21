import dotenv from "dotenv";
dotenv.config();

export type Room = {
  title: string;
  text: string;
  path: string;
  doors: Door[];
};

type Door = {
  path: string;
  text: string;
  color: string;
  room_id?: number;
};

const url = "http://localhost:8080";

export async function insertRoom(room: Room) {
  return fetch(`${url}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "",
    },
    body: JSON.stringify(room),
  })
    .then(async (response) => {
      if (response.status > 300) {
        console.log("Error on room", room);
        return;
      }
      return await response.json();
    })
    .catch((error) => {
      console.log("erro em insertRoom", error);
    });
}

export async function insertDoor(door: Door, roomId: number) {
  door.room_id = roomId;
  console.log("DOOR", door);
  fetch(`${url}/doors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "",
    },
    body: JSON.stringify(door),
  })
    .then(async (response) => {
      if (response.status > 300) {
        console.log("Error on door", door);
        return;
      }
      console.log("door salvo no banco ", door);
    })
    .catch((error) => {
      console.log("erro em inserDoor", error);
    });
}
