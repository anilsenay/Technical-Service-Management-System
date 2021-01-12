import { useContext } from "react";

import { AppContext, AppContextDispatch } from "../contexts/app.context";

import md5 from "md5";

const globalHook = () => {
  const { globalState } = useContext(AppContext);
  const { globalDispatch } = useContext(AppContextDispatch);

  const useGlobalState = () => {
    return globalState;
  };

  const setLoggedUser = ({ username, password }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: md5(password) }),
    };
    fetch("http://localhost:5000/api/login", requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log(response);
        if (!response.ok) {
          const error = (data && data.error) || response.status;
          throw new Error(data.error);
        }
        console.log(data.user);
        if (response.ok && data.user) {
          globalDispatch({
            type: "SET_USER_ERROR",
            payload: null,
          });
          globalDispatch({
            type: "SET_LOGGED_USER",
            payload: data.user,
          });
        }
      })
      .catch((e) => {
        console.log(e.toString());
        globalDispatch({
          type: "SET_USER_ERROR",
          payload: e.toString(),
        });
      });
  };

  const logout = () => {
    globalDispatch({
      type: "SET_LOGGED_USER",
      payload: null,
    });
  }

  return {
    useGlobalState,
    setLoggedUser,
    logout,
  };
};



export default globalHook;
