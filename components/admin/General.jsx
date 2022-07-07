import React from "react";
import Link from "next/link";
import Input from "../utils/Input";
import { Avatar } from "flowbite-react";
import { Toast } from "flowbite-react";
/*
    pagina 32 do XD
*/

const MainMenu = () => {
  return (
    <div className=" w-10/12 mx-auto mb-20 ">
      <div className="my-10 text-xl font-b">
        <Link href="/admin">Conta</Link>
        {" > Informações pessoais"}
      </div>


      <div className="flex flex-1 justify-center">
        <div className="w-full bg-terciary-300 p-10 border border-terciary-700 rounded-2xl px-32">
          <div className="font-bold text-3xl">Informações pessoais</div>
          {/* <div className="mb-20">Avatar</div> */}
          <div className="mt-5 mb-16">
            <Avatar
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
              status="away"
              size="lg"
              statusPosition="bottom-right"
            />
          </div>


          {/* LEFT SIDE */}
          <div className="flex flex-row justify-between gap-12">
            <div className="w-1/2">

              <div className="mb-10">
                <Input onChange={() => { }} label="nome" labelText="Nome" />
              </div>
              <div className="mb-1">Data de nascimento</div>
              <div className="flex flex-row gap-4">

                <div className="flex-1">
                  <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3">
                    <option>Dia</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                    <option>13</option>
                    <option>14</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                    <option>19</option>
                    <option>20</option>
                    <option>21</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                    <option>31</option>
                  </select>
                </div>

                <div className="flex-1">
                  <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3">
                    <option>Mês</option>
                    <option>Janeiro</option>
                    <option>Fevereiro</option>
                    <option>Março</option>
                    <option>Abril</option>
                    <option>Maio</option>
                    <option>Junho</option>
                    <option>Julho</option>
                    <option>Agosto</option>
                    <option>Setembro</option>
                    <option>Outubro</option>
                    <option>Novembro</option>
                    <option>Dezembro</option>
                  </select>
                </div>

                <div className="flex-1">
                  <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3">
                    <option>Ano</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                  </select>
                </div>
              </div>


              <div className="my-10">
                <label className="block mt-2">Nacionalidade</label>
                <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3">
                  <option>Selecione</option>
                  <option>Casa</option>
                  <option>Apartamento</option>
                </select>
              </div>
            </div>




            {/* RIGHT SIDE */}
            <div className="w-1/2 ">

              <div className="mb-10">
                <Input onChange={() => { }} label="Apelido" labelText="Apelido" />
              </div>

              <div className="my-10">
                <div className="mb-1">Género</div>
                <div className="flex flex-row gap-4">
                  <div className="flex-1">
                    <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3">
                      <option>Dia</option>
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                      <option>04</option>
                      <option>05</option>
                      <option>06</option>
                      <option>07</option>
                      <option>08</option>
                      <option>09</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                      <option>22</option>
                      <option>23</option>
                      <option>24</option>
                      <option>25</option>
                      <option>26</option>
                      <option>27</option>
                      <option>28</option>
                      <option>29</option>
                      <option>30</option>
                      <option>31</option>
                    </select>
                  </div>
                </div>
              </div>

              <Input onChange={() => { }} label="Apelido" labelText="Localidade" />
            </div>
          </div>


          <div className="mb-1">Sobre mim</div>
          <textarea
            rows={5}
            className="mt-1 block w-full py-3 px-2 border-solid border border-terciary-500 bg-white rounded-md shadow-sm  mb-6"
            placeholder="Escreva aqui..."
            defaultValue={''}
          />


          {/* LÍNGUAS FALADAS */}
          <div className="mb-1">Línguas faladas</div>
          <div className="flex flex-row">
            <div className="flex flex-col w-1/6 mr-5">
              <Toast>

                <div className="ml-3 text-sm font-normal">
                  Inglês
                </div>
                <Toast.Toggle />
              </Toast>
            </div>

            <div className="flex flex-col gap-0 w-1/6">
              <Toast>
                <div className="ml-3 text-sm font-normal">
                  Portugês
                </div>
                <Toast.Toggle />
              </Toast>
            </div>
          </div>



          {/* CONTATO TELEFONICO */}
          <div className="my-8">
            <div>Contacto telefónico</div>
            <div className="flex flex-row gap-4 w-full  items-center">

              <div className="w-36">
                <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white px-3">
                  <option>PT +351</option>
                </select>
              </div>
              <div className="">
                <Input onChange={() => { }} label="" labelText="" />
              </div>
            </div>
          </div>


          <div className="my-8">
            <div>Validade</div>
            <div className="flex flex-row gap-4 w-full  items-center">

              <div className="w-36">
                <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white px-3">
                  <option>Dia</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                  <option>23</option>
                  <option>24</option>
                  <option>25</option>
                  <option>26</option>
                  <option>27</option>
                  <option>28</option>
                  <option>29</option>
                  <option>30</option>
                  <option>31</option>
                </select>
              </div>


              <div className="w-36">
                <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white px-3">
                  <option>Mês</option>
                  <option>Janeiro</option>
                  <option>Fevereiro</option>
                  <option>Março</option>
                  <option>Abril</option>
                  <option>Maio</option>
                  <option>Junho</option>
                  <option>Julho</option>
                  <option>Agosto</option>
                  <option>Setembro</option>
                  <option>Outubro</option>
                  <option>Novembro</option>
                  <option>Dezembro</option>
                </select>
              </div>

              <div className="w-36">
                <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white px-3">
                  <option>Ano</option>
                </select>
              </div>

            </div>

          </div>
        </div>



      </div>
    </div>


  );
};

export default MainMenu;
