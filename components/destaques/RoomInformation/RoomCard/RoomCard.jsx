import React from "react";
import { Card } from "flowbite-react/lib/esm/components";
import { Rating } from "flowbite-react/lib/esm/components";
import { Avatar } from "flowbite-react";

export default function RoomCard() {
    return (
        <section className="mb-10">
            <div className="flex gap-4 mt-20">
                <div className="max-w-md">
                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex flex-col  align-middle">
                                <div className="flex items-center align-middle">
                                    <Avatar
                                        alt="Default avatar with alt text"
                                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        rounded={true}
                                    />

                                    <div className="flex flex-col ml-4">
                                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Shawn Rodgers</h5>
                                        <p>Java Tech</p>
                                    </div>

                                </div>
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
                            <p className="italic text-gray-700 dark:text-gray-400">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed

                            </p>

                        </div>
                    </Card>
                </div>

                <div className="max-w-md">
                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex flex-col  align-middle">
                                <div className="flex items-center align-middle">
                                    <Avatar
                                        alt="Default avatar with alt text"
                                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        rounded={true}
                                    />

                                    <div className="flex flex-col ml-4">
                                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Shawn Rodgers</h5>
                                        <p>Java Tech</p>
                                    </div>

                                </div>
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
                            <p className="italic text-gray-700 dark:text-gray-400">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed

                            </p>

                        </div>
                    </Card>
                </div>
            </div>

            <div className="flex gap-4 my-7">
                <div className="max-w-md">
                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex flex-col  align-middle">
                                <div className="flex items-center align-middle">
                                    <Avatar
                                        alt="Default avatar with alt text"
                                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        rounded={true}
                                    />

                                    <div className="flex flex-col ml-4">
                                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Shawn Rodgers</h5>
                                        <p>Java Tech</p>
                                    </div>

                                </div>
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
                            <p className="italic text-gray-700 dark:text-gray-400">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed

                            </p>

                        </div>
                    </Card>
                </div>

                <div className="max-w-md">
                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex flex-col  align-middle">
                                <div className="flex items-center align-middle">
                                    <Avatar
                                        alt="Default avatar with alt text"
                                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        rounded={true}
                                    />

                                    <div className="flex flex-col ml-4">
                                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Shawn Rodgers</h5>
                                        <p>Java Tech</p>
                                    </div>

                                </div>
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
                            <p className="italic text-gray-700 dark:text-gray-400">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed

                            </p>

                        </div>
                    </Card>
                </div>
            </div>

            <button className="bg-primary-500 text-white px-6 py-4 rounded-xl ">Ver todos os cometários</button>

        </section>
    );
}

