# Virus War Frontend

Front end part of Virus War Game.    
Deployed and working at https://viruswar.nkorobkov.com

Powered by React, Bulma, and Vite.  

Play-with-AI runs fully client-side: `src/engine/` is a JS port of the
[virus-game](https://github.com/nkorobkov/virus-game) engine (move generation
plus the FastMiniMax alpha-beta search), executed in a web worker, so the AI
works on the statically hosted page without any server. A backend is only
needed for the online (play with a friend) mode.

[Backend](https://github.com/nkorobkov/virus-game)  
[Project Description](https://nkorobkov.github.io/projects/virus)

## Development

Requires Node.js 20+.

```bash
npm install      # install dependencies
npm start        # start the dev server (Vite)
npm test         # run the test suite (Vitest)
npm run build    # production build into build/
npm run deploy   # build and publish to GitHub Pages
```

Optional runtime configuration is read from `REACT_APP_*` environment
variables (e.g. an `.env.local` file); see `src/utils/constants.js`.



