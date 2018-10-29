import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IBoardProps,IBoardState } from '.';
import { AnimalModel } from '../../models';
import { getAllItems, addItem } from '../../redux/actions';

interface IConnectedDispatch {
    GetAllItems_LS: () => void;
    AddItem_LS: (item: AnimalModel) => void;
}

interface IConnectedState {
    allItems_LS: Array<AnimalModel>;
    AddItem_LS: AnimalModel;
}

function mapStateToProps(state: any, ownProps: IBoardProps): IConnectedState {
	return {
        allItems_LS: state.projectsReducer.items,
        AddItem_LS: state.projectsReducer.item,
	};
}

//Map the actions to the properties of the Component.
const mapDispatchToProps = (dispatch: any): IConnectedDispatch => ({
	GetAllItems_LS: () => {
		dispatch(getAllItems());
    },
    AddItem_LS: (item: AnimalModel) => {
		dispatch(addItem(item));
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


    public componentDidMount() {
        this.props.GetAllItems_LS();
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

    private addNewAnimal() {
        let animal = new AnimalModel();
        console.log(animal);
        this.props.AddItem_LS(animal);
    }


    public render() {

        return (
                <div>
                   { /*this.showItems()*/ }
                   <button onClick={()=>this.addNewAnimal()}>add animal</button>
                </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Board);