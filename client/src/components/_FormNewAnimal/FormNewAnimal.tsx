import React from 'react';

import { connect } from 'react-redux';
import { addNewAnimal,setOpenFormAddNewAnimal } from '../../redux/actions';

import PropTypes from 'prop-types';
import { translationsEnum } from '../../translations/Translations';

import { INewFormAnimalState, INewFormAnimalProps } from '.';

import { AnimalModel } from '../../models';


interface IConnectedDispatch {
    AddItem_LS: (animal: AnimalModel) => void;
    openFromAddNewAnimal_LS:(open: boolean) => void;
}

interface IConnectedState {
    AddItem_LS: AnimalModel;
    openFromAddNewAnimal_LS: boolean;
}

function mapStateToProps(state: any): IConnectedState {
	return {
        AddItem_LS: state.projectsReducer.animal,
        openFromAddNewAnimal_LS: state.projectsReducer.openFromAddNewAnimal,
	};
}

//Map the actions to the properties of the Component.
const mapDispatchToProps = (dispatch: any): IConnectedDispatch => ({
    AddItem_LS: (animal: AnimalModel) => {
		dispatch(addNewAnimal(animal));
    },
    openFromAddNewAnimal_LS: (open: boolean) => {
		dispatch(setOpenFormAddNewAnimal(open));
	}
});

class FormNewAnimal extends React.Component<INewFormAnimalProps & IConnectedState & IConnectedDispatch,INewFormAnimalState> {

    //Add ContextTypes
	static contextTypes = {
		t: PropTypes.func.isRequired
	}

    constructor(props) {
        super(props);
        this.state = {
            animal: new AnimalModel(),
            openFromAddNewAnimal: false
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
        this.props.openFromAddNewAnimal_LS(false);
        this.setState({animal: new AnimalModel()});
    }

    public render() {

        return (
                <div>
                    <label >Animal name</label>
                    <input type="text" onChange={()=>this.OnChangeField("Name",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_NAME)} value = {this.state.animal.Name.value}/>

                    <label >Link photo animal</label>
                    <input type="text" onChange={()=>this.OnChangeField("UrlPhoto",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_URLPHOTO)} value = {this.state.animal.UrlPhoto.value}/>

                    <label >Kingdom</label>
                    <input type="text" onChange={()=>this.OnChangeField("Kingdom",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_KINGDOM)} value = {this.state.animal.Kingdom.value}/>

                    <label >Class</label>
                    <input type="text" onChange={()=>this.OnChangeField("Class",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_CLASS)} value = {this.state.animal.Class.value}/>

                    <label >Conservation status</label>
                    <input type="text" onChange={()=>this.OnChangeField("ConservationStatus",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_CONSERVATION_STATUS)} value = {this.state.animal.ConservationStatus.value}/>

                    <label >Region</label>
                    <input type="text" onChange={()=>this.OnChangeField("Region",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_REGION)} value = {this.state.animal.Region.value}/>

                    <label >Short info</label>
                    <textarea onChange={()=>this.OnChangeField("ShortInfo",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_SHORT_INFO)} value = {this.state.animal.ShortInfo.value}/>

                    <label >Long info</label>
                    <textarea onChange={()=>this.OnChangeField("LongInfo",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_LONG_INFO)} value = {this.state.animal.LongInfo.value}/>

                    <button onClick={()=>this.AddNewAnimal(this.state.animal)} >Add animal</button>
                </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FormNewAnimal);