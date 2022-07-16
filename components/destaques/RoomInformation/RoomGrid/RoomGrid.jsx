import React from "react";

export default function RoomGrid() {
  return (
    <section className="my-8 w-full">
      <div className="grid grid-cols-12 gap-2">
        <div className="room1 photo1 col-span-6 row-span-2 bg-black">Item 1</div>
        <div className="photo2 col-span-2 bg-orange-500">Item 2</div>
        <div className="photo3 col-span-4 bg-blue-500">Item 3</div>
        <div className="photo4 col-span-4 bg-red-400">Item 4</div>
        <div className="photo5 col-span-2 bg-purple-500">Item 5</div>
      </div>
    </section>
  );
}
