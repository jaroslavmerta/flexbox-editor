import { addAtributes } from "../../../common/AtributesToElement";
import { addInlineStyle } from "../../../common/StyleToElement";
import { LocStorage } from '../../../common/localStorage/LocStorage';
import { item, boxItemClass } from "../../../common/localStorage/storageInterfaces";
import { ctgrId } from "../../editorTypes";
import stylEditor from "../../editor.module.scss"
import stylIMenu from "../Menu/FrstMenu/frstMenu.module.scss"
import { InputGetter } from '../../../common/inputGetter/InputGetter';
import { ExistInLocStorageError } from "../../../common/error/locStorageError/ExistInLocStorageError";
import { ShowHideMenu } from './../Menu/ShowHideMenu/ShowHideMenu';
import { itemBttns, runItemFncIds, scndMenuItemIds } from "./objectInterfaces";
require('./item.module.scss');

export class Item{

    public scndMenuIds: scndMenuItemIds;

    //Buttons
    public bttns:itemBttns;

    constructor() {

        this.scndMenuIds = {
            runScndMenu:{
                edt:{
                    item:{
                        rszPercent: 'rsz-item-percent-scndMenu-radio'
                    },
                    outerBoxItem:{
                        rszPercent:'rsz-outerBoxItem-percent-scndMenu-radio'
                    }
                }
            },
            runFnc:{
                edt:{
                    item:{
                        rszPercent:'rsz-item-percent'
                    },
                    outerBoxItem:{
                        rszPercent:'rsz-outerBoxItem-percent'
                    }
                }
            }
        }

        this.bttns = {
            scndMenu: {
                algnSelf: [
                    {id: 'start', type:'radio', name :'ornt', value:'fi-start', text:'Start'},
                    {id: 'center', type:'radio', name :'ornt', value:'fi-center', text:'Center'},
                    {id: 'end', type:'radio', name :'ornt', value:'fi-end', text:'End'},
                    {id: 'stretch', type:'radio', name :'ornt', value:'fi-stretch', text:'Stretch'},
                    {id: 'none-as', type:'radio', name :'ornt', value:'fi-none', text:'None'},
                ],
                rszPercent: [
                    {id: 'x100', type:'radio', name :'width', value:'x100', text:'Width 100%'},
                    {id: 'x0', type:'radio', name :'width', value:'x0', text:'No % width'},
                    {id: 'y100', type:'radio', name :'height', value:'y100', text:'Height 100%'},
                    {id: 'y0', type:'radio', name :'height', value:'y0', text:'No % height'},
                ]
            }
        }
    }

