import React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PropTypes from 'prop-types';
import { IItemProps,IItemState } from '.';
import { Services } from '../../services/Services';


export class Item extends React.Component<IItemProps, IItemState> {

    static contextTypes = {
        t: PropTypes.func.isRequired
    }

    constructor(props) {

        super(props);        

    };    

    public render() {

        return (
                <div>
                   <label>{this.props.Item.Name}</label>
                   <label>{this.props.Item.Kingdom}</label>
                   <label>{this.props.Item.ConservationStatus}</label>
                   <label>{this.props.Item.Class}</label>
                   <label>{this.props.Item.Region}</label>
                </div>
        )
    }
}

export default (Item)