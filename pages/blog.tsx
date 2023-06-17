import BlogCards from "../components/blog/BlogCards/BlogCards";
import BlogHero from "../components/blog/BlogHero/BlogHero";

import Image from "next/image";
import notification from "../public/images/notificationsIcon.svg";
import { Blog, BlogCategoryLabel } from "../models/blog";
import { Fragment, useCallback, useEffect, useState } from "react";
import useBlogService from "../hooks/blogService";
import { UserTypes } from "../models/profile";
import { Spinner } from "flowbite-react";
import { Dialog, Transition } from "@headlessui/react";
import Input from "../components/utils/Input";
import Button from "../components/utils/Button";

{
  /* page 9 XD */
}

const Index = () => {
  let [isOpen, setIsOpen] = useState(false);
  const categories = ["LANDLORD", "TENANT"] as UserTypes[];
  const [category, setCategory] = useState<UserTypes>("LANDLORD");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { getBlogs } = useBlogService();
  const getBlogPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await getBlogs(category, 5);
    if (!error && data) {
      setBlogs(data);
    }
    setLoading(false);
  }, [category]);

  useEffect(() => {
    getBlogPosts();
  }, [getBlogPosts]);

  return (
    <section className="max-width mt-36 px-5 lg:px-0">
      <div className="flex flex-col items-center align-middle lg:flex-row lg:justify-between">
        <div className="text-center text-3xl font-black lg:text-left lg:text-6xl">Pertence Onde Tu Quiseres!</div>
        <div className="flex h-5 w-full items-center lg:w-44 ">
          <select
            className="mt-24 w-full rounded-md border border-solid border-terciary-500 bg-white px-3 py-4 lg:mt-0 lg:w-44"
            placeholder="Categoria"
            onChange={(e) => setCategory(e.target.value as UserTypes)}
          >
            {categories.map((option, index) => {
              return (
                <option value={option} key={index}>
                  {BlogCategoryLabel[option]}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {loading && (
        <div className="mt-14 flex justify-center">
          <Spinner color="info" aria-label="loading" size="lg" />
        </div>
      )}
      {!loading && (
        <>
          <BlogHero blogs={blogs.slice(0, 3)} />
          <BlogCards blogs={blogs.slice(3)} />
        </>
      )}
      <>
        <div className="mx-auto py-6">
          <div className="mx-auto mb-44 mt-14 flex flex-col items-center justify-center rounded-2xl  bg-primary-100 py-5 text-center align-middle  lg:w-4/6 lg:flex-row lg:text-left">
            <div className="alert alert-warning con ml-3" role="alert">
              <Image className="h-10" src={notification} alt="" />
            </div>

            <div className="ml-6 cursor-pointer text-xl" onClick={() => setIsOpen(true)}>
              Receba notificações sempre que houver novidades por aqui
            </div>
          </div>
        </div>
      </>
      <ModalNotification setOpen={setIsOpen} isOpen={isOpen} />
    </section>
  );
};

interface ModalNotificationProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const ModalNotification = ({ isOpen, setOpen }: ModalNotificationProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel className="bg-notification w-full transform overflow-hidden rounded-3xl bg-black text-left align-middle shadow-xl transition-all lg:h-4/5 lg:w-2/3">
                <div className="mx-10 my-20 h-96">
                  <div className="flex h-full flex-col gap-2 rounded-lg bg-white px-10 py-10 lg:w-1/2">
                    <h6 className="mb-8 text-3xl">Queremos ser uns fiéis mensageiros!</h6>
                    <Input placeholder="E-mail"></Input>
                    <div className="mb-10">
                      <Button type={"button"} onClick={() => setOpen(false)}>
                        Notifique-me
                      </Button>
                    </div>
                    <p className="mb-5 mt-auto text-center">
                      Ao carregar em Notifique-me aceita a nossa
                      <br />
                      <span className="text-primary-500 underline">política de tratamento de dados.</span>
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Index;
