import React, { useState } from "react";
import { ImPhone } from "react-icons/im";
import { GrMail } from "react-icons/gr";
import { VscTriangleDown } from "react-icons/vsc";
import Socials from "../socials/Socials";
import Link from "next/link";
import Image from "next/image";

export const Navbar = (props) => {
  const [activeNav, setActiveNav] = useState("home");
  //let navigate = useNavigate();
  const handleNavClick = () => {
    let path = "/";
    //  navigate(path);
  };
  const [toggle, setToggle] = useState(props.profile);

  return (
    <header>
      <div className="container mx-auto">
        <div className="container-md">
          <div className="flex py-2">
            <div className="flex">
              <div className="flex">
                <ImPhone className="my-auto mr-1" />
                <p className="mr-3">+351 914 626 616</p>
              </div>
              <div className="flex">
                <GrMail className="my-auto mr-1" />
                <p>info@unihost.pt</p>
              </div>
            </div>

            <div className="ml-auto flex">
              <Socials type="primary" />
              <div className="right-dropdown flex">
                <Image src="/images/icon-uk.jpg" height={16} width={32} alt="" />
                <select name="" id="">
                  <option value="" disabled>
                    EN
                  </option>
                  <option value="">PT</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="container-md hr"></div>
        <div className="container-md ">
          <div className="mt-5 flex justify-between align-middle">
            <Image src="/images/logo1.png" alt="" className="logo" height={55} width={208}></Image>

            <nav>
              <ul className="bottom-nav text-base">
                <li className="px-3.5 pt-3.5 pb-4 duration-300 ease-in hover:text-secondary-300">
                  <Link href="/">Home</Link>
                </li>
                <li className="px-3.5 pt-3.5 pb-4 duration-300 ease-in hover:text-secondary-300">
                  <div className="flex">
                    <p>Anuncie a sua propriedade</p>
                    <VscTriangleDown className="mt-1.5" />
                  </div>
                  <ul className="sub-menu">
                    <li>
                      <Link href="/7">Como funciona?</Link>
                    </li>
                    <li>
                      <Link href="/23">Announciar!</Link>
                    </li>
                  </ul>
                </li>
                <li className="px-3.5 pt-3.5 pb-4 duration-300 ease-in hover:text-secondary-300">
                  <Link href="/8">Blog</Link>
                </li>
                <li className="px-3.5 pt-3.5 pb-4 duration-300 ease-in hover:text-secondary-300">
                  <Link href="/53">Contactos</Link>
                </li>
                <li className={activeNav === "home" ? "bottom-line" : ""}></li>
                <li></li>
                <li className={activeNav === "blog" ? "bottom-line" : ""}></li>
                <li className={activeNav === "contactos" ? "bottom-line" : ""}></li>
              </ul>
            </nav>

            <div className="flex">
              <Link href="/12">
                <a className="p-0">
                  <div className="mr-2 rounded border-2 border-[#C48B60] px-6 py-3 text-center text-sm text-[#C48B60] duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                    Registar
                  </div>
                </a>
              </Link>

              <Link href="/11">
                <a className="p-0">
                  <div className=" mr-2 rounded border-2 border-[#C48B60] bg-primary-500 px-6 py-3 text-center text-sm text-white duration-200 ease-in hover:drop-shadow-xl">
                    Iniciar sessão
                  </div>
                </a>
              </Link>
            </div>
            <div
              className={`nav-profile ${toggle ? "" : "profileHide"}`}
              style={{
                display: "none",
                alignItems: "center",
                gap: "22px",
              }}
            >
              <div className="profile-toggle">
                <span className="student">Estudante</span>
                <button>
                  <div className="button-div"></div>
                </button>
                <span className="landlord">Senhorio</span>
              </div>
              <div
                className="profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Image src="/images/man7.png" height={32} width={32} alt="" />
                <ul style={{ margin: "0", padding: "0" }}>
                  <li className="profile-dropdown">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "6px 0",
                        gap: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <p className="fs-100 bold clr-black-light" style={{ marginBottom: "0" }}>
                        Jessica
                      </p>
                      <VscTriangleDown style={{ width: "8px" }} />
                    </div>
                    <ul className="profile-submenu">
                      <li className="upper-items bold fs-200 clr-black-main">Uni-Desk</li>
                      <li className="upper-items bold fs-200 clr-black-main">Minha Estadia</li>
                      <li className="upper-items bold fs-200 clr-black-main">Favoritos</li>
                      <li className="upper-items bold fs-200 clr-black-main">
                        Caixa de Entrada (5)
                      </li>
                      <li className="upper-items bold fs-200 clr-black-main">Notificações (3)</li>
                      <li
                        style={{
                          width: "100%",
                          height: "1px",
                          backgroundColor: "#505046",
                        }}
                      ></li>
                      <li className="fs-100 clr-black-extralight">Conta</li>
                      <li className="fs-100 clr-black-extralight">Ajuda</li>
                      <li className="fs-100 clr-black-extralight">Sair</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
