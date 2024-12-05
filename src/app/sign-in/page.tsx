"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/hooks/useAuth";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Route } from "@/types/enums/route";
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import TextInput from "@/components/TextInput";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignInPage = () => {
  const { login, error, isLoading } = useAuth();
  const router = useRouter();
  useAuthRedirect();

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
      <Button
        position="absolute"
        colorPalette="blue"
        top="10px"
        right="10px"
        onClick={() => {
          router.push("/");
        }}
      >
        Check demo
      </Button>
      <Container
        bg="white"
        maxW="md"
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius="15px"
      >
        <Stack gap="8">
          <Stack gap="6">
            <Stack gap={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>
                Log in to your account
              </Heading>
              <Text color="fg.muted">
                Don&apos;t have an account?{" "}
                <Link color="blue" as={NextLink} href={Route.SignUp}>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
          <Box>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={signInSchema}
              onSubmit={(values) => login(values)}
            >
              {({ values, handleChange, handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <Stack>
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
                      id="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      error={errors.password}
                      touched={touched.password}
                    />
                  </Stack>
                  <ErrorMessage error={error} />
                  <Flex justifyContent="center" mt="16px">
                    <Button
                      type="submit"
                      loading={isLoading}
                      w="100px"
                      colorPalette="blue"
                    >
                      Login
                    </Button>
                  </Flex>
                </form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default SignInPage;
