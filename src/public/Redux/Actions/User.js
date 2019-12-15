import axios from 'axios';

export const getEngineer = (username) => {
  console.log('masuk Engineer')
  return {
    type: 'GET_USER',
    payload: axios.get('http://192.168.1.18:4000/engineer/' + username)
  }
}

export const getCompany = (username) => {
  console.log('masuk company')
  return {
    type: 'GET_USER',
    payload: axios.get('http://192.168.1.18:4000/company/' + username)
  }
}

export const getEngineer2 = (username) => {

  return async (dispatch) => {
    try {
      dispatch({
        type: 'GET_USER_PENDING'
      })

      const getData = await axios.get('http://192.168.1.18:4000/engineer/' + username)

      if (getData) {
        dispatch({
          type: 'GET_USER_FULFILLED',
          payload: getData
        })
        return getData
      } else {
        console.log(error)
      }

    } catch (error) {
      dispatch({
        type: "GET_USER_REJECTED",
        payload: error.data
      });
      return error;
    }
  }
}

export const getCompany2 = (username) => {

  return async (dispatch) => {
    try {
      dispatch({
        type: 'GET_USER_PENDING'
      })

      const getData = await axios.get('http://192.168.1.18:4000/company/' + username)

      if (getData) {
        dispatch({
          type: 'GET_USER_FULFILLED',
          payload: getData
        })
        return getData
      } else {
        console.log(error)
      }

    } catch (error) {
      dispatch({
        type: "GET_USER_REJECTED",
        payload: error.data
      });
      return error;
    }
  }
}
