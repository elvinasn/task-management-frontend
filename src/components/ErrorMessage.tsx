import { Text } from "@chakra-ui/react";

interface ErrorMessageProps {
  error: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  const errorMessages = error?.split(",");

  if (!errorMessages) {
    return null;
  }

  return (
    <>
      {errorMessages?.map((message) => (
        <Text key={message} color="red.500" mt="8px">
          {message}
        </Text>
      ))}
    </>
  );
};
