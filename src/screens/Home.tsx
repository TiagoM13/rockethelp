import React from "react";
import { ChatTeardropText, SignOut } from "phosphor-react-native";
import {
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useTheme,
  FlatList,
  Center,
} from "native-base";

import Logo from "@app/assets/logo_secondary.svg";
import { Filter } from "@app/components/Filter";
import { Order } from "@app/components/Order";
import { OrderProps } from "@app/entities/order";
import { Button } from "@app/components/Button";

const Home = () => {
  const [statusSelected, setStatusSelected] = React.useState<"open" | "closed">(
    "open"
  );
  const [orders, setOrders] = React.useState<OrderProps[]>([]);
  const { colors } = useTheme();

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={"12"}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Meus chamados</Heading>

          <Text color="gray.200">3</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected == "open"}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected == "closed"}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Order data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />;
              <Text color="gray.300" fontSize="xl" textAlign="center" mt={4}>
                Você ainda não possui {"\n"}
                solicitações{" "}
                {statusSelected === "open" ? "em andamento" : "finalizadas"}
              </Text>
            </Center>
          )}
        />

        <Button title="Nova Solicitação" />
      </VStack>
    </VStack>
  );
};

export default Home;