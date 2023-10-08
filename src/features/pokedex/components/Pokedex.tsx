import { useMachine } from "@xstate/react";
import { pokedexMachine } from "../stores/pokemonMachine";

type Props = {};

export const Pokedex = (props: Props) => {
  const [state, send] = useMachine(pokedexMachine);
  console.log("state.context", state.context);
  return (
    <main className="grid grid-cols-[auto_1fr] w-[min(80%,800px)]">
      <ul>
        {state.context.pokemonList.map((poke) => (
          <li>
            <button
              onClick={() => send({ type: "SELECT_POKEMON", value: poke.id })}
            >
              {poke.name}
            </button>
          </li>
        ))}
      </ul>
      <div>{JSON.stringify(state.context.selectedPokemon)}</div>
    </main>
  );
};
