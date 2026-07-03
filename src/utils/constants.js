// The AI runs fully client-side (src/engine, in a web worker), so it needs no
// server and is always available.
export const EASY_AI_ENABLED = true;
export const MEDIUM_AI_ENABLED = true;
export const HARD_AI_ENABLED = true;

// Online games are peer-to-peer over WebRTC (src/utils/p2p.js), so they also
// need no server and are always available.
export const ONLINE_MODE_ENABLED = true;

export const ANY_AI_ENABLED =
  EASY_AI_ENABLED || MEDIUM_AI_ENABLED || HARD_AI_ENABLED;
