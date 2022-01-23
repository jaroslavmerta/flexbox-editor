import { EventListeners } from '../common/EventListeners';
import { Input } from '../HTMLComponents/input/Input';
import { Flex } from '../HTMLComponents/flexBox/Flex';
import { BoxItem } from './editorComponents/Item/BoxItem/BoxItem';
import { ImageItem } from './editorComponents/Item/ImageItem/ImageItem';
import { Item } from './editorComponents/Item/Item';
import { FrstMenu } from './editorComponents/Menu/FrstMenu/FrstMenu';
import { FrstMainBox } from './editorComponents/MainBox/FrstMainBox/FrstMainBox';
import { MainBox } from './editorComponents/MainBox/MainBox';
import { ScndMenu } from './editorComponents/Menu/ScndMenu/ScndMenu';
require('../itemPresets.scss');

export class FlexBoxEditor {

    //Dependecies
    private flex:Flex;
    private boxItem:BoxItem;
    private imageItem:ImageItem;
    private frstMainBox:FrstMainBox;
    private frstMenu: FrstMenu;
    private item: Item;
    private mainBox: MainBox;
    private input: Input;
    private subMenu: ScndMenu

    public eventListeners:EventListeners;

    constructor(){
        this.flex = new Flex();
        this.boxItem = new BoxItem();
        this.imageItem = new ImageItem();
        this.frstMainBox = new FrstMainBox(this.boxItem, this.imageItem,  this.flex);
        this.input = new Input();
        this.subMenu = new ScndMenu(this.input, this.boxItem);
        this.frstMenu = new FrstMenu(this.input, this.subMenu, this.boxItem);
        this.item = new Item();
        this.mainBox = new MainBox(this.boxItem, this.imageItem);
        this.eventListeners = new EventListeners(this.boxItem, this.frstMenu, this.imageItem, this.item, this.mainBox);
    }

    public crtEditor (){
        let frstMainBoxElm;
        try {
            frstMainBoxElm = this.frstMainBox.createFrstMainBox();
        } catch (error: unknown) {
            console.log(error)
            frstMainBoxElm = document.createElement('div');
            frstMainBoxElm.innerHTML = '<h1>Aplication is not working!</h1>'
        }
       
        return frstMainBoxElm;
    }
   
}