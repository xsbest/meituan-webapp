import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import Container from '../index/Main/Container'
import store from './store'
ReactDom.render(
  <Provider store={store}>
    <Container/>
  </Provider>,
  document.getElementById('root')
)