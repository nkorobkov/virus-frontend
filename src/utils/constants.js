export const SERVER_URL = import.meta.env.REACT_APP_SERVER_URL;
export const USE_SSL = import.meta.env.REACT_APP_USE_SSL === "true";

export const EASY_AI_ENABLED = import.meta.env.REACT_APP_EASY_AI_ENABLED ?? false;
export const MEDIUM_AI_ENABLED =
  import.meta.env.REACT_APP_MEDIUM_AI_ENABLED ?? false;
export const HARD_AI_ENABLED = import.meta.env.REACT_APP_HARD_AI_ENABLED ?? false;
export const ONLINE_MODE_ENABLED =
  import.meta.env.REACT_APP_ONLINE_MODE_ENABLED ?? false;

export const ANY_AI_ENABLED =
  EASY_AI_ENABLED || MEDIUM_AI_ENABLED || HARD_AI_ENABLED;
