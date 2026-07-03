// Peer-to-peer online games, no game server to maintain. Trystero performs
// matchmaking over public nostr relays: the relays only carry the WebRTC
// handshake, after which moves flow directly between the two browsers.
import { joinRoom, getRelaySockets } from "trystero/nostr";

// Namespaces our rooms on the shared public relays so a room code here can't
// collide with another trystero app using the same code.
const APP_ID = "nkorobkov-virus-war";
const ROOM_URL_PARAM = "room";

export function generateRoomId() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function isValidRoomId(roomId) {
  return /^\d{4}$/.test(roomId || "");
}

// Wraps a trystero room, exposing only what the game needs. Senders take
// (data, targetPeerId), receivers are called with (data, senderPeerId).
// Trystero caps action names at 12 bytes.
export function connectToRoom(roomId) {
  const room = joinRoom({ appId: APP_ID }, roomId);
  const move = room.makeAction("move");
  const restart = room.makeAction("restart");
  const sync = room.makeAction("sync");
  const sender = (action) => (data, target) => action.send(data, { target });
  const receiver = (action) => (handler) => {
    action.onMessage = (data, { peerId }) => handler(data, peerId);
  };
  return {
    onPeerJoin: (handler) => {
      room.onPeerJoin = handler;
    },
    onPeerLeave: (handler) => {
      room.onPeerLeave = handler;
    },
    leave: () => room.leave(),
    sendMove: sender(move),
    onMove: receiver(move),
    sendRestart: sender(restart),
    onRestart: receiver(restart),
    sendSync: sender(sync),
    onSync: receiver(sync),
  };
}

// True while at least one matchmaking relay websocket is open. Relays are
// only needed to discover the opponent; once the WebRTC connection is up the
// game keeps working even if all relays drop.
export function isSignalingConnected() {
  return Object.values(getRelaySockets()).some(
    (socket) => socket.readyState === WebSocket.OPEN
  );
}

export function getInviteLink(roomId) {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set(ROOM_URL_PARAM, roomId);
  return url.toString();
}

export function getRoomIdFromUrl() {
  const roomId = new URLSearchParams(window.location.search).get(
    ROOM_URL_PARAM
  );
  return isValidRoomId(roomId) ? roomId : null;
}

// The room lives in the URL and the team + board in sessionStorage so a page
// reload mid-game reconnects to the same room instead of dropping to the
// menu. sessionStorage is per-tab, so two players testing in one browser
// don't overwrite each other, and a shared invite link never carries the
// sender's team.
export function setRoomIdInUrl(roomId) {
  const url = new URL(window.location.href);
  url.searchParams.set(ROOM_URL_PARAM, roomId);
  window.history.replaceState(null, "", url);
}

export function clearRoomIdFromUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete(ROOM_URL_PARAM);
  window.history.replaceState(null, "", url);
}

export function rememberTeam(roomId, team) {
  sessionStorage.setItem("team-" + roomId, String(team));
}

export function recallTeam(roomId) {
  const team = sessionStorage.getItem("team-" + roomId);
  return team === null ? null : Number(team);
}

export function saveGameState(roomId, state) {
  sessionStorage.setItem("game-" + roomId, JSON.stringify(state));
}

export function loadGameState(roomId) {
  try {
    return JSON.parse(sessionStorage.getItem("game-" + roomId));
  } catch {
    return null;
  }
}

export function clearGameState(roomId) {
  sessionStorage.removeItem("game-" + roomId);
}
