import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IBoardProps,IBoardState } from '.';
import { AnimalModel } from '../../models';
import { getAllItems } from '../../redux/actions';

interface IConnectedDispatch {
	GetAllItems_LS: () => void;
}

interface IConnectedState {
	allItems_LS: Array<AnimalModel>;
}

function mapStateToProps(state: any, ownProps: IBoardProps): IConnectedState {
	return {
		allItems_LS: state.projectsReducer.items,
	};
}

//Map the actions to the properties of the Component.
const mapDispatchToProps = (dispatch: any): IConnectedDispatch => ({
	GetAllItems_LS: () => {
		dispatch(getAllItems());
	}
});

class Board extends React.Component<IBoardProps & IConnectedState & IConnectedDispatch, IBoardState> {

    //Add ContextTypes
	static contextTypes = {
		t: PropTypes.func.isRequired
	}

    constructor(props) {

        super(props);

        this.state = {
            allItems: []
        }

    };    

    public static getDerivedStateFromProps(nextProps: IBoardProps & IConnectedState, prevState: IBoardState) {
 
        if (nextProps.allItems_LS != prevState.allItems) {
            return { allItems: nextProps.allItems_LS }
        }
    }
         
    public componentDidUpdate(prevProps: IBoardProps & IConnectedState, prevState:IBoardState) {
         
        if (prevProps.allItems_LS != prevState.allItems) {
            this.setState({allItems: prevProps.allItems_LS})
        }
    }


    private showItems(): JSX.Element {

        let arrayAuxItem = []

        for(var i = 0; i<10;i++){
            arrayAuxItem.push(i);
        }

        let arrayItem = arrayAuxItem.map(()=>{
            return  <div>Hola</div>
        });

        return (<div>{arrayItem}</div>)
    }


    public render() {

        return (
                <div>
                   { this.showItems() }    
                </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Board);