import { useMachine } from "@xstate/react";
import { pokedexMachine } from "../stores/pokemonMachine";

type Props = {};

export const Pokedex = (props: Props) => {
  const [state, send] = useMachine(pokedexMachine);
  console.log("state.context", state.context);
  return (
    <div>
      <ul>
        {state.context.pokemonList.map((poke) => (
          <li>{poke.name}</li>
        ))}
      </ul>
    </div>
  );
};
