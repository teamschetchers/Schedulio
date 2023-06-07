import axios from "axios";

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
  ALL_ADMIN_BOOKING_SUCCESS,
  ALL_USERBOOKINGS_SUCCESS,
  UPDATE_BOOKING_STATUS_SUCCESS,
  ALL_BOOKING_SERVICE_SUCCESS,
  ALL_BOOKING_SUCCESS,
  COMPLETE_BOOKING_SUCCESS,
} from "./admin.constants";

import { toast } from "react-toastify";

const API_URL = "http://localhost:5000";

export const register = (name, email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/admin/register`, {
      name,
      email,
      password,
    });
    dispatch({ type: SIGNUP_SUCCESS, payload: data });

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("loginGoogle", error);
  }
};

export const signin = (email, password, navigate) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/admin/signin`, {
      email,
      password,
    });
    dispatch({ type: SIGNIN_SUCCESS, payload: data });

    if (data && data?.role === "admin") {
      navigate("/admin");
    } else if (data) {
      navigate("/");
    }

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("loginGoogle", error);
  }
};

export const loginGoogle = (response) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/admin/logingoogle`, {
      response,
    });
    dispatch({ type: LOGIN_GOOGLE_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log("loginGoogle", error);
  }
};

export const createNewService =
  (title, location, startTime, endTime, service, file, navigate) =>
  async (dispatch) => {
    const formData = new FormData();

    formData.append("media", file);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("service", service);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/admin/createService`,
        formData
      );
      dispatch({ type: CREATE_SERVICE_SUCCESS, payload: data });
      toast.success("Service Created Successfully", {
        autoClose: 3000,
      });
      navigate("/admin");
    } catch (error) {
      console.log("createNewService", error);
    }
  };

export const editService =
  (title, location, startTime, endTime, service, file, id, navigate) =>
  async (dispatch) => {
    const formData = new FormData();

    formData.append("media", file);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("service", service);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/admin/updateService/${id}`,
        formData
      );
      dispatch({ type: UPDATE_SERVICE_SUCCESS, payload: data });
      toast.success("Service Updated Successfully", {
        autoClose: 3000,
      });
      navigate("/admin");
    } catch (error) {
      console.log("createNewService", error);
    }
  };

export const createBooking =
  (userId, serviceId, startTime, endTime) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/user/createBooking`, {
        userId,
        serviceId,
        startTime,
        endTime,
      });
      dispatch({ type: CREATE_BOOKING_SUCCESS, payload: data });
      toast.success("Booking Created Successfully", {
        autoClose: 3000,
      });
    } catch (error) {
      console.log("createBooking", error);
    }
  };

export const getAllServices = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/admin/services`);
    dispatch({ type: ALL_SERVICES_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllServices", error);
  }
};

export const getAllUserBookings = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/user/bookings/${id}`);
    dispatch({ type: ALL_USERBOOKINGS_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllUserBookings", error);
  }
};
export const getAllAdminBookings = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/admin/bookings`);
    dispatch({ type: ALL_ADMIN_BOOKING_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllUserBookings", error);
  }
};

export const getAllBookings = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/admin/allbookings`);
    dispatch({ type: ALL_BOOKING_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllUserBookings", error);
  }
};

export const updateStatus = (serviceId, status) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/admin/updateStatus`, {
      serviceId,
      status,
    });
    dispatch({ type: UPDATE_BOOKING_STATUS_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllUserBookings", error);
  }
};

export const bookedSlots = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/api/admin/allbookingsofservice/${id}`
    );
    dispatch({ type: ALL_BOOKING_SERVICE_SUCCESS, payload: data });
  } catch (error) {
    console.log("getAllUserBookings", error);
  }
};

export const completeStatus = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/api/admin/completeStatus/${id}`
    );
    dispatch({ type: COMPLETE_BOOKING_SUCCESS, payload: data });
  } catch (error) {
    console.log("completeStatus", error);
  }
};

export const updateSuccess = () => async (dispatch) => {
  dispatch({
    type: UPDATE_SUCCESS,
    payload: false,
  });
};

export const deleteEvent = (eventId, id) => async (dispatch, getState) => {
  try {
    const {
      login: { userInfo },
    } = getState();
    const { data } = await axios.post(
      `${API_URL}/api/admin/delete/${id}`,
      {
        eventId: eventId,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.user.token}` },
      }
    );
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: data });
  } catch (error) {
    console.log("deleteEvent", error);
  }
};

export const signout = () => async (dispatch) => {
  try {
    localStorage.clear();
    window.location.href = "/auth";
    dispatch({ type: SIGNOUT });
  } catch (error) {
    console.log("signout Error", error);
  }
};
