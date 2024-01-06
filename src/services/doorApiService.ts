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
};

const url = "http://localhost:8080";

export async function insertRoom(room: Room) {
  fetch(`${url}/room`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "",
    },
    body: JSON.stringify(room),
  })
    .then((response) => {
      if (response.status > 300) {
        console.log("Error on room", room);
        return;
      }
      console.log("room salvo no banco ", room);
    })
    .catch((error) => {
      console.log(error);
    });
}
