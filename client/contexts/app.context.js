import React, { useReducer } from "react";

import PropTypes from "prop-types";

import { globalReducer, globalInitialState } from "../reducers/global.reducer";

const AppContext = React.createContext();
const AppContextDispatch = React.createContext();

const AppProvider = ({ children }) => {
  const [globalState, globalDispatch] = useReducer(
    globalReducer,
    globalInitialState
  );

  return (
    <AppContext.Provider
      value={{
        globalState,
      }}
    >
      <AppContextDispatch.Provider
        value={{
          globalDispatch,
        }}
      >
        {children}
      </AppContextDispatch.Provider>
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider, AppContext, AppContextDispatch };
