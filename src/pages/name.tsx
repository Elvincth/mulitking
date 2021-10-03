import MyContainer from "../components/MyContainer";
import { Button, Input, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Name = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const storeName = async () => {
    await localStorage.setItem("name", name);
    router.push("/home");
  };

  return (
    <MyContainer className="bg-lightPink">
      <img alt="" className="absolute bottom-0 right-0" src="/img/girl.svg" />

      <img
        alt=""
        className="absolute right-0 top-[100px]"
        src="/img/bg_math_1.svg"
      />

      <div className="mt-[130px] text-[40px] leading-[63px]">
        How Can I <br />
        Call You?
      </div>

      <VStack alignItems="start">
        <Input
          className="my-3 z-10"
          bgColor="#fff"
          placeholder="Your Name"
          size="lg"
          maxW="200"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          disabled={!name}
          colorScheme="orange"
          className="!bg-[#F19335] !shadow-none !rounded-full"
          size="lg"
          onClick={storeName}
        >
          Next
        </Button>
      </VStack>
    </MyContainer>
  );
};

export default Name;
