"use strict";

import { createApp } from "./index.js";

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();
        router.push(context.url);

        const matchedComponents = router.getMatchedComponents();
        if (!matchedComponents.length) {
            resolve({ code: 404 });
        }

        context.state = store.state;
        resolve(app);

        // Promise.all(
        //     matchedComponents.map(Component => {
        //         if (Component.asyncData) {
        //             return Component.asyncData({
        //                 store
        //             });
        //         }
        //     })
        // ).then(() => {
        //     context.state = store.state;
        //     resolve(app);
        // }).catch(()=>{
        //     reject()
        // })
    });
};
