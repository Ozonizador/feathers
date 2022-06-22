import React from 'react'
import Link from "next/link";
// import style from "./BillPayStyle.jsx"

export default function BillPay() {
    return (
        <div >{/*style={style.mainContainer}}*/}
            <label htmlFor="">entrada</label>
           {/* style={style.fstInput}*/} <input  className="form-control" type="text" placeholder="Default input" aria-label="default input example"></input>
            <label htmlFor="">saida</label>
        {/* style={style.fstInput} */}    <input  className="form-control" type="text" placeholder="Default input" aria-label="default input example"></input>
            <label htmlFor="">Hospedes</label>

            <input className="form-control" type="text" placeholder="Default input" aria-label="default input example"></input>

            <h3>  {/*style={style.fstHeading}> */}
                Pagamento
            </h3>

            <table >
                <tbody style={{ marginLeft: "18px" }}>
                    <tr style={{ marginLeft: "18px" }}>
                        <td style={{ paddingRight: "275px" }}>
                            1 Renda
                        </td>
                        <td >
                            $300
                        </td>
                    </tr>
                    <tr>
                        <td>
                            1 Renda
                        </td>
                        <td>
                            $300
                        </td>
                    </tr>
                </tbody>
            </table>
            <Link href="/">
                Detalhes do Pgamento
            </Link>

            <div>

                <span style={{ marginLeft: "18px", paddingRight: "275px", fontSize: "16px", fontFamily: "Product Sans", fontWeight: "bold" }}>Total</span>
                <span>
                    $600
                </span>
            </div>

            <button >Enviar pedido de reserva</button> {/* style={style.buttonStyle} */}
        </div>
    )
}
