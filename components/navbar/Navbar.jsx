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
    console.log(toggle);
    console.log(typeof toggle);
    return (
        <header style={{ marginBottom: "0" }}>
            <div className="container-fluid ">
                <div className="ycontainer-md">
                    <div className="top" onClick={() => console.log("clickedHere")}>
                        <div
                            className="top-left flex"
                            onClick={() => {
                               // navigate(`/10`);
                            }}
                        >
                            <div className="flex contact-mail">
                                <ImPhone />
                                <p>+351 914 626 616</p>
                            </div>
                            <div className="flex contact-mail">
                                <GrMail />
                                <p>info@unihost.pt</p>
                            </div>
                        </div>

                        <div className="top-right flex ">
                            <Socials
                                bgClr="#c48b60"
                                clr="#fff"
                                width="24px"
                                fSize="16px"
                            />
                            <div className="right-line"></div>
                            <div className="right-dropdown flex">
                                <img src="../../public/images/icon-uk.jpg" alt="" />
                                <select name="" id="">
                                    <option
                                        value=""
                                        disabled
                                    >
                                        EN
                                    </option>
                                    <option value="">PT</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid hr"></div>
                <div className="ycontainer-md">
                    <div className="bottom">
                        <Image
                            onClick={handleNavClick}
                            src="/images/logo1.png"
                            alt=""
                            className="logo"
                            height={32} width={32}
                        ></Image>

                        <nav>
                            <ul className="fs-200 bottom-nav">
                                <li className="nav-padding">
                                    <Link
                                        href="/"
                                        className={
                                            activeNav === "home" ? "bold" : ""
                                        }
                                        onClick={() => {
                                            setActiveNav("/");
                                        }}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-padding dropdown">
                                    <div
                                        className="flex"
                                        style={{ gap: "0.25rem" }}
                                    >
                                        <p>Anuncie a sua propriedade</p>
                                        <VscTriangleDown />
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
                                <li className="nav-padding">
                                    <Link
                                        href="/8"
                                        className={
                                            activeNav === "blog" ? "bold" : ""
                                        }
                                        onClick={() => {
                                            setActiveNav("blog");
                                        }}
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li className="nav-padding">
                                    <Link
                                        href="/53"
                                        className={
                                            activeNav === "contactos"
                                                ? "bold"
                                                : ""
                                        }
                                        onClick={() => {
                                            setActiveNav("contactos");
                                        }}
                                    >
                                        Contactos
                                    </Link>
                                </li>
                                <li
                                    className={
                                        activeNav === "home"
                                            ? "bottom-line"
                                            : ""
                                    }
                                ></li>
                                <li></li>
                                <li
                                    className={
                                        activeNav === "blog"
                                            ? "bottom-line"
                                            : ""
                                    }
                                ></li>
                                <li
                                    className={
                                        activeNav === "contactos"
                                            ? "bottom-line"
                                            : ""
                                    }
                                ></li>
                            </ul>
                        </nav>

                        <div
                            className={`buttons ${toggle ? "buttonsHide" : ""}`}
                        >
                            <Link
                                href="/12"
                                className="btn-outline transition btn-shadow"
                            >
                                Registar
                            </Link>
                            <Link
                                href="/11"
                                className="btn-contain transition btn-shadow"
                            >
                                Iniciar sessao
                            </Link>
                        </div>
                        <div
                            className={`nav-profile ${toggle ? "" : "profileHide"
                                }`}
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
                                <img src="../../public/images/man7.png" alt="" />
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
                                            <p
                                                className="fs-100 bold clr-black-light"
                                                style={{ marginBottom: "0" }}
                                            >
                                                Jessica
                                            </p>
                                            <VscTriangleDown
                                                style={{ width: "8px" }}
                                            />
                                        </div>
                                        <ul className="profile-submenu">
                                            <li className="upper-items bold fs-200 clr-black-main">
                                                Uni-Desk
                                            </li>
                                            <li className="upper-items bold fs-200 clr-black-main">
                                                Minha Estadia
                                            </li>
                                            <li className="upper-items bold fs-200 clr-black-main">
                                                Favoritos
                                            </li>
                                            <li className="upper-items bold fs-200 clr-black-main">
                                                Caixa de Entrada (5)
                                            </li>
                                            <li className="upper-items bold fs-200 clr-black-main">
                                                Notificações (3)
                                            </li>
                                            <li
                                                style={{
                                                    width: "100%",
                                                    height: "1px",
                                                    backgroundColor: "#505046",
                                                }}
                                            ></li>
                                            <li className="fs-100 clr-black-extralight">
                                                Conta
                                            </li>
                                            <li className="fs-100 clr-black-extralight">
                                                Ajuda
                                            </li>
                                            <li className="fs-100 clr-black-extralight">
                                                Sair
                                            </li>
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

