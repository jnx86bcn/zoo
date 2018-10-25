import React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PropTypes from 'prop-types';
import { IItemProps,IItemState } from '.';
import { Services } from '../../services/Services';


class Item extends React.Component<IItemProps, IItemState> {

    static contextTypes = {
        t: PropTypes.func.isRequired
    }

    constructor(props) {

        super(props);        
        
        

    };    

    public render() {

        return (
                <div>
                   
                </div>
        )
    }
}

export default (Item)