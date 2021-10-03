import MyContainer from "../components/MyContainer";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

const welcome = () => {
  return (
    <MyContainer className="bg-lightPink">
      <img
        alt=""
        className="absolute right-0 top-[100px]"
        src="/img/bg_math_1.svg"
      />

      <img alt="" className="absolute bottom-0 left-0" src="/img/boy.svg" />

      <div className="mt-[130px]">
        <h1 className="text-[40px] leading-[63px]">
          Welcome To <br /> MULTIKING
        </h1>
        <div className="text-[24px] mt-1 capitalize max-w-[242px]">
          Be a multiplication king
        </div>
      </div>

      <Link href="get_name" passHref>
        <Button
          colorScheme="orange"
          className="!bg-[#F19335] !shadow-none !rounded-full mt-5"
          size="lg"
        >
          Let’s Go
        </Button>
      </Link>
    </MyContainer>
  );
};

export default welcome;
