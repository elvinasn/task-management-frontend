import { Flex, Input, VStack } from "@chakra-ui/react";
import { HTMLInputTypeAttribute } from "react";
import { Field } from "./ui/field";

type Props = {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  helperText?: string;
  error?: string;
  touched?: boolean;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
};

const TextInput = (props: Props) => {
  if (props.type === "date") {
    console.log("value", props.value);
  }
  return (
    <VStack alignItems="start" gap="20px" alignSelf="stretch" flex="1">
      <Flex gap="2px" flexDirection="column" alignSelf="stretch">
        <Field
          label={props.label}
          errorText={props.touched && props.error ? props.error : undefined}
          invalid={props.touched && !!props.error}
          required={props.required}
        >
          <Input
            type={props.type || "text"}
            disabled={props.disabled}
            placeholder={props.placeholder}
            border={`2px solid gray[100]`}
            _focus={{
              border: `2px solid black`,
              boxShadow: "none",
            }}
            value={props.value}
            onChange={props.onChange}
            px="20px"
            h="54px"
            fontStyle="base"
            fontWeight="600"
            id={props.id}
          />
        </Field>
      </Flex>
    </VStack>
  );
};

export default TextInput;
