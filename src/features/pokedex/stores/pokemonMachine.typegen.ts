// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    fetchPokemonList: "done.invoke.pokedex.empty:invocation[0]";
    fetchSinglePokemon: "done.invoke.pokedex.isFetchingSinglePokemon:invocation[0]";
  };
  missingImplementations: {
    actions: "setSelectedPokemonId";
    delays: never;
    guards: never;
    services: "fetchPokemonList" | "fetchSinglePokemon";
  };
  eventsCausingActions: {
    setSelectedPokemonId: "SELECT_POKEMON";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    fetchPokemonList: "RETRY_POKEMON_LIST_FETCH";
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
