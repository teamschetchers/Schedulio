import {
  SIGNIN_SUCCESS,
  SIGNOUT,
  ALL_SERVICES_SUCCESS,
  CREATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_SUCCESS,
  DELETE_EVENT_SUCCESS,
  UPDATE_SUCCESS,
  LOGIN_GOOGLE_SUCCESS,
  SIGNUP_SUCCESS,
  CREATE_BOOKING_SUCCESS,
  ALL_USERBOOKINGS_SUCCESS,
  ALL_ADMIN_BOOKING_SUCCESS,
  UPDATE_BOOKING_STATUS_SUCCESS,
  ALL_BOOKING_SERVICE_SUCCESS,
  ALL_BOOKING_SUCCESS,
  COMPLETE_BOOKING_SUCCESS,
} from "./admin.constants";

export const AdminReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SUCCESS:
      return { ...state, success: false };
    case CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        success: true,
        createdService: action.payload.service,
      };
    case CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case ALL_USERBOOKINGS_SUCCESS:
      return {
        ...state,
        success: true,
        bookings: action.payload,
      };

    case ALL_ADMIN_BOOKING_SUCCESS:
      return {
        ...state,
        success: true,
        allBookings: action.payload,
      };
    case ALL_BOOKING_SUCCESS:
      return {
        ...state,
        success: true,
        allBooking: action.payload,
      };
    case UPDATE_BOOKING_STATUS_SUCCESS:
      return {
        ...state,
        success: true,
        allBookings: action.payload,
      };
    case ALL_BOOKING_SERVICE_SUCCESS:
      return {
        ...state,
        success: true,
        slots: action.payload,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        success: true,
        events: action.payload.events,
      };
    case UPDATE_SERVICE_SUCCESS:
      return {
        ...state,
        success: true,
      };
    case ALL_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload,
      };
    case COMPLETE_BOOKING_SUCCESS: {
      return {
        ...state,
        success: true,
        allBooking: action.payload,
      };
    }

    default:
      return state;
  }
};

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        success: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        success: true,
      };
    case LOGIN_GOOGLE_SUCCESS:
      return {
        loading: false,
        ...state,
        userInfo: action.payload,
      };
    case SIGNOUT:
      return {};
    default:
      return state;
  }
};
