# Demo micro-fronted vertical approach with client-side routing

This demo project implements the micro-frontend concept using vertical approach which allows one micro-frontend per business domain, having the possibility of assign each one to a different team.

To route the micro-frontends you can do it on client-side or server-side. On this demo I use the client-side way in which the orchestrator app contains and loads the correct micro-frontend based on the route change.

When you start the project you will see an angular app. From the main menu, if you click on React of Vue tap, the specific micro-frontend will be loaded (react app or vue app). Each app contains an internal menu that use the framework routing navigation. Just when you go to other micro-frontend the orchestrator is called.

![alt text](https://github.com/yduartep/demo-v-microfronted-html-entrypoint/blob/main/micro-frontend-vertical-demo.gif)

## START

To start the project it's necessary to execute the command `npm start`.

then type in the browser the url: http://localhost:3000 to open the project.
