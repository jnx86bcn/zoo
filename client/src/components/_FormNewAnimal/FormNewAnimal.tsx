import React from 'react';

import { connect } from 'react-redux';
import { addNewAnimal } from '../../redux/actions';

import PropTypes from 'prop-types';

import { INewFormAnimalState } from '.';

import { AnimalModel } from '../../models';


interface IConnectedDispatch {
    AddItem_LS: (item: AnimalModel) => void;
}

interface IConnectedState {
    AddItem_LS: AnimalModel;
}

function mapStateToProps(state: any): IConnectedState {
	return {
        AddItem_LS: state.projectsReducer.animal
	};
}

//Map the actions to the properties of the Component.
const mapDispatchToProps = (dispatch: any): IConnectedDispatch => ({
    AddItem_LS: (animal: AnimalModel) => {
		dispatch(addNewAnimal(animal));
	}
});

class FormNewAnimal extends React.Component<IConnectedDispatch,INewFormAnimalState> {

    //Add ContextTypes
	static contextTypes = {
		t: PropTypes.func.isRequired
	}


    constructor(props) {

        super(props);

    };    

    private AddItem() {
        let animal = new AnimalModel();
        this.props.AddItem_LS(animal);
    }

    public render() {

        return (
                <div>
                    <label >Animal name</label>
                    <input type="text" placeholder="animal name" />

                    <label >Kingdom</label>
                    <input type="text" placeholder="Kingdom" />

                    <label >Class</label>
                    <input type="text" placeholder="Class" />

                    <label >Conservation status</label>
                    <input type="text" placeholder="Conservation status" />

                    <label >Region</label>
                    <input type="text" placeholder="Region" />

                    <button>Add animal</button>
                </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FormNewAnimal);