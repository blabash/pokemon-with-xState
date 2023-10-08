// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.pokedex.empty:invocation[0]": {
      type: "done.invoke.pokedex.empty:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.pokedex.isFetchingSinglePokemon:invocation[0]": {
      type: "done.invoke.pokedex.isFetchingSinglePokemon:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchPokemonList: "done.invoke.pokedex.empty:invocation[0]";
    fetchSinglePokemon: "done.invoke.pokedex.isFetchingSinglePokemon:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    setCurrentPage: "SELECT_PAGE";
    setPokemonList: "done.invoke.pokedex.empty:invocation[0]";
    setSelectedPokemon: "done.invoke.pokedex.isFetchingSinglePokemon:invocation[0]";
    setSelectedPokemonId: "SELECT_POKEMON";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    fetchPokemonList:
      | "RETRY_POKEMON_LIST_FETCH"
      | "SELECT_PAGE"
      | "xstate.init";
    fetchSinglePokemon: "RETRY_SINGLE_POKEMON_FETCH" | "SELECT_POKEMON";
  };
  matchesStates:
    | "empty"
    | "hasPokemonList"
    | "hasPokemonListFetchFailure"
    | "hasSelectedPokemon"
    | "hasSinglePokemonFetchFailure"
    | "isFetchingSinglePokemon";
  tags: never;
}
