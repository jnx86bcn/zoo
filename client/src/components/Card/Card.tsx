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

        const style = {
            backgroundImage: "url("+this.props.animal.UrlPhoto.value+")",
            backgroundSize: "100% 100%"
        }

        return (
                <div className="Card shadow_card">
                   <div className = "Card_header">
                        <div className = "Card_header_col1">
                            <label> {this.props.animal.Name.value} </label>
                        </div>
                        <div className = "Card_header_col2">
                            <picture>
                                <img src="files/img/star.svg" alt=""/>
                            </picture>
                        </div>
                    </div>
                    <div style = {style} className = "Card_picture"/>
                    <div className = "Card_footer">
                        <div className = "Card_footer_col1">
                            <p>{this.props.animal.ShortInfo.value}</p>
                        </div>
                        <div className = "Card_footer_col2">
                            <picture>
                                <img src="files/img/heart.svg" alt=""/>
                            </picture>
                            <label>{this.props.animal.Likes.value}</label>
                        </div>
                    </div>
                </div>
        )
    }
}

export default (Card)