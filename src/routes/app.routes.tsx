import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@app/screens/Home";
import Register from "@app/screens/Register";
import Details from "@app/screens/Details";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
    </Navigator>
  );
};
