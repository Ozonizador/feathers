import React from "react";
import { Card } from "flowbite-react/lib/esm/components";
import { Rating } from "flowbite-react/lib/esm/components";
import { Avatar } from "flowbite-react";

export default function RoomCard() {
  return (
    <section className="mb-10">
      <div className="mt-20 flex gap-4">
        <div className="max-w-md">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex flex-col  align-middle">
                <div className="flex items-center align-middle">
                  <Avatar alt="Default avatar with alt text" img={"/icons/user/user.svg"} rounded={true} />

                  <div className="ml-4 flex flex-col">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Shawn Rodgers</h5>
                    <p>Java Tech</p>
                  </div>
                </div>
              </div>
              <div className="">
                <Rating>
                  <p className="ml-5 font-medium text-secondary-500">4.71</p>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
            </div>
            <div className="flow-root">
              <p className="italic text-gray-700 dark:text-gray-400">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              </p>
            </div>
          </Card>
        </div>

        <div className="max-w-md">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex flex-col  align-middle">
                <div className="flex items-center align-middle">
                  <Avatar alt="Default avatar with alt text" img={defaultUserProfile} rounded={true} />

                  <div className="ml-4 flex flex-col">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Shawn Rodgers</h5>
                    <p>Java Tech</p>
                  </div>
                </div>
              </div>
              <div className="">
                <Rating>
                  <p className="ml-5 font-medium text-secondary-500">4.71</p>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
            </div>
            <div className="flow-root">
              <p className="italic text-gray-700 dark:text-gray-400">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="my-7 flex gap-4">
        <div className="max-w-md">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex flex-col  align-middle">
                <div className="flex items-center align-middle">
                  <Avatar alt="Default avatar with alt text" img={defaultUserProfile} rounded={true} />

                  <div className="ml-4 flex flex-col">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Shawn Rodgers</h5>
                    <p>Java Tech</p>
                  </div>
                </div>
              </div>
              <div className="">
                <Rating>
                  <p className="ml-5 font-medium text-secondary-500">4.71</p>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
            </div>
            <div className="flow-root">
              <p className="italic text-gray-700 dark:text-gray-400">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              </p>
            </div>
          </Card>
        </div>

        <div className="max-w-md">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex flex-col  align-middle">
                <div className="flex items-center align-middle">
                  <Avatar alt="Default avatar with alt text" img={defaultUserProfile} rounded={true} />

                  <div className="ml-4 flex flex-col">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Shawn Rodgers</h5>
                    <p>Java Tech</p>
                  </div>
                </div>
              </div>
              <div className="">
                <Rating>
                  <p className="ml-5 font-medium text-secondary-500">4.71</p>
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star filled={false} />
                </Rating>
              </div>
            </div>
            <div className="flow-root">
              <p className="italic text-gray-700 dark:text-gray-400">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
              </p>
            </div>
          </Card>
        </div>
      </div>

      <button className="rounded-xl bg-primary-500 px-6 py-4 text-white ">Ver todos os cometários</button>
    </section>
  );
}
