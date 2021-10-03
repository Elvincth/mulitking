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
  const toWords = new ToWords();
  const router = useRouter();
  const { level } = router.query;
  //Store questions
  const [questions, setQuestions] = useState<Array<IQuestion>>([]);
  const [levelName, setLevelName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);

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

  return (
    <MyContainer className="bg-lightPink">
      {questions.length > 0 && (
        <div>
          {/* Title */}
          <div className="text-center font-boldSerif font-bold">
            <div className="text-[25px]">{levelName}</div>

            <div className="text-[20px]">
              {currentQuestion} of {questions.length}
            </div>
          </div>

          {/* Question  */}
          <Formula
            multiplier={questions[currentQuestion].multiplier}
            multiplicand={questions[currentQuestion].multiplicand}
          />

          <div className="flex flex-col">
            <NumberDragonKid
              className="ml-auto"
              number={questions[currentQuestion].choices[0]}
            />

            <NumberKnightKid number={questions[currentQuestion].choices[1]} />
          </div>
        </div>
      )}
    </MyContainer>
  );
};

export default Game;
