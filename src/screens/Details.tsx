import React from "react";
import { VStack, Text, useTheme, HStack, ScrollView } from "native-base";
import firestore from "@react-native-firebase/firestore";

import { Header } from "@app/components/Header";
import { useRoute } from "@react-navigation/native";
import { OrderProps } from "@app/entities/order";
import { OrderFirestoreDTO } from "@app/DTOs/OrderFirestoreDTO";
import { dateFormat } from "@app/utils/firestoreDateFormat";
import {
  CircleWavyCheck,
  Clipboard,
  DesktopTower,
  Hourglass,
} from "phosphor-react-native";
import { CardDetails } from "@app/components/CardDetails";
import { Input } from "@app/components/Input";
import { Button } from "@app/components/Button";
import { Loading } from "@app/components/Loading";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

const Details = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [solution, setSolution] = React.useState("");
  const [order, setOrder] = React.useState<OrderDetails>({} as OrderDetails);

  const { colors } = useTheme();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  React.useEffect(() => {
    firestore()
      .collection("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data() as OrderFirestoreDTO;

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="solicitação" />

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase"
        >
          {order.status === "closed" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />

        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={Clipboard}
        />

        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          <Input
            placeholder="Descrição da solução"
            onChangeText={setSolution}
            textAlignVertical="top"
            multiline
            h={24}
          />
        </CardDetails>
      </ScrollView>

      {order.status === "open" && <Button title="Encerrar solicitação" m={5} />}
    </VStack>
  );
};

export default Details;
