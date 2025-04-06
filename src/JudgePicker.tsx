import { useMemo } from "react";
import {
  Button,
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";

import { findJudge, judges } from "./data";
import styles from "./JudgePicker.module.scss";

interface Props {
  index: number;
  values: (string | undefined)[];
  onChange: (index: number, value?: string) => void;
}

const judgeNames = judges.map((j) => j.name).sort();

interface Item {
  id: string;
  name: string;
}

const asItem = (name: string): Item => ({ id: name, name });

export default function JudgePicker({ index, values, onChange }: Props) {
  const value = values[index];
  const items = useMemo(
    () =>
      judgeNames
        .filter((n) => [-1, index].includes(values.indexOf(n)))
        .map(asItem),
    [index, values],
  );
  const judge = useMemo(() => findJudge(value), [value]);

  return (
    <div className={styles.picker}>
      <ComboBox
        items={items}
        onSelectionChange={(e) =>
          onChange(index, items.find((i) => i.id === e)?.name)
        }
      >
        <Label>Judge #{index + 1}</Label>
        <div>
          <Input />
          <Button>▼</Button>
        </div>
        <Popover>
          <ListBox<Item>>
            {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
          </ListBox>
        </Popover>
      </ComboBox>
      <div>{judge?.preference}</div>
    </div>
  );
}
