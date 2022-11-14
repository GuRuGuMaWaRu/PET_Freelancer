export const NOTIFICATION_DURATION = 4000;
export const API_URL =
  process.env.NODE_ENV === "test"
    ? "http://localhost/api/v1"
    : "http://localhost:3000/api/v1";
export const localStorageKey = "__FreelancerApp_token__";
export const usersKey = "__FreelancerApp_dev_users__";
