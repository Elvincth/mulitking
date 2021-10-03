import type { NextPage } from "next";
import Castle from "../components/Castle";
import MyContainer from "../components/MyContainer";
import Link from "next/link";
import { levelColors } from "../utils/levelColors";
import CrossIcon from "../components/CrossIcon";
import { IconButton } from "@chakra-ui/react";
import { ToWords } from "to-words";

const Learn: NextPage = () => {
  const toWords = new ToWords();

  //Gen table of multiplication
  const generateTable = (multiplier: number, maxMultiplicand = 10) => {
    const row: Array<String> = [];

    for (let i = 0; i < maxMultiplicand; i++) {
      const multiplicand = i + 1;
      const answer = multiplier * multiplicand; //product
      row.push(`${multiplier} x ${multiplicand} = ${answer}`);
    }

    return row;
  };

  return (
    <MyContainer className="bg-lightPink font-boldSerif">
      <nav className="flex items-center">
        <div className="ml-8 w-full text-center text-brightPink text-[35px] font-bold ">
          Learn
        </div>

        <Link href="/home" passHref>
          <IconButton
            className="ml-auto !shadow-none !bg-white active:brightness-95 !rounded-full"
            aria-label="Back Home"
            size="lg"
            icon={<CrossIcon />}
          />
        </Link>
      </nav>

      {levelColors.map((levelColor, level) => {
        return (
          <div key={level}>
            <div
              className={`flex justify-center items-center ${
                level === 0 ? "mt-5" : "mt-8"
              }`}
            >
              <Castle
                className="w-[70px]"
                levelName={Number(level)}
                color={levelColor.color}
                noClick
                shadeColor={levelColor.shadeColor}
              />

              <span
                style={{ color: levelColor.color }}
                className="mx-3 font-bold text-[25px]"
              >{`Castle ${toWords.convert(Number(level + 1))}`}</span>
            </div>

            {generateTable(level + 1).map((row, i) => (
              <div className="text-center font-bold text-[25px] my-2" key={i}>
                {row}
              </div>
            ))}
          </div>
        );
      })}
      <div></div>
    </MyContainer>
  );
};

export default Learn;
