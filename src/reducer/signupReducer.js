export const intialState = {
  username: '',
  email: '',
  password: '',
  mobileNumber: "",
  errors: {},
}


export function signupReducer(state, action){
    switch (action.type) {
        case "UPDATE_FIELD":
            return {
                ...state,
                [action.field]: action.value
            }
        case "RESET_FORM":
            return intialState;

        case "SET_ERRORS":  
            return {
                ...state,
                errors: action.errors,
            }  
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}