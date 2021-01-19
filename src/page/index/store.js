import {createStore} from 'redux';

import mainReducer from './reducers/main';

const store = createStore(mainReducer);

//store热更新
if(module.hot){
  //如果这个文件又改动就热更新一下
  module.hot.accept('./reducers/main', ()=>{
    const nextRootReducer = require('./reducers/main').default;
    store.replaceReducer(nextRootReducer)
  })
}

export default store;