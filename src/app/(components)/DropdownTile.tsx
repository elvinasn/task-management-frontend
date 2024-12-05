import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { ChangeEventHandler } from "react";
import { Field } from "@/components/ui/field";
import { createListCollection } from "@chakra-ui/react";

type Props = {
  id: string;
  label?: string;
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  helperText?: string;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
};
const DropdownTile = (props: Props) => {
  const collection = createListCollection({
    items: props.options,
  });
  return (
    <Field label={props.label} w="full">
      <SelectRoot
        zIndex={30000}
        name={props.id}
        w="full"
        value={props.value ? [props.value] : []}
        onValueChange={(e) => {
          props.onChange({
            target: {
              name: props.id,
              value: e.value[0],
            },
          } as any);
        }}
        collection={collection}
      >
        <SelectTrigger>
          <SelectValueText placeholder={props.placeholder ?? "Select"} />
        </SelectTrigger>
        <SelectContent zIndex={3000}>
          {collection.items.map((col) => (
            <SelectItem item={col} key={col.value} zIndex={30000}>
              {col.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Field>
  );
};

export default DropdownTile;
