import React from "react";
import MyContainer from "../components/MyContainer";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const Completed = () => {
  return (
    <MyContainer className="bg-lightPink">
      <div className="flex flex-col items-center my-20">
        <h1 className="text-[40px] font-boldSerif font-bold text-center">
          Completed
        </h1>

        <img className="my-10" width="199px" alt="" src="/img/king.svg" />

        <Link href="/home" passHref>
          <Button
            colorScheme="orange"
            className="!bg-[#F19335] !shadow-none !rounded-full"
            size="lg"
          >
            Continue
          </Button>
        </Link>
      </div>
    </MyContainer>
  );
};

export default Completed;
