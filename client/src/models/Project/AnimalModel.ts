import { IFormFieldBoolean, IFormFieldString, IFormFieldNumber } from '../Base';
import {IMongoAnimal} from './IMongoAnimal';

export class AnimalModel {

    // Fields Projects
    Name: IFormFieldString;
    UrlPhoto: IFormFieldString;
    Kingdom: IFormFieldString;
    Class: IFormFieldString;
    ConservationStatus: IFormFieldString;
    Region: IFormFieldString;
    Favorite: IFormFieldBoolean;
    ShortInfo: IFormFieldString;
    LongInfo: IFormFieldString;
    Birth: IFormFieldString;
    Death: IFormFieldString;
    Likes: IFormFieldNumber;


    constructor() {
        this.Name = new IFormFieldString('Name');
        this.UrlPhoto = new IFormFieldString('UrlPhoto');
        this.Kingdom = new IFormFieldString('Kingdom');
        this.Class = new IFormFieldString('Class');
        this.ConservationStatus = new IFormFieldString('ConservationStatus');
        this.Region = new IFormFieldString('Region');
        this.Favorite = new IFormFieldBoolean('Favorite');
        this.ShortInfo = new IFormFieldString('ShortInfo');
        this.LongInfo = new IFormFieldString('LongInfo');
        this.Birth = new IFormFieldString('Birth');
        this.Death = new IFormFieldString('Death');
        this.Likes = new IFormFieldNumber('Likes');
    }


    public toMongoDB(): any {

        let newAnimal: IMongoAnimal = {
            Name: this.Name.value != '' ? this.Name.value : '',
            UrlPhoto: this.UrlPhoto.value != '' ? this.UrlPhoto.value : '',
            Kingdom: this.Kingdom.value != '' ? this.Kingdom.value : '',
            Class: this.Class.value != '' ? this.Class.value : '',
            ConservationStatus: this.ConservationStatus.value != '' ? this.ConservationStatus.value : '',
            Region: this.Region.value != '' ? this.Region.value : '',
            Favorite: this.Favorite.value,
            ShortInfo: this.ShortInfo.value != '' ? this.ShortInfo.value : '',
            LongInfo: this.LongInfo.value != '' ? this.LongInfo.value : '',
            Likes: this.Likes.value != undefined ? this.Likes.value : 0,
        };

        return newAnimal;
    }

    public fromMongoDB(mongoModel: IMongoAnimal): AnimalModel {

        let animal = new AnimalModel();

        animal.Name.value = mongoModel.Name != "" ? mongoModel.Name : "";
        animal.UrlPhoto.value = mongoModel.UrlPhoto != "" ? mongoModel.UrlPhoto : "";
        animal.Class.value = mongoModel.Class != "" ? mongoModel.Class : "";
        animal.Kingdom.value = mongoModel.Kingdom != "" ? mongoModel.Kingdom : "";
        animal.Region.value = mongoModel.Region != "" ? mongoModel.Region : "";
        animal.ConservationStatus.value = mongoModel.ConservationStatus != "" ? mongoModel.ConservationStatus : "";
        animal.Favorite.value = mongoModel.Favorite ;
        animal.ShortInfo.value = mongoModel.ShortInfo != "" ? mongoModel.ShortInfo : "";
        animal.LongInfo.value = mongoModel.LongInfo != "" ? mongoModel.LongInfo : "";
        animal.Likes.value = mongoModel.Likes != undefined ? mongoModel.Likes : 0;

        return animal;
    }

}