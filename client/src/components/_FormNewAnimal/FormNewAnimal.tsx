import React from 'react';

import { connect } from 'react-redux';
import { addNewAnimal,setOpenFormAddNewAnimal } from '../../redux/actions';

import PropTypes from 'prop-types';
import { translationsEnum } from '../../translations/Translations';

import { INewFormAnimalState, INewFormAnimalProps } from '.';

import { AnimalModel } from '../../models';


interface IConnectedDispatch {
    AddItem_LS: (animal: AnimalModel) => void;
    SetOpenFormAddNewAnimal_LS:(open: boolean) => void;
}

interface IConnectedState {
    AddItem_LS: AnimalModel;
    OpenFromAddNewAnimal_LS: boolean;
}

function mapStateToProps(state: any): IConnectedState {
	return {
        AddItem_LS: state.projectsReducer.animal,
        OpenFromAddNewAnimal_LS: state.projectsReducer.openFormAddNewAnimal,
	};
}

//Map the actions to the properties of the Component.
const mapDispatchToProps = (dispatch: any): IConnectedDispatch => ({
    AddItem_LS: (animal: AnimalModel) => {
		dispatch(addNewAnimal(animal));
    },
    SetOpenFormAddNewAnimal_LS: (open: boolean) => {
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
            formIsOpen: false
        }
    };


    public static getDerivedStateFromProps(nextProps: INewFormAnimalProps & IConnectedState, prevState: INewFormAnimalState) {

        if (nextProps.OpenFromAddNewAnimal_LS != prevState.formIsOpen) {
            return { formIsOpen: nextProps.OpenFromAddNewAnimal_LS }
        }
    }


    public componentDidUpdate(prevProps: INewFormAnimalProps & IConnectedState, prevState: INewFormAnimalState) {
         
        if (prevProps.OpenFromAddNewAnimal_LS != prevState.formIsOpen) {
            this.setState({formIsOpen: prevProps.OpenFromAddNewAnimal_LS})
            console.log(this.state.formIsOpen)
        }

    }


    private OnChangeField(fieldName:string,target: any) {
        let auxModel =this.state.animal;
        auxModel[fieldName].value = target.value;
        this.setState({
            animal: auxModel
        })
    }


    private AddNewAnimal(animal: AnimalModel) {
        this.props.AddItem_LS(animal);
        this.props.SetOpenFormAddNewAnimal_LS(false);
        this.setState({animal: new AnimalModel()});
    }


    public render() {

        return (
                <dialog className = "dialogContainer" open={this.state.formIsOpen} >
                    <div className = "row">
                        <label >Animal name</label>
                        <input type="text" onChange={()=>this.OnChangeField("Name",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_NAME)} value = {this.state.animal.Name.value}/>
                    </div>
                    <div className = "row">
                        <label >Link photo animal</label>
                        <input type="text" onChange={()=>this.OnChangeField("UrlPhoto",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_URLPHOTO)} value = {this.state.animal.UrlPhoto.value}/>
                    </div>
                    <div className = "row">
                        <label >Kingdom</label>
                        <input type="text" onChange={()=>this.OnChangeField("Kingdom",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_KINGDOM)} value = {this.state.animal.Kingdom.value}/>
                    </div>
                    <div className = "row">
                        <label >Class</label>
                        <input type="text" onChange={()=>this.OnChangeField("Class",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_CLASS)} value = {this.state.animal.Class.value}/>
                    </div>
                    <div className = "row">
                        <label >Conservation status</label>
                        <input type="text" onChange={()=>this.OnChangeField("ConservationStatus",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_CONSERVATION_STATUS)} value = {this.state.animal.ConservationStatus.value}/>
                    </div>
                    <div className = "row">
                        <label >Region</label>
                        <input type="text" onChange={()=>this.OnChangeField("Region",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_REGION)} value = {this.state.animal.Region.value}/>
                    </div>
                    <div className = "row">
                        <label >Short info</label>
                        <textarea onChange={()=>this.OnChangeField("ShortInfo",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_SHORT_INFO)} value = {this.state.animal.ShortInfo.value}/>
                    </div>
                    <div className = "row">
                        <label >Long info</label>
                        <textarea onChange={()=>this.OnChangeField("LongInfo",event.target)} placeholder={this.context.t(translationsEnum.PLACEHOLDER_LONG_INFO)} value = {this.state.animal.LongInfo.value}/>
                    </div>
                    <button onClick={()=>this.AddNewAnimal(this.state.animal)} >Add animal</button>
                </dialog>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FormNewAnimal);