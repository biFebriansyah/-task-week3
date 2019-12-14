export const logoutUser = () => {
    return async (dispatch, getState) => {
        const state = getState();
        console.log(state);

        try {
            dispatch({
                type: "USER_LOGGED_OUT_SUCCESS"
            });
        } catch (e) {
            console.log(e);
        }
    }
}