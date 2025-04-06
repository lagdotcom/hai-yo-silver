import { useCallback, useMemo, useState } from "react";

import styles from "./App.module.scss";
import DishCategory from "./DishCategory";
import JudgePicker from "./JudgePicker";
import OwnedRecipes from "./OwnedRecipes";
import useLocalState from "./useLocalState";

export default function App() {
  const [judgeValues, setJudgeValues] = useState<(string | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  const onChangeJudge = useCallback(
    (index: number, value?: string) =>
      setJudgeValues((old) => {
        const copy = old.slice();
        copy[index] = value;
        return copy;
      }),
    [],
  );

  const hasAnyValues = useMemo(
    () =>
      judgeValues[0] !== undefined ||
      judgeValues[1] !== undefined ||
      judgeValues[2] !== undefined ||
      judgeValues[3] !== undefined,
    [judgeValues],
  );

  const [owned, setOwned] = useLocalState<number[]>("ownedRecipes", []);

  return (
    <div className={styles.app}>
      <div className={styles.pickers}>
        <JudgePicker values={judgeValues} index={0} onChange={onChangeJudge} />
        <JudgePicker values={judgeValues} index={1} onChange={onChangeJudge} />
        <JudgePicker values={judgeValues} index={2} onChange={onChangeJudge} />
        <JudgePicker values={judgeValues} index={3} onChange={onChangeJudge} />
      </div>
      <OwnedRecipes owned={owned} setOwned={setOwned} />
      {hasAnyValues && (
        <>
          <DishCategory values={judgeValues} owned={owned} type="Appetiser" />
          <DishCategory values={judgeValues} owned={owned} type="Main" />
          <DishCategory values={judgeValues} owned={owned} type="Dessert" />
        </>
      )}
    </div>
  );
}
