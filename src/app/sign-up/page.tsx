"use client";

import { Formik } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Route } from "@/types/enums/route";
import { Container, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { isValidEmail, validatePassword } from "@/utils/validation";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ErrorMessage";

const SignUpPage = () => {
  const { signUp, isLoading, error } = useAuth();
  useAuthRedirect();

  const validate = (values: {
    email: string;
    fullName: string;
    password: string;
    repeatPassword: string;
  }) => {
    const errors: { [key: string]: string } = {};
    if (!isValidEmail(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.fullName) {
      errors.fullName = "Full name is required";
    }

    const passwordValidation = validatePassword(values.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors.join(" ");
    }

    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = "Passwords must match";
    }

    return errors;
  };

  return (
    <Flex
      h="100vh"
      w="100vw"
      alignItems="center"
      justify="center"
      bgGradient="to-b"
      gradientFrom={"#082FFF"}
      gradientTo={"#2888CD"}
    >
      <Container
        bg="white"
        maxW="md"
        border="1px solid gray"
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius="15px"
      >
        <Stack gap="8">
          <Stack gap="6" align="center">
            <Stack gap="3" textAlign="center">
              <Heading size="xs">Create an account</Heading>
              <Text color="fg.muted">
                Already have an account?{" "}
                <Link color="blue" as={NextLink} href={Route.SignIn}>
                  Log in
                </Link>
              </Text>
            </Stack>
          </Stack>
          <Formik
            initialValues={{
              email: "",
              fullName: "",
              password: "",
              repeatPassword: "",
            }}
            validate={validate}
            onSubmit={(values) => {
              signUp({
                email: values.email,
                full_name: values.fullName,
                password: values.password,
                password_repeat: values.repeatPassword,
              });
            }}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <Stack gap="16px">
                  <TextInput
                    id="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                    touched={touched.email}
                  />
                  <TextInput
                    id="fullName"
                    label="Full name"
                    type="name"
                    value={values.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    touched={touched.fullName}
                  />
                  <TextInput
                    id="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                    touched={touched.password}
                  />
                  <TextInput
                    id="repeatPassword"
                    label="Repeat password"
                    type="password"
                    value={values.repeatPassword}
                    onChange={handleChange}
                    error={errors.repeatPassword}
                    touched={touched.repeatPassword}
                  />
                </Stack>
                <ErrorMessage error={error} />
                <Flex justifyContent="center">
                  <Button
                    type="submit"
                    loading={isLoading}
                    mt="24px"
                    w="150px"
                    colorPalette="blue"
                  >
                    Create Account
                  </Button>
                </Flex>
              </form>
            )}
          </Formik>
        </Stack>
      </Container>
    </Flex>
  );
};

export default SignUpPage;
