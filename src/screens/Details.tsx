import React from "react";
import { VStack } from "native-base";

import { Header } from "@app/components/Header";

export function Details() {
  return (
    <VStack flex={1} bg="gray.700">
      <Header title="solicitação" />
    </VStack>
  );
}
