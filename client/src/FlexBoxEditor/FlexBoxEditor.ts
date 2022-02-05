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
import { ShowHideMenu } from './editorComponents/Menu/ShowHideMenu/ShowHideMenu';
import { Box } from './editorComponents/Box/Box';
require('../itemPresets.scss');

export class FlexBoxEditor {

    //Dependecies
    private flex:Flex;
    private boxItem:BoxItem;
    private box:Box;
    private imageItem:ImageItem;
    private frstMainBox:FrstMainBox;
    private frstMenu: FrstMenu;
    private item: Item;
    private mainBox: MainBox;
    private input: Input;
    private scndMenu: ScndMenu
    private showHideMenu: ShowHideMenu;
    
    public eventListeners:EventListeners;

    constructor(){
        this.flex = new Flex();
        this.item = new Item();
        this.boxItem = new BoxItem(this.item);
        this.imageItem = new ImageItem();
        this.frstMainBox = new FrstMainBox(this.boxItem, this.imageItem,  this.flex);
        this.input = new Input();
        this.box = new Box();
        this.mainBox = new MainBox(this.boxItem, this.imageItem);
        this.scndMenu = new ScndMenu(this.input, this.boxItem, this.box, this.item, this.mainBox);
        this.frstMenu = new FrstMenu(this.input, this.boxItem, this.mainBox);
        this.showHideMenu = new ShowHideMenu(this.frstMenu, this.scndMenu, this.boxItem, this.mainBox, this.imageItem, this.item);
        this.eventListeners = new EventListeners(this.boxItem, this.frstMenu, this.imageItem, this.item, this.mainBox, this.showHideMenu);
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