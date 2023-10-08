import { createMachine } from "xstate";
const pokedexMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BrSYAeA6MAtsgC4CeAxBKgHZi4CW1AbhnWphDvkWQoywGMAhsXo0A2gAYAulOmIUqWPVE0FIbIgDMARgDsuPQBZ9egGxmATJIAceyUYA0IUoh2SzuSQE4z3jzZakpI6ZoEAvuHO7Fh4hCQUYABOSahJuMgANiIAZmkEGayccTykfMyowqrUcnLqaMrV6poIAKyeWt6tWpYmrZY6Oq02ls6uCANGht6DIUbtRlp2NpHRRVwAFkKwAAqsBDQAMvSwxABiYMQCG2dC9JkArklg5ABKAKIAKq8AmgD6OwA8gBpd4AWUBADk-ocAJIAZU+fzOXwAwgAJOpIEANFRiajNRAAWks1lwvj0-hsRm8elmejGiAGWlwlhmPksrSMJj0enaqxx6zwW12+yOJ2I5Hh70O71RSKBoIhkKxika+MJbW83kM5j5rUkei0FkpjImklauHaQxsQ0sWlaBq0ApixQYsAuVw2jCg8J9mTAe0wB2olBodH4rEKHC4J091x9fuoUADQcINHKghE+NqMnqSjxamxLRsdlZdgddj0NjMulGLm0XVwnSMfhbZj5HZdQvd8e9yaTKcDYtDyVS6SyuXy0divcuCYH-uHwYzkaqOZkqsF6qLoBanJsuB0xu5RmMfhsrR0Zs6lvb3nbnZWUUFMeF20HqZHfdu9yeLw+b5-nhWFIQAcVlAEQXBKFkTRTE82xXEmmLJlWgMVpvEsMJbAdfRBgZBs2hpXBbVsQIHy0VsIhfV1Ng-MAAwEYhIDTEMpRlOUFWg5Ut2QjVUIQatDzpHRqQcMxBgIs1+gMWxMMkSxKW1ajIhfahUE4eAkKFfMdwJQSSTCckOypGlRI8QjxiJS1tW1SldAsExLzMbs324BI9MLAy90QIx63GW0vAfXkhiomYOz0NzZxFNjxVOLyUN8togpsYJ9EkHpWzPGwzXcKZOg8dCtCNRYbG8aK3VikdjlOH87keZ5EoE5KpgtVsO2wysulNIjdCmSTKzmSkdCMSrYw9ed+19Jc4p87dvM1doDH0bxL0WIJFJ8G97UMUweSMYIPFc2iexFeFGLAZjWJHZrdw0RBys8KwQj0Lr8MdM1Wx0XB5nsB1eWsOlnVO9zztm78pt-RqwDu+b9wcZtqTsboHBMHQAr8t6jxmLpJPKylqTU8IgA */
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
        onDone: "hasPokemonList",
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
        onDone: "hasSelectedPokemon",
        onError: "hasSinglePokemonFetchFailure",
      },
    },

    hasSelectedPokemon: {},
    hasSinglePokemonFetchFailure: {
      on: {
        RETRY_SINGLE_POKEMON_FETCH: "isFetchingSinglePokemon",
      },
    },
  },
});
