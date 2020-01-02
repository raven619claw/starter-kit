# starter-kit(WIP)

The no bullshit starter kit for React

1. webpack 4
2. Babel 7
3. React 16
4. Emotion 10
5. Rematch
6. ESLINT
7. Express
8. Storybook

TO RUN: `yarn start:dev:inspect`

Gotchas

1. When there is err in webpack build due to err in JS code and after fixing code the build runs parallel to server restart. Sometimes the server restarts before the build is completed which causes issues with rendering on client
   type and enter `rs` on the terminal to restart the server anf fix this issue
