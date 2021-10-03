import type { NextPage } from "next";
import Castle from "../components/Castle";
import MyContainer from "../components/MyContainer";
import Link from "next/link";

const Home: NextPage = () => {
  const colors: Array<{ color: string; shadeColor: string }> = [
    { color: "#F13361", shadeColor: "#D22355" },
    { color: "#4BA651", shadeColor: "#307D35" },
    { color: "#7C3AED", shadeColor: "#5B21B6" },
    { color: "#F59E0B", shadeColor: "#D97706" },
    { color: "#2563EB", shadeColor: "#1E40AF" },
    { color: "#EF4444", shadeColor: "#B91C1C" },
    { color: "#404040", shadeColor: "#262626" },
    { color: "#6366F1", shadeColor: "#4F46E5" },
    { color: "#0EA5E9", shadeColor: "#0284C7" },
    { color: "#FBBF24", shadeColor: "#F59E0B" },
  ];

  return (
    <MyContainer className="bg-lightPink mb-5">
      <div className="mt-8 text-[27px]">Hello</div>
      <div className="font-boldSerif font-bold text-[44px]">Elvin</div>
      <h1 className="text-brightPink font-boldSerif text-[38px] font-bold capitalize mb-5">
        start your <br /> journey...
      </h1>

      {colors.map((item, i) => (
        <Link
          key={i}
          href={{ pathname: "/game", query: { level: i + 1 } }}
          passHref
        >
          <div>
            <Castle
              className={i % 2 === 0 ? "" : "ml-auto"}
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
