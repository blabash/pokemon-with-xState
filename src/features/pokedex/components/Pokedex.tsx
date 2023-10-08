import { useMachine } from "@xstate/react";
import { pokedexMachine } from "../stores/pokemonMachine";
import { useInterpret } from "@xstate-ninja/react";

const POKEMON_PER_PAGE = 10;

type Props = {};

export const Pokedex = (props: Props) => {
  const service = useInterpret(pokedexMachine, { devTools: true });
  const [
    {
      context: { pokemonList, selectedPokemon, pageCount },
    },
    send,
  ] = useMachine(pokedexMachine);

  return (
    <main className="grid grid-cols-[minmax(auto,20%)_1fr] gap-3 w-[min(80%,800px)]">
      <ul className="flex flex-col gap-2">
        {pokemonList.map((poke) => (
          <li>
            <button
              className="w-full"
              onClick={() => send({ type: "SELECT_POKEMON", value: poke.id })}
            >
              {poke.name}
            </button>
          </li>
        ))}
        {[...Array(POKEMON_PER_PAGE - pokemonList.length)].map((_) => (
          <li aria-hidden={true} className="invisible">
            <button className="w-full">ditto</button>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-[1fr_2fr] place-items-center">
        {selectedPokemon && (
          <ul className="justify-self-start">
            {Object.entries(selectedPokemon).map(([key, val]) => (
              <li key={key}>
                <span className="font-black">{key}:</span>{" "}
                {Array.isArray(val) ? val.join(", ") : val}
              </li>
            ))}
          </ul>
        )}
        {selectedPokemon && (
          <img
            className="max-h-[500px] justify-self-center"
            src={`/pokemon/${selectedPokemon.id}.jpg`}
            alt={selectedPokemon.name}
          />
        )}
      </div>
      <footer className="col-span-2 flex gap-2 items-center">
        Page
        <nav>
          <ul className="flex gap-2">
            {[...Array(pageCount)].map((_, i) => (
              <li>
                <button onClick={() => send({ type: "SELECT_PAGE", value: i })}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </main>
  );
};