    public rszPercent(runFnc:runItemFncIds){
        return(e:Event)=> {
        //musí být dvě funkce, jedna pro klik na button, druhá pro klik na označený boxItem třídou moveBox
        if ((<HTMLElement>e.target).id === runFnc.edt.item.rszPercent || (<HTMLElement>e.target).id === runFnc.edt.outerBoxItem.rszPercent) {
            e.preventDefault();
            console.log((<HTMLElement>e.target).id);
            let triggerId:string|null = null;
            if ((<HTMLElement>e.target).id === runFnc.edt.item.rszPercent ) {
                triggerId = localStorage.getItem('triggerid')
            }
            else if ((<HTMLElement>e.target).id === runFnc.edt.outerBoxItem.rszPercent){
                triggerId = localStorage.getItem('trggrPrntId')

            }
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                const triggerKind = trigger?.getAttribute('data-kind');
                if(trigger && triggerKind){
                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');
                    const presets =  InputGetter.getChckInpdVls('#boxItem-preset');

                    let items = LocStorage.getItems('items');
                    let ctgrData:item | null = null;
                    try {
                        ctgrData = LocStorage.getCtgr(items, trggrCtgrName);
                        
                    } catch (error:unknown) {
                        if (error instanceof ExistInLocStorageError) {
                            console.log(error.message, error.property)
                        }
                    }
                    if (ctgrData) {

                        let triggerData = LocStorage.findItem(ctgrData.subItems, triggerId);
                        if (triggerData) {
                            presets.forEach(preset => {
                            if (preset.name === 'width') { 
                                if (triggerData!.classes.width[0] !== preset.value) {
                                    
                                    if (triggerKind === 'boxItem') {
                                        if (preset.value === 'x100') {
                                            
                                            if (trigger.parentElement?.classList.contains('horizontal')) {
                                                if (trigger.classList.contains('grow')) {
                                                    trigger.classList.remove('grow');
                                                    (<boxItemClass>triggerData!.classes).grow[0] = 'noGrow';
                                                }
                                            }
                                            if (trigger.style.width) {
                                                trigger.style.width = '';
                                                if (triggerData?.inlStyl?.width) {
                                                    delete triggerData.inlStyl.width;
                                                }
                                            }
                                            if (trigger.classList.contains('x0')) {
                                                trigger.classList.remove('x0');
                                            }
                                            trigger.classList.add(preset.value);

                                        }
                                        else if(preset.value === 'x0'){
                                            if (trigger.classList.contains('x100')) {
                                                trigger.classList.remove('x100');
                                            }
                                        }
                                    }
                                    else if (triggerKind === 'imageItem') {
                                        if (preset.value === 'x100') {
                                            
                                            if (trigger.classList.contains('x0')) {
                                                trigger.classList.remove('x0');
                                            }
                                            trigger.classList.add(preset.value);

                                        }
                                        else if(preset.value === 'x0'){
                                            if (trigger.classList.contains('x100')) {
                                                trigger.classList.remove('x100');
                                            }
                                        }
                                    }
                                    (<boxItemClass>triggerData!.classes).width[0] = preset.value;
                                    LocStorage.upgrItem(ctgrData!.subItems, triggerId!, triggerData!);
                                    LocStorage.setItem('items', items);
                                }
                                else{
                                    return;
                                }
                                }
                                else if (preset.name === 'height'){
                                    if (triggerData!.classes.height[0] !== preset.value) {
                                        if (triggerKind === 'boxItem') {
                                            if (preset.value === 'y100') {
                                                
                                                if (trigger.parentElement?.classList.contains('vertical')) {
                                                    if (trigger.classList.contains('grow')) {
                                                        trigger.classList.remove('grow');
                                                        (<boxItemClass>triggerData!.classes).grow[0] = 'noGrow';
                                                    }
                                                }
                                                if (trigger.style.height) {
                                                    trigger.style.height = '';
                                                    if (triggerData?.inlStyl?.height) {
                                                        delete triggerData.inlStyl.height;
                                                    }
                                                }
                                                if (trigger.classList.contains('y0')) {
                                                    trigger.classList.remove('y0');
                                                }
                                                trigger.classList.add(preset.value);
                                                    
                                                }
                                                else if(preset.value === 'y0'){
                                                    if (trigger.classList.contains('y100')) {
                                                        trigger.classList.remove('y100');
                                                    }
                                                }
                                                
                                            }
                                            else if (triggerKind === 'imageItem') {
                                                if (preset.value === 'y100') {
                                                    
                                                    if (trigger.classList.contains('y0')) {
                                                        trigger.classList.remove('y0');
                                                    }
                                                    trigger.classList.add(preset.value);

                                                }
                                                else if(preset.value === 'y0'){
                                                    if (trigger.classList.contains('y100')) {
                                                        trigger.classList.remove('y100');
                                                    }
                                                }
                                            }
                                            (<boxItemClass>triggerData!.classes).height[0] = preset.value;
                                            LocStorage.upgrItem(ctgrData!.subItems, triggerId!, triggerData!)
                                            LocStorage.setItem('items', items);
                                        }
                                        else{
                                            return;
                                        }
                                    }
                            });
                        }
                    }
                }
            }
        }
    }
    }

    

    

    /**
     * Turns on image item move state
     * @param e 
     */
     public moveItem(e:Event){
        //musí být dvě funkce, jedna pro klik na button, druhá pro klik na označený boxItem třídou moveBox
        if ((<HTMLElement>e.target).id === 'move-item') {
            console.log('move-item');
            const itemMenu = (<HTMLElement>e.target).closest('#itemMenu');
                const triggerId = itemMenu?.getAttribute('data-triggerid');
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if(trigger){
                    const triggerCategory = <ctgrId>trigger.getAttribute('data-category');
                    //nastavý všem boxům červený outline a zapne menu pro Move State
                    if (!trigger.parentElement?.classList.contains(stylEditor.moveBox)) {
                        let itemBoxes = document.getElementsByClassName('boxItem');
                                const mainBox = document.getElementById('frstMainBox');
                                mainBox?.classList.add(stylEditor.moveBox);
                                for (const itemBox of itemBoxes) {
                                    itemBox.classList.add(stylEditor.moveBox);
                                }
                                localStorage.setItem('movingItem', trigger.id)
                                trigger.classList.add(stylEditor.focus);
                                trigger.classList.remove(stylIMenu.hasNav);
                                
                                ShowHideMenu.move = true;
                    }
                }
            }
        }
    }

    /**
     * Cancels move item
     * @param e 
     */
    public moveEnd(e:Event){
        //musí být dvě funkce, jedna pro klik na button, druhá pro klik na označený boxItem třídou moveBox
        if ((<HTMLElement>e.target).id === 'move-end') {
            console.log('move-end');
            const itemMenu = (<HTMLElement>e.target).closest('#itemMenu');
                const triggerId = itemMenu?.getAttribute('data-triggerid');
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if(trigger){
                    const triggerCategory = <ctgrId>trigger.getAttribute('data-category');
                    //odstraní všem boxům červený outline a zapne menu pro Move State
                    
                    let itemBoxes = document.getElementsByClassName('boxItem');
                    const mainBox = document.getElementById('frstMainBox');
                    mainBox?.classList.remove(stylEditor.moveBox);
                    for (const itemBox of itemBoxes) {
                        itemBox.classList.remove(stylEditor.moveBox);
                    }
                    let movingItemId = localStorage.getItem('movingItem');
                    let movingItem;
                    if (movingItemId) {
                        movingItem = document.getElementById(movingItemId);
                    }
                    if (movingItem) {
                        movingItem.classList.remove(stylEditor.focus);
                        
                    }

                    trigger.classList.remove(stylIMenu.hasNavMove);
                    ShowHideMenu.move = false;
                    
                }
            }
        }
    }

      /**
     * Moves moving item in trigger item 
     * @param e 
     */
       public moveItemHere(e:Event){
        //musí být dvě funkce, jedna pro klik na button, druhá pro klik na označený boxItem třídou moveBox
        if ((<HTMLElement>e.target).id === 'move-item-here') {
            console.log('move-item-here');
            const evTarget= (<HTMLElement>e.target);
            const itemMenu = evTarget.closest('#itemMenu');
            const triggerId = itemMenu?.getAttribute('data-triggerid');
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if(trigger){
                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');
                    const items = LocStorage.getItems('items');
                    let ctgrData:item | null = null;
                    try {
                        ctgrData = LocStorage.getCtgr(items, trggrCtgrName);
                        
                    } catch (error:unknown) {
                        if (error instanceof ExistInLocStorageError) {
                            console.log(error.message, error.property)
                        }
                    }
                    if (ctgrData) {
                        let movingItemId = localStorage.getItem('movingItem');
                        
                        if (movingItemId) {
                            let movingItem;
                            movingItem = document.getElementById(movingItemId);

                            if (movingItem) {
                                if (!movingItem.contains(trigger)) {
                                    movingItem.classList.remove(stylEditor.focus);
                                    let movingItemCtgr  = <ctgrId | null>movingItem.getAttribute('data-category');
                                    //Local storage part
                                    let movingItemData = <item |null>{};
                                    if(movingItemCtgr){
                                        if (movingItemCtgr === trggrCtgrName) {
                                            movingItemData = LocStorage.findItem(ctgrData.subItems, movingItemId);

                                            let removed = LocStorage.rmvItem(ctgrData.subItems, movingItemId);
                                            if(!removed){
                                                return ;
                                            }
                                        }
                                        else{
                                            movingItemData = LocStorage.findItem(ctgrData.subItems, movingItemId);
                                            let removed = LocStorage.rmvItem(ctgrData.subItems, movingItemId);
                                            if(!removed){
                                                return ;
                                            }
                                        }
                                    }
                                    
                                    //pokud je trigger image
                                    if (trigger.tagName === 'IMG') {
                                        let triggerPrnt = trigger.parentElement;
                                        if (triggerPrnt) {
                                            //pokud je triggerPrnt main box
                                            if(triggerPrnt.id === trggrCtgrName){
                                                //najdi triggerData a vloz za nej movingItemData
                                                if (ctgrData.subItems) {
                                                    for (let index = 0; index < ctgrData.subItems!.length; index++) {
                                                        if ( trigger.id === ctgrData.subItems![index].id) {
                                                            if (movingItemData) {
                                                                ctgrData.subItems!.splice(index+1, 0, movingItemData)
                                                                trigger.after(movingItem);
                                                            }
                                                            break;
                                                        };
                                                    }
                                                }
                                            }
                                            //pokud je triggerPrnt itemBox
                                            else{
                                                if (movingItemData) {

                                                    let replaced = LocStorage.placeItemBhndItem(ctgrData.subItems, triggerId, movingItemData);
                                                    if (replaced) {
                                                        trigger.after(movingItem);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else{
                                        //pokud je trigger mainBox
                                        if(trigger.id === trggrCtgrName){
                                            if ( ctgrData.subItems) {
                                                if (movingItemData) {
                                                    ctgrData.subItems!.push(movingItemData);
                                                    trigger.append(movingItem);
                                                }
                                            }
                                        }
                                        else{
                                            if (movingItemData) {
                                                let pushed = LocStorage.pushItemInSubItems(ctgrData.subItems, triggerId, movingItemData);
                                                if (pushed) {
                                                    trigger.append(movingItem);
                                                }
                                                
                                            }
                                        }
                                    }
                                    LocStorage.setItem('items',items);

                                    //odstraní všem boxům červený outline a vypne menu pro Move State
                                    let itemBoxes = document.getElementsByClassName('boxItem');
                                    const mainBox = document.getElementById('frstMainBox');
                                    mainBox?.classList.remove(stylEditor.moveBox);
                                    for (const itemBox of itemBoxes) {
                                        itemBox.classList.remove(stylEditor.moveBox);
                                    }
                                    trigger.classList.remove(stylIMenu.hasNavMove);
                                    ShowHideMenu.move = false;
                                }
                                //pokud je target ditetem moving itemu, upozorni uživatele, že nelze přesouvat otce do svého dítěte
                                else{
                                    window.alert('You can not place parent item into child item!')
                                }
                            }
                        }

                    
                    
                    //DOM moving item part
                    }
                }
            }
        }
    }

    public createDivContainer(styles?: object, atributes?:object): HTMLDivElement{
        const divContainer = document.createElement('div');
        //style for grid category
        if (styles){
            addInlineStyle(divContainer,styles);
        }
        if(atributes){
            addAtributes(divContainer, atributes);
        }
        /* divContainer.setAttribute('draggable', 'true');
        divContainer.setAttribute('id', 'item2'); */

        return divContainer;
    }

   

    private createTestItem(width:string, height:string, background:string, atributes?:object): HTMLDivElement{
        const styles = {
            width : width,
            height : height,
            border : '1px solid black',
            background: background,
            float: 'left',
            /* 'align-self': 'center' */
        };

        const divItem = document.createElement('div');
        //style for grid category
        if (styles){
            addInlineStyle(divItem, styles);
        }
        if(atributes){
            addAtributes(divItem, atributes);
        }

        return divItem;
    }



}