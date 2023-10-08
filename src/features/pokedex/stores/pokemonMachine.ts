import { createMachine } from "xstate";

type PokemonIdType = number;

type PokemonListItemType = {
  id: PokemonIdType;
  name: string;
};

type PokemonType = {
  id: PokemonIdType;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
};

type Context = {
  pokemonList: PokemonListItemType[];
  selectedPokemonId: PokemonIdType | null;
  selectedPokemon: PokemonType | null;
  currPage: number;
  pageCount: number;
};

type Events =
  | { type: "SELECT_POKEMON"; value: PokemonIdType }
  | { type: "RETRY_POKEMON_LIST_FETCH" }
  | { type: "RETRY_SINGLE_POKEMON_FETCH" }
  | { type: "SELECT_PAGE"; value: Context["currPage"] };

export const pokedexMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BrSYAeA6MAtsgC4CeAxBKgHZi4CW1AbhnWphDvkWQoywGMAhsXo0A2gAYAulOmIUqWPVE0FIbIgDMARgDsuPQBZ9egGxmATJIAceyUYA0IUoh2SzuSQE4z3jzZakpI6ZoEAvuHO7Fh4hCQUYABOSahJuMgANiIAZmkEGayccTykfMyowqrUcnLqaMrV6poIAKyeWt6tWpYmrZY6Oq02ls6uCANGht6DIUbtRlp2NpHRRVwAFkKwAAqsBDQAMvSwxOQAygCih5cAwgAqAPo7APIA0pcAsi8AcnVIIAaKjE1GaiFa3m8hnMelarUkei0Fj03jGiGsrVw7SGNiGli0cMkWlWgPWeC2u32RxOxAAYmBiAINrShPRMgBXJJgcgAJUu9x5AE1nu8vr9HocAJLnJ60-m3AAS-0UjRBYIQAFpLNZcL4UbYjN49LM9GiJjotLhLDMfJZWkYTHpYWYSTFigxYPTGRtGFBzr7MmA9pgDtRKDQ6PxWIUOFwTl6mb7-dQoIHg4QaOVBCIQbUZPUlMC1ACWjY7Fa7J1AkstLozGaCZizMYHUZJHaPPNXWSPQmfSnk6mg1Sw8lUuksrl8jHYr2GYmBwHhyHM1GqrmZMrSari6AWnabLgLWZW8Y-DZWjoG11cJ0jH47832isoqTY+TtucwIGBMRIOnQwua47ieV4Pm+P58wBIEmhLRAnU8MtQnvRYiVresXHBQ1cFxWxAm8Wt7xGbt31wClBzTEc+xZNlOW5PkBWFc5JR+ABxG4RXA8U5XuRUtxgtU4ImVoDAhSwwlsAl9EGU1MLabDcLLTpCLCYlXzdHAgJuB5ngAQVYy5+MLWC93gqFvAGGwLBse8enxDDxg1e1DHbExISdJE7B0SJX2oVBOHgaCyQLHdQSErUwl1Zt-Bso1ZmbM0NR0ExpjMaSjEREYhj0EjZ3iMgQqLMLTIQIxRjk3EvAIp0hi0Q1QidXL3QpADqVOQqTI0cFKpsYJ9CJXoTz0GwzXcKZOg8EStERRYbG8JrNm2VrqGOU5qNZDkuQ6wSSqmSR7WRcSCTmkTUTk3QpjS465hRZKFrweN537P0l2W7bdy6tpmyPFEL0WIJ2x8Bt8UMUxHTbYILHusjP2-MBf3-Ed3uKz65s8KwQj0I7pLhM17x0XB5nsAknWsY01LWUjyNeqinpozawGR9VrHGmy7G6BwTB0crxgyywjxmLo0rm36jB88IgA */
    id: "pokedex",

    tsTypes: {} as import("./pokemonMachine.typegen").Typegen0,

    schema: {
      context: {} as Context,
      events: {} as Events,
      services: {} as {
        fetchPokemonList: {
          data: PokemonListItemType[];
        };
        fetchSinglePokemon: {
          data: PokemonType;
        };
      },
    },

    context: {
      pokemonList: [],
      selectedPokemonId: null,
      selectedPokemon: null,
      currPage: 0,
      pageCount: 0,
    },

    states: {
      empty: {
        invoke: {
          src: "fetchPokemonList",
          onDone: {
            target: "hasPokemonList",
            actions: "setPokemonList",
          },
          onError: "hasPokemonListFetchFailure",
        },
      },

      hasPokemonList: {
        on: {
          SELECT_POKEMON: {
            target: "isFetchingSinglePokemon",
            actions: "setSelectedPokemonId",
          },
        },
      },

      hasPokemonListFetchFailure: {
        on: {
          RETRY_POKEMON_LIST_FETCH: "empty",
        },
      },

      isFetchingSinglePokemon: {
        invoke: {
          src: "fetchSinglePokemon",
          onDone: {
            target: "hasSelectedPokemon",
            actions: "setSelectedPokemon",
          },
          onError: "hasSinglePokemonFetchFailure",
        },
      },

      hasSelectedPokemon: {
        on: {
          SELECT_POKEMON: {
            target: "isFetchingSinglePokemon",
            actions: "setSelectedPokemonId",
          },
        },
      },

      hasSinglePokemonFetchFailure: {
        on: {
          RETRY_SINGLE_POKEMON_FETCH: "isFetchingSinglePokemon",
        },
      },
    },

    initial: "empty",

    on: {
      SELECT_PAGE: {
        target: ".empty",
        actions: "setCurrentPage",
      },
    },
  },
  {
    actions: {
      setSelectedPokemonId(context, event) {
        context.selectedPokemonId = event.value;
      },
      setSelectedPokemon(context, event) {
        context.selectedPokemon = event.data;
      },
      setPokemonList(context, event) {
        context.pokemonList = event.data;
      },
      setCurrentPage(context, event) {
        context.currPage = event.data;
      },
    },
    services: {
      fetchPokemonList: async (context): Promise<PokemonListItemType[]> =>
        fetch(`/pages/${context.currPage}.json`).then((res) => res.json()),
      fetchSinglePokemon: async (context): Promise<PokemonType> =>
        fetch(`/pokemon/${context.selectedPokemonId}.json`).then((res) =>
          res.json()
        ),
    },
  }
);
