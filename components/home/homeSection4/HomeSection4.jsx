import React from "react";
//import "./HomeSection4.css";


export default function HomeSection4() {
//    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/4_5`;
  //      navigate(path);
    };

    return (
        <section>
            <div onClick={routeChange} className="container-fluid bg-light">
                <div className="ycontainer-sm section4">
                    <h2 className="fs-900 clr-black-light">
                        Explore as nossas cidades + populares!
                    </h2>
                    <div className="sec4-card-container">
                        <article className="flex transition uplift sec4-article sec4-card1">
                            <h3 className="fs-800 clr-white">Tomar</h3>
                        </article>
                        <article className="flex transition uplift sec4-article sec4-card2">
                            <h3 className="fs-800 clr-white">Peniche</h3>
                        </article>
                        <article className="flex transition uplift sec4-article sec4-card3">
                            <h3 className="fs-800 clr-white">Rio</h3>
                        </article>
                        <article className="flex transition uplift sec4-article sec4-card4">
                            <h3 className="fs-800 clr-white">Santarem</h3>
                        </article>
                        <article className="flex transition uplift sec4-article sec4-card5">
                            <h3 className="fs-800 clr-white">Abrantes</h3>
                        </article>
                        <article className="flex transition uplift sec4-article sec4-card6">
                            <h3 className="fs-800 clr-white">Leira</h3>
                        </article>
                        <article className="flex transition uplift sec4-article sec4-card7">
                            <h3 className="fs-800 clr-white">Braga</h3>
                        </article>
                        <article className="flex transition uplift sec4-article sec4-card8">
                            <h3 className="fs-800 clr-white">Setubal</h3>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
