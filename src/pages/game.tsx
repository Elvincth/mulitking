import type { NextPage } from "next";
import { useRouter } from "next/router";
import Castle from "../components/Castle";
import MyContainer from "../components/MyContainer";
import NumberDragonKid from "../components/NumberDragonKid";
import NumberKnightKid from "../components/NumberKnightKid";
import arrayShuffle from "array-shuffle";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { ToWords } from "to-words";
import { randomInteger } from "../utils/number";
import confetti from "canvas-confetti";

//multiplier * multiplicand = product
const Formula = ({
  multiplier,
  multiplicand,
}: {
  multiplier: number;
  multiplicand: number;
}) => {
  return (
    <div className="mt-8 font-cursive tracking-[0.185em] text-right text-[103px]">
      <div className="leading-[80px]">{multiplier}</div>
      <div className="flex justify-between">
        <span>X</span>
        <span>{multiplicand}</span>
      </div>

      <div className="bg-black h-[8px] rounded-full" />
    </div>
  );
};

//If query levelName is not presented redirect user to home page
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  //Id the levelName not a number also redirect
  if (!query.level || isNaN(Number(query.level))) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

interface IQuestion {
  multiplier: number;
  multiplicand: number;
  answer: number;
  choices: Array<number>;
}

const Game: NextPage = () => {
  const WRONG_COLOR = "#EC9C22";
  const toWords = new ToWords();
  const router = useRouter();
  const { level } = router.query;
  //Store questions
  const [questions, setQuestions] = useState<Array<IQuestion>>([]);
  const [levelName, setLevelName] = useState("");
  const [currentQNum, setCurrentQNum] = useState(0);
  //Question wrong?
  const [wrong, setWrong] = useState(false);
  const current = questions[currentQNum];

  //Generate questions
  /**
   *
   * @param multiplier multiplier
   * @param maxMultiplicand max number of questions regrading on multiplier
   * @param shuffle Randomize questions?
   * @returns
   */
  const generateQuestions = (
    multiplier: number,
    maxMultiplicand = 10,
    shuffle = true
  ) => {
    const myQuestions: Array<IQuestion> = [];

    for (let i = 0; i < maxMultiplicand; i++) {
      const multiplicand = i + 1;
      const answer = multiplier * multiplicand; //product
      const wrongAns = randomInteger(answer + 1, answer + 5);
      //Generate random choice one with correct answer, one wrong answer
      const choices = arrayShuffle([answer, wrongAns]);

      myQuestions.push({
        multiplier,
        multiplicand,
        answer,
        choices,
      });
    }

    if (shuffle) {
      return arrayShuffle(myQuestions);
    }

    return myQuestions;
  };

  //On mount
  useEffect(() => {
    setLevelName(`Castle ${toWords.convert(Number(level))}`);
    const questions = generateQuestions(Number(level));
    setQuestions(questions); //Gen questions
  }, []);

  //Check question
  const check = (answer: number) => {
    const correct = answer === current.answer;

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        shapes: ["circle"],
        ticks: 80,
      });

      nextQuestion();
    } else {
      setWrong(true);
    }
  };

  const nextQuestion = () => {
    setWrong(false);
    setCurrentQNum(currentQNum + 1);
  };

  return (
    <MyContainer className="bg-lightPink">
      {questions.length > 0 && (
        <div>
          {/* Title */}
          <nav>
            <div className="text-center font-boldSerif font-bold">
              <div className="text-[25px]">{levelName}</div>

              <div className="text-[20px]">
                {currentQNum + 1} of {questions.length}
              </div>
            </div>
          </nav>

          {/* Question  */}
          <Formula
            multiplier={current.multiplier}
            multiplicand={current.multiplicand}
          />

          <div className="flex flex-col">
            <NumberDragonKid
              className={`ml-auto my-5 transition-opacity duration-200 ${
                wrong && current.choices[0] !== current.answer
                  ? "!opacity-50 pointer-events-none"
                  : ""
              }`}
              number={current.choices[0]}
              cardColor={
                wrong && current.choices[0] === current.answer
                  ? WRONG_COLOR
                  : ""
              }
              onClick={() => check(current.choices[0])}
            />

            <NumberKnightKid
              className={`transition-opacity duration-200 ${
                wrong && current.choices[1] !== current.answer
                  ? "!opacity-50 pointer-events-none"
                  : ""
              }`}
              number={current.choices[1]}
              cardColor={
                wrong && current.choices[1] === current.answer
                  ? WRONG_COLOR
                  : ""
              }
              onClick={() => check(current.choices[1])}
            />
          </div>
        </div>
      )}
    </MyContainer>
  );
};

export default Game;
