import { PokemonType } from "@/app/types/Pokemons";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params }: { params: { id: string } }) => {
  const response = await axios.get(
    `http://localhost:3000/api/pokemons/${params.id}`
  );
  const data: PokemonType = response.data;

  return (
    <div className="flex justify-center items-center text-black ">
      <div className="bg-white rounded-2xl w-1/3">
        <div className=" bg-slate-100 flex justify-center items-center flex-col pt-3 pb-3 rounded-t-2xl">
          <p className="font-semibold text-xl">{data.korean_name}</p>
          <p>No. {data.order}</p>
        </div>
        <div className="flex  flex-col justify-center items-center  p-10 pt-0">
          <Image
            src={data.sprites.front_default}
            width={100}
            height={100}
            alt="pokemon"
          />
          <div className="flex gap-4 ">
            <p>
              <span className="font-semibold "> 키 : </span>
              {data.height / 10}m
            </p>
            <p>
              <span className="font-semibold ">몸무게 : </span>
              {data.weight / 10}kg
            </p>
          </div>
          <div className="flex p-1 gap-2 text-black">
            <div className="flex gap-1">
              <span className="font-semibold ">타입 :</span>
              {data.types.map((types, index) => (
                <div
                  key={index}
                  className="bg-orange-400 px-2 text-white rounded-md"
                >
                  {types.type.korean_name}
                </div>
              ))}
            </div>
            <div className="flex gap-1 text-black ">
              <span className="font-semibold ">특성 :</span>
              {data.abilities.map((abilities, index) => (
                <div
                  key={index}
                  className="bg-green-400 px-2 text-white rounded-md"
                >
                  {abilities.ability.korean_name}
                </div>
              ))}
            </div>
          </div>
          <span className="font-semibold"> 기술 : </span>
          <div className=" flex flex-wrap justify-center items-start ">
            {data.moves.map((moves, index) => (
              <p key={index} className=" p-1">
                {moves.move.korean_name}
              </p>
            ))}
          </div>
          <Link
            href={`/`}
            className=" border rounded-md px-4 py-2 mt-2 border-green-400"
          >
            뒤로가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
