import { useMachine } from "@xstate/react";
import { pokedexMachine } from "../stores/pokemonMachine";

type Props = {};

export const Pokedex = (props: Props) => {
  const [state, send] = useMachine(pokedexMachine);
  console.log("state.context", state.context);
  return (
    <main style={{ display: "flex" }}>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {state.context.pokemonList.map((poke) => (
          <li style={{ listStyle: "none" }}>
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
