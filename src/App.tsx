import { useCallback, useMemo, useState } from "react";

import styles from "./App.module.scss";
import DishCategory from "./DishCategory";
import JudgePicker from "./JudgePicker";

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

  return (
    <div className={styles.app}>
      <div className={styles.pickers}>
        <JudgePicker values={judgeValues} index={0} onChange={onChangeJudge} />
        <JudgePicker values={judgeValues} index={1} onChange={onChangeJudge} />
        <JudgePicker values={judgeValues} index={2} onChange={onChangeJudge} />
        <JudgePicker values={judgeValues} index={3} onChange={onChangeJudge} />
      </div>
      {hasAnyValues && (
        <>
          <DishCategory values={judgeValues} type="Appetiser" />
          <DishCategory values={judgeValues} type="Main" />
          <DishCategory values={judgeValues} type="Dessert" />
        </>
      )}
    </div>
  );
}
