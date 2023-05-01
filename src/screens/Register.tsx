import React from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import { Header } from "@app/components/Header";
import { Input } from "@app/components/Input";
import { Button } from "@app/components/Button";

const Register = () => {
  const [isLoading, setIsLoanding] = React.useState(false);
  const [patrimony, setPatrimony] = React.useState("");
  const [description, setDescription] = React.useState("");

  const navigation = useNavigation();

  const handleNewOrderRegister = () => {
    if (!patrimony || !description) {
      return Alert.alert("Registrar", "Preencha todos os campos.");
    }

    setIsLoanding(true);

    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: new Date("pt-BR"),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoanding(false);
        return Alert.alert(
          "Solicitação",
          "Não foi possível registrar o pedido"
        );
      });
  };

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  );
};

export default Register;
