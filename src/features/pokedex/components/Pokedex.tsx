import { useMachine } from "@xstate/react";
import { pokedexMachine } from "../stores/pokemonMachine";

type Props = {};

export const Pokedex = (props: Props) => {
  const [state, send] = useMachine(pokedexMachine);
  return <div>{JSON.stringify(state, null, 2)}</div>;
};
