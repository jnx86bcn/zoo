import React from 'react';

import { connect } from 'react-redux';
import { getAllAnimals, setOpenFormAddNewAnimal } from '../../redux/actions';

import PropTypes from 'prop-types';

import { IBoardProps,IBoardState } from '.';

import { AnimalModel } from '../../models';

import { Card } from '../Card/Card';
import  FormNewAnimal from '../_FormNewAnimal/FormNewAnimal';

import '../../../branding/styles/main';


interface IConnectedDispatch {
    GetAllAnimals_LS: () => void;
    SetOpenFormAddNewAnimal_LS:(open: boolean) => void;
}

interface IConnectedState {
    allAnimals_LS: Array<AnimalModel>;
    OpenFromAddNewAnimal_LS: boolean;
}

function mapStateToProps(state: any): IConnectedState {
	return {
        allAnimals_LS: state.projectsReducer.animals,
        OpenFromAddNewAnimal_LS: state.projectsReducer.openFormAddNewAnimal,
	}
}

//Map the actions to the properties of the Component.
const mapDispatchToProps = (dispatch: any): IConnectedDispatch => ({
	GetAllAnimals_LS: () => {
		dispatch(getAllAnimals());
    },
    SetOpenFormAddNewAnimal_LS: (openFormAddNewAnimal: boolean) => {
		dispatch(setOpenFormAddNewAnimal(openFormAddNewAnimal));
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

    }


    private openFormNewAnimal() {
        this.props.SetOpenFormAddNewAnimal_LS(true);
    }

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


    public render() {

        let arrayAuxallAnimals = this.state.allAnimals;

        let arrayAnimals = arrayAuxallAnimals.map((animalDB: any)=>{
            let animal: AnimalModel = new AnimalModel();
            animal = animal.fromMongoDB(animalDB);
            return  <Card animal={animal}/>
        });

        return (
                <div className = "Board shadow_board">
                    <div className="Board_btn shadow_btn" onClick = {()=>this.openFormNewAnimal()}/>
                    <div className="Board_grid">
                        {arrayAnimals}
                    </div>
                    <FormNewAnimal/>
                </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Board);