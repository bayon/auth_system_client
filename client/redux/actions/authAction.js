export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

//const BASE_URL = "http://localhost:3000/api";
const BASE_URL = "https://nameless-refuge-42185.herokuapp.com";

export const registerUser = (authData) => {
  const { fullName, email, password } = authData;
  return async (dispatch) => {
    //benefit: can now make async http request to Register
    const result = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    const resultData = await result.json();
    if (resultData.success){
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: resultData,
          });
    } else {
        dispatch({
            type: REGISTER_USER_FAIL,
          });
    }
   
    return resultData;

  };
};

export const loginUser = (authData) => {
  const { email, password } = authData;
  return async (dispatch) => {
    //benefit: can now make async http request to Login
    const result = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const resultData = await result.json();
      if(resultData.success){
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: resultData,
          });
      } else {
        dispatch({
            type: LOGIN_USER_FAIL,
          });
      }
      return resultData; //Why?:  so that we have access to it in the dispatch to the action from loginScreen.
    //
    
  };
};
