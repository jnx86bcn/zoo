import React from 'react';
import PropTypes from 'prop-types';
import { ICardProps,ICardState } from '.';

import '../../../branding/styles/main';

export class Card extends React.Component<ICardProps, ICardState> {

    static contextTypes = {
        t: PropTypes.func.isRequired
    }

    constructor(props) {

        super(props);        

    };    

    public render() {

        return (
                <div className="Card">
                   <label>{this.props.animal.Name.value}</label>
                   <picture>
                        <img src={this.props.animal.UrlPhoto.value}/>
                   </picture>
                   <label>{this.props.animal.ShortInfo.value}</label>
                </div>
        )
    }
}

export default (Card)