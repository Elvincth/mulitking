import type { NextPage } from "next";
import Castle from "../components/Castle";
import MyContainer from "../components/MyContainer";
import Link from "next/link";
import { IconButton, Button } from "@chakra-ui/react";
import CrossIcon from "../components/CrossIcon";
import { useCallback, useEffect, useState } from "react";
import { isJSON } from "../utils/utils";
import { IWrongAns } from "../pages/game";

const PrevWrong: NextPage = () => {
  const [wrongAns, setWrongAns] = useState<Array<string>>([]);

  //Get wong ans for local storage
  const getWrongAns = useCallback(async () => {
    const wrongAnswer = await localStorage.getItem("wrongAns");

    //If have prev storage
    if (isJSON(wrongAnswer || "")) {
      //@ts-ignore
      let wrongAnswerObj: IWrongAns = JSON.parse(wrongAnswer) as IWrongAns;
      setWrongAns(wrongAnswerObj.answers);
    }
  }, []);

  const clearAll = async () => {
    await localStorage.setItem("wrongAns", "");
    setWrongAns([]);
  };

  useEffect(() => {
    getWrongAns();
  }, []);

  return (
    <MyContainer
      className="bg-lightPink font-boldSerif "
      classNameInner="flex flex-col"
    >
      <nav className="flex">
        <div className="ml-8 w-full text-center text-[#1966A9] text-[35px] font-bold ">
          Previously <br /> Wrong
        </div>

        <Link href="/home" passHref>
          <IconButton
            className="ml-auto mt-3 !shadow-none !bg-white active:brightness-95 !rounded-full"
            aria-label="Back Home"
            size="lg"
            icon={<CrossIcon />}
          />
        </Link>
      </nav>

      <div className="min-h-[200px]">
        {wrongAns.map((col, i) => (
          <div className="text-center font-bold text-[25px] my-2" key={i}>
            {col}
          </div>
        ))}
      </div>

      {wrongAns.length > 0 && (
        <Link href="/test_again" passHref>
          <Button
            colorScheme="blue"
            className="!bg-[#1966A9] mx-auto !shadow-none !rounded-full my-3 capitalize !font-normal"
            size="lg"
            width={200}
          >
            Test Again
          </Button>
        </Link>
      )}

      {wrongAns.length > 0 && (
        <Button
          colorScheme="blue"
          className="!bg-[#1966A9] mx-auto !shadow-none !rounded-full my-3 capitalize !font-normal"
          size="lg"
          width={200}
          onClick={clearAll}
        >
          Clear All
        </Button>
      )}
    </MyContainer>
  );
};

export default PrevWrong;
