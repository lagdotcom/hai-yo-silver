import { useMemo } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

import { dishes, DishType, findJudge, recipeNames } from "./data";
import styles from "./DishCategory.module.scss";

function getResults(values: (string | undefined)[], type: DishType) {
  const judges = values.map(findJudge);
  return dishes
    .filter((d) => d.type === type)
    .map((d) => {
      const scores = judges.map((j) => (j ? d[j.preference] : NaN));
      const total = scores.reduce((p, c) => (isNaN(c) ? p : p + c), 0);

      return {
        dish: d.name,
        total,
        scores,
        recipe: d.recipe,
        seasoning: d.seasoning,
      };
    })
    .sort((a, b) => {
      if (a.total != b.total) return b.total - a.total;
      return a.dish.localeCompare(b.dish);
    });
}

interface Props {
  values: (string | undefined)[];
  type: DishType;
}

export default function DishCategory({ values, type }: Props) {
  const results = useMemo(() => getResults(values, type), [values, type]);

  return (
    <Table className={styles.table}>
      <TableHeader>
        <Column>{type}</Column>
        <Column>Total Score</Column>
        <Column>Recipe</Column>
        <Column>Seasoning</Column>
        <Column>#1</Column>
        <Column>#2</Column>
        <Column>#3</Column>
        <Column>#4</Column>
      </TableHeader>
      <TableBody>
        {results.map((result, i) => (
          <Row key={i}>
            <Cell>{result.dish}</Cell>
            <Cell>{result.total}</Cell>
            <Cell>
              #{result.recipe} {recipeNames[result.recipe - 1]}
            </Cell>
            <Cell>{result.seasoning}</Cell>
            <Cell>{isNaN(result.scores[0]) ? "-" : result.scores[0]}</Cell>
            <Cell>{isNaN(result.scores[1]) ? "-" : result.scores[1]}</Cell>
            <Cell>{isNaN(result.scores[2]) ? "-" : result.scores[2]}</Cell>
            <Cell>{isNaN(result.scores[3]) ? "-" : result.scores[3]}</Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  );
}
