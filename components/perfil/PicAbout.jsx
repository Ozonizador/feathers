import React from 'react'
import { Avatar } from "flowbite-react";

const PicAbout = () => {
    return (
        <>
            <section className='mb-10'>
                <h1 className='text-5xl font-semibold mb-14 text-center lg:text-left'>Perfil da Maria</h1>

                <div className="flex flex-col w-full items-center align-middle  justify-center lg:justify-between lg:flex-row">
                    <div>
                        <label htmlFor="files" className="relative cursor-pointer rounded-md bg-white mr-48">
                            <Avatar
                                img={
                                    // profile?.avatarUrl
                                    //   ? profile.avatarUrl
                                    "/images/profile-pic.png"
                                }
                                rounded={true}
                                // status="away"
                                size="xl"
                                statusPosition="bottom-right"
                            />
                        </label>
                        <input
                            type="file"
                            id="files"
                            onChange={(e) => uploadAvatar(e)}
                            multiple
                            accept="image/png, image/gif, image/jpeg"
                            className="hidden"
                        />
                    </div>

                    <div className='w-full'>
                        <textarea
                            rows={5}
                            className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2  shadow-sm"
                            placeholder="Sobre mim"
                            maxLength={500}
                        // defaultValue={advertisement.description}
                        // onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.DESCRIPTION, e.target.value)}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default PicAbout