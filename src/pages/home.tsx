import type { NextPage } from "next";
import Castle from "../components/Castle";
import MyContainer from "../components/MyContainer";
import Link from "next/link";
import { levelColors } from "../utils/levelColors";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LearnCastle from "../components/LearnCastle";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const myName = localStorage.getItem("name");

    if (myName) {
      setName(myName);
    }

    console.log(name);
  }, [name, router]);

  return (
    <MyContainer className="bg-lightPink pb-5">
      <div className="mt-8 text-[27px]">Hello</div>
      <div className="font-boldSerif font-bold text-[44px] capitalize">
        {name}
      </div>
      <h1 className="text-brightPink font-boldSerif text-[38px] font-bold capitalize mb-5">
        start your <br /> journey...
      </h1>

      <Link href="/learn" passHref>
        <div className={`w-[220px] mx-auto`}>
          <LearnCastle />
        </div>
      </Link>

      {levelColors.map((item, i) => (
        <Link
          key={i}
          href={{ pathname: "/game", query: { level: i + 1 } }}
          passHref
        >
          <div className={`w-[220px] ${i % 2 === 0 ? "" : "ml-auto"}`}>
            <Castle
              color={item.color}
              shadeColor={item.shadeColor}
              levelName={i + 1}
            />
          </div>
        </Link>
      ))}
    </MyContainer>
  );
};

export default Home;
