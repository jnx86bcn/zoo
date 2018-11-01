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

        this.state = {
            animal: new AnimalModel
        }

        //this.OnChangeField.bind(this);
    };    

    private OnChangeField(fieldName:string,target: any) {
        this.state.animal[fieldName].value = target.value;
        console.log(this.state.animal)
    }

    private AddNewAnimal(animal: AnimalModel) {
        this.props.AddItem_LS(animal);
    }

    public render() {

        return (
                <div>
                    <label >Animal name</label>
                    <input type="text" onChange={()=>this.OnChangeField("Name",event.target)} placeholder="animal name" />

                    <label >Kingdom</label>
                    <input type="text" onChange={()=>this.OnChangeField("Kingdom",event.target)} placeholder="Kingdom" />

                    <label >Class</label>
                    <input type="text" onChange={()=>this.OnChangeField("Class",event.target)} placeholder="Class" />

                    <label >Conservation status</label>
                    <input type="text" onChange={()=>this.OnChangeField("Conservation_status",event.target)} placeholder="Conservation status" />

                    <label >Region</label>
                    <input type="text" onChange={()=>this.OnChangeField("Region",event.target)} placeholder="Region" />

                    <button onClick={()=>this.AddNewAnimal(this.state.animal)} >Add animal</button>
                </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FormNewAnimal);