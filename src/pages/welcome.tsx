import MyContainer from "../components/MyContainer";

const welcome = () => {
  return (
    <MyContainer className="bg-lightPink">
      <div className="p-6 relative">
        <div className="mt-20">
          <h1 className="text-[40px] leading-[63px]">
            Welcome To <br /> MULTIKING
          </h1>
          <div className="text-[24px] mt-1 capitalize max-w-[242px]">
            Be a multiplication king
          </div>
        </div>

        <img alt="" className="absolute" src="/img/bg_math_1.svg" />
      </div>
    </MyContainer>
  );
};

export default welcome;
