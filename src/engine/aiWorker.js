// Web worker entry point: runs the AI search off the main thread so multi-
// second searches don't freeze the UI. Speaks the same message shape the
// websocket AI backend used: receives the game state, replies with
// {type: "move", move: [[h, w], ...]}.
import { getAiMove } from "./aiPolicies";

self.onmessage = (event) => {
  const { field, sizeH, sizeW, toMove, aiType } = event.data;
  const move = getAiMove({ field, sizeH, sizeW, toMove }, aiType);
  self.postMessage({ type: "move", move });
};
