import { useEffect, useMemo, useState } from "react";
import { TextStyle } from "../../styles";
import { SCORE_FRAME } from "../../types/magic_number";

const Score = ({
  oldScore,
  newScore,
}: {
  oldScore: number;
  newScore: number;
}) => {
  const [score, setScore] = useState(oldScore);

  const step = useMemo(() => {
    return parseInt(String((newScore - oldScore) / SCORE_FRAME));
  }, [oldScore, newScore]);

  useEffect(() => {
    if (step === 0) {
      return;
    }
    const id = requestAnimationFrame(() => {
      if (
        (step > 0 && score + step <= newScore) ||
        (step < 0 && score + step >= newScore)
      ) {
        setScore(score + step);
      } else {
        setScore(newScore);
      }
    });
    return () => {
      cancelAnimationFrame(id);
    };
  }, [newScore, score, step]);

  return (
    <div>
      <TextStyle>{`${score}pt`}</TextStyle>
    </div>
  );
};

export default Score;
