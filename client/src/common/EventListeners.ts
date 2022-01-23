import { FrstMenu } from "../FlexBoxEditor/editorComponents/Menu/FrstMenu/FrstMenu";
import { Item } from '../FlexBoxEditor/editorComponents/Item/Item';
import { BoxItem } from "../FlexBoxEditor/editorComponents/Item/BoxItem/BoxItem";
import { ImageItem } from '../FlexBoxEditor/editorComponents/Item/ImageItem/ImageItem';
import { MainBox } from '../FlexBoxEditor/editorComponents/MainBox/MainBox';

export interface eventAndCall {
    name: string;
    call: any;
};

export class EventListeners{

    
    private item: Item;
    private imageItem: ImageItem;
    private boxItem: BoxItem;
    private frstMenu: FrstMenu;
    private events:(eventAndCall | eventAndCall[])[]
    private mainBox: MainBox;

    constructor(boxItem: BoxItem,frstMenu: FrstMenu, imageItem:ImageItem, item: Item, mainbox:MainBox){
        this.imageItem = imageItem;
        this.boxItem = boxItem;
        this.frstMenu = frstMenu;
        this.item = item;
        this.mainBox = mainbox;

        this.events = [
            {name:'click', call: this.item.rszPercent},
            {name:'click', call: this.item.rszItem},
            {name:'click', call: this.item.rszEnd},
            {name:'click', call: this.item.rszItemState(item)},
            {name:'click', call: this.item.moveEnd},
            {name:'click', call: this.item.moveItem},
            {name:'click', call: this.item.moveItemHere},
            {name:'click', call: this.imageItem.edtImgPstn},
            {name:'click', call: this.imageItem.rmvImgItem},
            {name:'click', call: this.imageItem.addImgItem},
            {name:'change', call: this.imageItem.fileReader(imageItem)},
            {name:'change', call: this.boxItem.fileReader(this.boxItem.scndMenu.runFnc)},
            {name:'click', call: this.boxItem.rmvBoxBckGrnd(this.boxItem.scndMenu.runFnc)},
            {name:'click', call: this.boxItem.addImgBckGrnd(this.boxItem.scndMenu.runFnc)},
            {name:'click', call: this.boxItem.edtGrow(this.boxItem.scndMenu.runFnc)},
            {name:'click', call: this.boxItem.edtBoxDcrtn(this.boxItem.scndMenu.runFnc)},
            {name:'click', call: this.boxItem.edtOuterBoxItem},
            {name:'click', call: this.boxItem.edtboxItemPstn(this.boxItem.scndMenu.runFnc)},
            {name:'click', call: this.boxItem.rmvBoxItem},
            {name:'click', call: this.boxItem.rmvBoxItemAll},
            {name:'click', call: this.boxItem.addInnerBoxItem(boxItem)},
            {name:'click', call: this.boxItem.addOuterBoxItem(boxItem)},
            {name:'click', call: this.mainBox.edtMainBoxDcrtn},
            {name:'click', call: this.mainBox.edtOuterMainBox},
            {name:'click', call: this.mainBox.edtMainBoxPstn},
            {name:'click', call: this.frstMenu.showHideFrstMenu(frstMenu)}                      
        ]
    }

    /**
 * Creates event delegation
 * @param element Parent element, that will catch bubble phase and on which the eventlistener is placed  
 * @param events array In every callback function must be control of event target to make event delegation work properly
 */
public evDelegation = (element:Element):Element => {
    this.events.forEach( (event) => {
        if (Array.isArray(event)) {
            //rekurze, pokud je na indexu pole, spusti se funkce znovu na vnitrni objekty nebo pole
            evDelegation(element, event);
        }
        else
            element.addEventListener((<eventAndCall>event).name, (<eventAndCall>event).call);
        
    });
    return element;
}
}

export let events:(eventAndCall | eventAndCall[])[] = [];

/**
 * Adds every htmlElement same events nad callbacks
 * @param htmlElements HTMLCollection
 * @param events array Name of event and callback function
 */
export const addListenersSame = (htmlElements:HTMLCollection, events: eventAndCall[]) => {
   // console.log('addListenersSame loop 0 funguje', htmlElements.item(0), events);
    //for every htmlElement
    for(const element of htmlElements) {
        //console.log('addListenersSame loop 1 funguje');
        /* for every event console */
        events.forEach( (event) => {
            //add every callback for the event
                element.addEventListener(event.name, event.call);
           //console.log(element);
                //console.log('addListenersSame loop 2 funguje',event.name,event.call);
        });
    };
}
/**
 * Creates event delegation
 * @param element Parent element, that will catch bubble phase and on which the eventlistener is placed  
 * @param events array In every callback function must be control of event target to make event delegation work properly
 */
export const evDelegation = (element:Element, events:  (eventAndCall | eventAndCall[])[] ):Element => {
    events.forEach( (event) => {
        if (Array.isArray(event)) {
            //rekurze, pokud je na indexu pole, spusti se funkce znovu na vnitrni objekty nebo pole
            evDelegation(element, event);
        }
        else
            element.addEventListener((<eventAndCall>event).name, (<eventAndCall>event).call);
        
    });
    return element;
}

export const domLoaded = (htmlElements:HTMLCollection, events: eventAndCall[]) =>{
    console.log('domLoaded loop 0 funguje', htmlElements )

    document.addEventListener('DOMContentLoaded', (event) => {
        console.log('domLoaded funguje loop 1', htmlElements.length, events );
        addListenersSame(htmlElements, events);
      
    });
}

/* export const evDelegation = (element:Element, events: eventAndCall | []):Element => {
    if(Array.isArray(events)){
        events.forEach( (event) => {
                //rekurze, pokud je na indexu pole, spusti se funkce znovu na vnitrni objekty nebo pole
                evDelegation(element, event);
        });
    }
    else{
        for (const [key, value] of Object.entries(events)){
        element.addEventListener(value, event.call);
    }

    return element;
}} */