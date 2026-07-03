// Provide a #root element in the jsdom test environment so that
// react-modal's `ReactModal.setAppElement("#root")` (invoked at module load
// time in Menu.js) can find an app element while tests run.
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);
