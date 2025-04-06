import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "react-aria-components";

import { recipeNames } from "./data";
import styles from "./OwnedRecipes.module.scss";

interface Props {
  owned: number[];
  setOwned: Dispatch<SetStateAction<number[]>>;
}

export default function OwnedRecipes({ owned, setOwned }: Props) {
  return (
    <div className={styles.recipes}>
      {recipeNames.map((name, i) => (
        <Checkbox
          key={i}
          isSelected={owned.includes(i + 1)}
          onChange={(selected) =>
            setOwned((old) =>
              selected
                ? old.concat(i + 1).sort()
                : old.filter((v) => v !== i + 1),
            )
          }
        >
          <div className="checkbox">
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <polyline points="1 9 7 14 15 4" />
            </svg>
          </div>
          #{i + 1} {name}
        </Checkbox>
      ))}
    </div>
  );
}
