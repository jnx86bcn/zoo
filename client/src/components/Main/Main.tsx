import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../../redux/store/store'

//Props and State for Compoent

//Components
import Board from '../Board/Board';

const store = configureStore();

export class Main extends React.Component<{}, {}> {
    

    constructor(props) {
        super(props);

    }


    public render() {
        return (
            <Provider store={store} >
                <Board/>
            </Provider>
        )
    }

}