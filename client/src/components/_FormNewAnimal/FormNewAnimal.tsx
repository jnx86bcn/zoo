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
            animal: new AnimalModel()
        }
    };    

    private OnChangeField(fieldName:string,target: any) {
        let auxModel =this.state.animal;
        auxModel[fieldName].value = target.value;
        this.setState({
            animal: auxModel
        })
    }

    private AddNewAnimal(animal: AnimalModel) {
        this.props.AddItem_LS(animal);
        this.setState({animal: new AnimalModel()});
    }

    public render() {

        return (
                <div>
                    <label >Animal name</label>
                    <input type="text" onChange={()=>this.OnChangeField("Name",event.target)} placeholder="Name" value = {this.state.animal.Name.value}/>

                    <label >Link photo animal</label>
                    <input type="text" onChange={()=>this.OnChangeField("UrlPhoto",event.target)} placeholder="UrlPhoto" value = {this.state.animal.UrlPhoto.value}/>

                    <label >Kingdom</label>
                    <input type="text" onChange={()=>this.OnChangeField("Kingdom",event.target)} placeholder="Kingdom" value = {this.state.animal.Kingdom.value}/>

                    <label >Class</label>
                    <input type="text" onChange={()=>this.OnChangeField("Class",event.target)} placeholder="Class" value = {this.state.animal.Class.value}/>

                    <label >Conservation status</label>
                    <input type="text" onChange={()=>this.OnChangeField("ConservationStatus",event.target)} placeholder="Conservation status" value = {this.state.animal.ConservationStatus.value}/>

                    <label >Region</label>
                    <input type="text" onChange={()=>this.OnChangeField("Region",event.target)} placeholder="Region" value = {this.state.animal.Region.value}/>

                    <label >Short info</label>
                    <textarea placeholder="ShortInfo" onChange={()=>this.OnChangeField("ShortInfo",event.target)} value = {this.state.animal.ShortInfo.value}/>

                    <label >Long info</label>
                    <textarea placeholder="LongInfo" onChange={()=>this.OnChangeField("LongInfo",event.target)} value = {this.state.animal.LongInfo.value}/>

                    <button onClick={()=>this.AddNewAnimal(this.state.animal)} >Add animal</button>
                </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FormNewAnimal);