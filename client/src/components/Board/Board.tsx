import React from 'react';

import { connect } from 'react-redux';
import { getAllAnimals } from '../../redux/actions';

import PropTypes from 'prop-types';

import { IBoardProps,IBoardState } from '.';

import { AnimalModel } from '../../models';

import { Item } from '../Item/Item';
import  FormNewAnimal from '../_FormNewAnimal/FormNewAnimal';


interface IConnectedDispatch {
    GetAllAnimals_LS: () => void;
}

interface IConnectedState {
    allAnimals_LS: Array<AnimalModel>;
}

function mapStateToProps(state: any): IConnectedState {
	return {
        allAnimals_LS: state.projectsReducer.animals
	};
}

//Map the actions to the properties of the Component.
const mapDispatchToProps = (dispatch: any): IConnectedDispatch => ({
	GetAllAnimals_LS: () => {
		dispatch(getAllAnimals());
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
            allAnimals: []
        }

    };    


    public static getDerivedStateFromProps(nextProps: IBoardProps & IConnectedState, prevState: IBoardState) {
 
        if (nextProps.allAnimals_LS != prevState.allAnimals) {
            return { allAnimals: nextProps.allAnimals_LS }
        }
    }
         

    public componentDidUpdate(prevProps: IBoardProps & IConnectedState, prevState:IBoardState) {
         
        if (prevProps.allAnimals_LS != prevState.allAnimals) {
            this.setState({allAnimals: prevProps.allAnimals_LS})
        }
    }


    public componentDidMount() {
        this.props.GetAllAnimals_LS();
    }


    private showItems(): JSX.Element {

        let arrayAuxallAnimals = this.state.allAnimals;

        let arrayAnimals = arrayAuxallAnimals.map((animalDB: any)=>{
            let animal: AnimalModel = new AnimalModel();
            animal = animal.fromMongoDB(animalDB);
            return  <Item animal={animal}/>
        });

        return (<div>{arrayAnimals}</div>)
    }


    public render() {

        return (
                <div>
                    {this.showItems()}
                    <button>Create a new animal</button>
                    <FormNewAnimal/>
                </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Board);