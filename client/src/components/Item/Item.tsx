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
                   <label>{this.props.animal.Name.value}</label>
                   <picture>
                        <img src={this.props.animal.UrlPhoto.value}/>
                   </picture>
                   <label>{this.props.animal.Kingdom.value}</label>
                   <label>{this.props.animal.ConservationStatus.value}</label>
                   <label>{this.props.animal.Class.value}</label>
                   <label>{this.props.animal.Region.value}</label>
                   <label>{this.props.animal.ShortInfo.value}</label>
                   <label>{this.props.animal.LongInfo.value}</label>
                </div>
        )
    }
}

export default (Item)