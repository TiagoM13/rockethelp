import React from "react";
import { VStack } from "native-base";

import { Header } from "@app/components/Header";

const Details = () => {
  return (
    <VStack flex={1} bg="gray.700">
      <Header title="solicitação" />
    </VStack>
  );
};

export default Details;
