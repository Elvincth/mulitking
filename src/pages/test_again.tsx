import type { NextPage } from "next";
import { useRouter } from "next/router";
import Castle from "../components/Castle";
import MyContainer from "../components/MyContainer";
import NumberDragonKid from "../components/NumberDragonKid";
import NumberKnightKid from "../components/NumberKnightKid";
import arrayShuffle from "array-shuffle";
import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { ToWords } from "to-words";
import { randomInteger } from "../utils/number";
import confetti from "canvas-confetti";
import { levelColors } from "../utils/levelColors";
import { IconButton } from "@chakra-ui/react";
import CrossIcon from "../components/CrossIcon";
import anime from "animejs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { isJSON } from "../utils/utils";

export interface IWrongAns {
  answers: Array<string>;
}

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
      <div className="leading-[80px] multiplier">{multiplier}</div>
      <div className="flex justify-between">
        <span>X</span>
        <span className="multiplicand">{multiplicand}</span>
      </div>

      <div className="bg-black h-[8px] rounded-full" />
    </div>
  );
};

interface IQuestion {
  multiplier: number;
  multiplicand: number;
  answer: number;
  choices: Array<number>;
}

const WrongTest: NextPage = () => {
  const router = useRouter();
  const { level } = router.query;
  const WRONG_COLOR = "#EC9C22";

  //Store questions
  const [questions, setQuestions] = useState<Array<IQuestion>>([]);
  const [levelName, setLevelName] = useState("");
  const [currentQNum, setCurrentQNum] = useState(0);
  //Current question
  const current = questions[currentQNum];
  const MySwal = withReactContent(Swal);
  //Question wrong?
  const [wrong, setWrong] = useState(false);

  const generateQuestions = (wrongAns: Array<string>, shuffle = true) => {
    const myQuestions: Array<IQuestion> = [];

    //  console.log("wrongAns", wrongAns);

    wrongAns.map((formula) => {
      const data = formula
        .split("x")
        .map((item) => item.split("="))
        .flat()
        .map(Number);
      const multiplier = data[0];
      const multiplicand = data[1];
      const answer = multiplier * multiplicand; //product
      const myWrongAns = randomInteger(answer + 1, answer + 5);
      //Generate random choice one with correct answer, one wrong answer
      const choices = arrayShuffle([answer, myWrongAns]);

      //      console.log(data);
      myQuestions.push({
        multiplier,
        multiplicand,
        answer,
        choices,
      });
    });

    if (shuffle) {
      return arrayShuffle(myQuestions);
    }

    return myQuestions;
  };

  //Get wong ans for local storage
  const getWrongAns = async () => {
    const wrongAnswer = await localStorage.getItem("wrongAns");

    //If have prev storage
    if (isJSON(wrongAnswer || "")) {
      //@ts-ignore
      let wrongAnswerObj: IWrongAns = JSON.parse(wrongAnswer) as IWrongAns;
      const qsGen = generateQuestions(wrongAnswerObj.answers);
      setQuestions(qsGen); //Gen questions
    } else {
      router.push("/home");
    }
  };

  //On mount
  useEffect(() => {
    getWrongAns();
    setLevelName(`Test Again`);

    //  console.log("questions");
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
      //Wrong answer
      setWrong(true);
    }
  };

  const nextQuestion = async () => {
    setWrong(false);

    //Time line of kids change num
    const kidsEl = anime.timeline({
      easing: "easeOutExpo",
      duration: 500,
    });

    // Add children
    kidsEl
      .add({
        targets: ".dragonKid",
        translateX: 280,
      })
      .add(
        {
          targets: ".knightKid",
          translateX: -280,
        },
        -300
      )
      .add({
        targets: ".dragonKid",
        translateX: 0,
      })
      .add({
        targets: ".knightKid",
        translateX: 0,
      });

    if (questions.length - 1 > currentQNum) {
      setCurrentQNum(currentQNum + 1);
    } else {
      //End of the game
      router.push("/completed");
    }
  };

  const exitGame = async () => {
    const result = await MySwal.fire({
      icon: "question",
      width: 380,
      title: <> Back To Home </>,
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      router.push("/home");
    }
  };

  return (
    <MyContainer className="bg-lightPink ">
      {questions.length > 0 && (
        <div>
          {/* Title */}
          <nav className="flex justify-around items-center">
            <Castle
              className="w-[70px] "
              levelName={"T"}
              color={"#1966A9"}
              noClick
              shadeColor={"#114A7C"}
            />

            <div className="text-center font-boldSerif font-bold">
              <div className="text-[25px]">{levelName}</div>

              <div className="text-[20px]">
                {currentQNum + 1} of {questions.length}
              </div>
            </div>

            {/* Back to home */}
            <IconButton
              onClick={exitGame}
              className="!shadow-none !bg-white active:brightness-95 !rounded-full"
              aria-label="Back Home"
              size="lg"
              icon={<CrossIcon />}
            />
          </nav>

          {/* Question  */}
          <Formula
            multiplier={current.multiplier}
            multiplicand={current.multiplicand}
          />

          <div className="flex flex-col">
            <NumberDragonKid
              className={`dragonKid ml-auto my-5 transition-opacity duration-200 ${
                wrong && current.choices[0] !== current.answer
                  ? "!opacity-50 pointer-events-none"
                  : ""
              }`}
              number={current.choices[0]}
              cardColor={
                wrong && current.choices[0] === current.answer
                  ? WRONG_COLOR
                  : "#1966A9"
              }
              onClick={() => check(current.choices[0])}
            />

            <NumberKnightKid
              className={`knightKid transition-opacity duration-200 ${
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

export default WrongTest;
