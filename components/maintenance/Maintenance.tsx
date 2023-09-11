import Image from "next/image";

const Maintenance = () => {
  return (
    <div className="flex h-screen flex-col justify-center gap-2">
      <div className="flex flex-row justify-center">
        <div className="relative h-60 w-60">
          <Image
            src="/images/logo1.png"
            alt=""
            className="cursor-pointer"
            style={{ objectFit: "contain" }}
            fill
          ></Image>
        </div>
      </div>
      <div className="flex flex-row justify-center text-2xl font-medium">Estamos a melhorar a experiencia</div>
    </div>
  );
};

export default Maintenance;
