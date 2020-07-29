import React, { Component } from 'react';
import Main from './src/Components/App'
import { Provider } from "mobx-react";
import authStore from './src/stores/authStore';
import commonStore from './src/stores/commonStore';
const stores = {
  commonStore,
  authStore,
};


const App = () => (
    <Provider {...stores}>
        <Main/>
    </Provider>
    
)

 export default App;