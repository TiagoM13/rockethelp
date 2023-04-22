import React from "react";
import { VStack } from "native-base";

import { Header } from "@app/components/Header";
import { Input } from "@app/components/Input";
import { Button } from "@app/components/Button";

const Register = () => {
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input placeholder="Número do patrimônio" mt={4} />

      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
      />

      <Button title="Cadastrar" mt={5} />
    </VStack>
  );
};

export default Register;
