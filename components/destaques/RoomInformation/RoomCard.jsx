import React from "react";
import { Card } from "flowbite-react/lib/esm/components";
import { Rating } from "flowbite-react/lib/esm/components";


export default function RoomCard() {
    return (
        <section>
            <div className="max-w-sm">
                <Card>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex flex-col  align-middle">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
                            <p>Java Tech</p>
                        </div>
                        <div className="">
                            <Rating>
                                <p className="font-medium text-secondary-500 ml-5">4.71</p>
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star filled={false} />
                            </Rating>
                        </div>
                    </div>
                    <div className="flow-root">
                        sdsdsdsdççdkfçlkdsçkfçlkçdlsfkçfksdçfkçlfksdçlfkçlfsdkçlfsçlfskdçlfsçlfksçfsçlfksçfsçlfksçfksdçlfksçlfkdsçlfsklfksçlfksçfksçlfkds
                    </div>
                </Card>
            </div>
        </section>
    );
}

