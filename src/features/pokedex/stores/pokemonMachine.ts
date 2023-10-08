import { createMachine } from "xstate";
const pokedexMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BrSYAeA6MAtsgC4CeAxBKgHZi4CW1AbhnWphDvkWQoywGMAhsXo0A2gAYAulOmIUqWPVE0FIbIgDMARgDsuPQBZ9egGxmATJIAceyUYA0IUoh2SzuSQE4z3jzZakpI6ZoEAvuHO7Fh4hCQUYABOSahJuMgANiIAZmkEGayccTykfMyowqrUcnLqaMrV6poIAKyeWt6tWpYmrZY6Oq02ls6uCANGht6DIUbtRlp2NpHRRVwAFkKwAAqsBDQAMvSwxABiYMQCG2dC9JkArklg5ABKAKIAKq8AmgD6OwA8gBpd4AWUBADk-ocAJIAZU+fzOXwAwgAJOpIEANFRiajNRAAWks1lwvj0-hsRm8elmejGiAGWlwlhmPksrSMJj0enaqxx6zwW12+yOJ2I5Hh70O71RSKBoIhkKxika+MJbW83kM5j5rUkei0FkpjImklauHaQxsQ0sWlaBq0ApixQYsAuVw2jCg8J9mTAe0wB2olBodH4rEKHC4J091x9fuoUADQcINHKghE+NqMnqSjxamxLRsdlZdk6gSWWl0ZjNDstZmM3KMkk5HnmLqF7vj3uTSZTgbFoeSqXSWVy+WjsR7lwT-f9Q+DGcjVRzMlVgvVRdALU5NlwOmNLeMfhsrR09a6uE6Rj8t6b7RWUUFMeF2wHqeHvdu9yeLw+b5-nhWFIQAcVlAEQXBKFkTRTE82xXEmmLJlWgMVpvEsMJbAdfRBgZFxEC5HVbVsQJvBrO8IhfV1Ng-MAAwEYhIDTEMpRlOUFWg5VN2QjVUIQXlPFLUI70WSQa2NM0SNwMjS06KiwksSIX2oVBOHgJChXzbcCUEkkwnJJsqRpOl3CbM0iUtbVtUpWszBMc8zC7N9uASXTC303dECMUYiIQW0vEo3khi0GlQl5VyZxFNjxVOTyUJ8togpsYJ9Ek3pHL0GwzXcKZOg8dCtCNRYbG8aK3Vi4djlOH87keZ5EoE5KpgtO8m2wh1yvQ7x6x0KYzCPYY5kpAbKtjD05z7X1Fzi7yty8zV2gMfRvHPRYgjbHx63tQxTB5VtggsCb31geFGLAZjWOHZqdw0RBys8KwQj0Lr8MdM07x0XB5nsB1eWsOlnVo7sRU-Jd02oeq-ya7S9M1awCupOxugcEwdH88YjDew8Zi6IbyspalVPCIA */
  id: "pokedex",

  tsTypes: {} as import("./pokemonMachine.typegen").Typegen0,

  schema: {
    // context: {} as { list: [] },
    // events: {} as { type: "eventType" },
  },

  context: {
    list: [],
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
});
