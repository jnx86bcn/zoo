import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../../redux/store/store'

//i18n
import I18n from 'redux-i18n'
import { translations } from '../../translations/Translations'
import { setLanguage, setTranslations } from 'redux-i18n'

//Components
import Board from '../Board/Board';

const store = configureStore();

export class Main extends React.Component<{}, {}> {
    

    constructor(props) {
        super(props);

    }


    public componentDidMount() {
        store.dispatch(setLanguage("en"));
        store.dispatch(setTranslations(translations));
    }

    public render() {
        return (
            <Provider store={store} >
                <I18n translations={translations} useReducer={true}>
                    <Board/>
                </I18n>
            </Provider>
        )
    }

}