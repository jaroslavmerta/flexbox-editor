import { eventAndCall } from "../../../../common/EventListeners";
import { Flex } from "../../../../HTMLComponents/flexBox/Flex"
import { itemBoxCol } from './flexItemCss';
import { LocStorage } from '../../../../common/localStorage/LocStorage';
import { item, imgItemClass, items, boxItemClass,} from "../../../../common/localStorage/storageInterfaces";
import styles from './boxItem.module.scss';


import { ctgrId } from "../../../editorTypes";

import { InputGetter } from '../../../../common/inputGetter/InputGetter';
import { ExistInLocStorageError } from "../../../../common/error/locStorageError/ExistInLocStorageError";
import { runBoxItemFnc, scndMenuBoxItem } from './objectInterfaces';


let debug = false;

export class BoxItem extends Flex{

    public scndMenu: scndMenuBoxItem;


    private boxItemStyles: {};

    constructor(){
        super();

        this.scndMenu = {
            runScndMenu:{
                edt:{
                    box:{
                        pstn: 'edt-box-pstn-scndMenu-radioPstnBox',
                        drctn: 'edt-box-drctn-scndMenu-radio',
                        grow:'edt-box-grow-scndMenu-radio',
                        bckgrnd: 'edt-box-bckgrnd-scndMenu-bttn',
                    },
                    outerBox:{
                        pstn: 'edt-outerBox-pstn-scndMenu-radioPstnBox',
                        drctn:'edt-outerBox-drctn-scndMenu-radio',
                        grow:'edt-outerBox-grow-scndMenu-radio',
                        bckgrnd: 'edt-outerBox-bckgrnd-scndMenu-bttn',
                        },
                },
                add:{
                    innerBox:'add-innerBox-scndMenu-radio',
                    outerBox:'add-outerBox-scndMenu-radio',
                    inBox:{
                        textField: 'test',
                        },
                    inOuterBox:{
                        textField: 'test',
                        },
                }
            },

            runFnc: {
                edt:{
                    box:{
                        pstn: 'edt-box-pstn',
                        drctn: 'edt-box-drctn',
                        grow:'edt-box-grow',
                        bckgrnd: {clickInput:'edt-box-bckgrnd', runFnc: 'box-bckgrnd-input'},
                    },
                    outerBox:{
                        pstn: 'edt-outerBox-pstn',
                        drctn:'edt-outerBox-drctn',
                        grow:'edt-outerBox-grow',
                        bckgrnd: {clickInput:'edt-outerBox-bckgrnd', runFnc: 'outerBox-bckgrnd-input'},
                        },
                },
                rmv:{
                    box:{
                        bckgrnd: 'rmv-box-bckgrnd',
                    },
                    outerBox:{
                        bckgrnd: 'rmv-outerBox-bckgrnd',
                        },
                },
                add:{
                    innerBox:'add-innerBoxItem',
                    outerBox:''
                }
            }
        };

    

        this.boxItemStyles = {
            horizontal: styles.BIEmpty,
            vertical: styles.boxItem_Y_1
        }
        
    }

    public addImgBckGrnd(runFnc:runBoxItemFnc){
        return (e:Event)=>{
            if ((<HTMLElement>e.target).id === runFnc.edt.box.bckgrnd.clickInput || (<HTMLElement>e.target).id === runFnc.edt.outerBox.bckgrnd.clickInput) {
                
                //funkce vyvolává click na input button, které je nezobrazené a tím spouští funkci this.fileReader()
                if ((<HTMLElement>e.target).id === runFnc.edt.box.bckgrnd.clickInput) {
                    document.getElementById(runFnc.edt.box.bckgrnd.runFnc)?.click();
                }
                else if((<HTMLElement>e.target).id === runFnc.edt.outerBox.bckgrnd.clickInput){
                    document.getElementById('outerBox-bckgrnd-input')?.click();
                }
            // if(debug)
                console.log((<HTMLElement>e.target).id);
                /**
                 * IMG lze vložit do hlavního kontejneru a do boxItemu
                 * Dědění: 
                 *  - do hlavního kontejneru: ne
                 *  - do boxItem: ne
                 */
            }
        }
    }

    /**
     * Event handler, save img base64 into local storage
     * coder: I used wrapper function for first time to pass a dependence to event callback
     * @param e 
     */
     public fileReader(runFnc:runBoxItemFnc){
        return (e:Event)=>{
        //if(debug)   
        if ( (<HTMLElement>e.target).id === runFnc.edt.box.bckgrnd.runFnc || (<HTMLElement>e.target).id === 'outerBox-bckgrnd-input') {
            console.log('file reader background image se spustil:');
            const reader = new FileReader();
            let trggId = (<HTMLElement>e.target).id;
            const passArgWrpr = (trggrId: string) => {
            reader.addEventListener('load', (ev) => {
                
                //img as base64
                let uploaded_image = reader.result;
                if (uploaded_image) {
                    let triggerId;
                    if (trggId === runFnc.edt.box.bckgrnd.runFnc) {
                        triggerId = localStorage.getItem('triggerid');
                    } else if(trggId === 'outerBox-bckgrnd-input') {
                        triggerId = localStorage.getItem('trggrPrntId');
                    }
                    if(triggerId){
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
                                let triggerData = LocStorage.findItem(ctgrData.subItems,triggerId);

                                if (triggerData) {
                                    triggerData.img = <string>uploaded_image;

                                    let saved = LocStorage.upgrItem(ctgrData.subItems, triggerId, triggerData);
                                    if (saved) {
                                        LocStorage.setItem('items', items);
                                        var img = new Image();
                                        img.src = <string>uploaded_image;
                                        
                                        trigger.style.backgroundImage = "url('" + img.src + "')";
                                    }
                                }
                            }
                        
                            //pokud je trigger boxItem a pokud má class empty, odstran empty class z databáze a z DOM
                            /* imageItem.rmvEmptyClassesFBItem(items[triggerCategory], triggerId);
                            if (trigger.classList.contains(stylFlexBI.BIEmpty)) {
                                trigger.classList.remove(stylFlexBI.BIEmpty);
                            } */
                        }//
                    }
                }
            
            });
        }
            passArgWrpr(trggId);
            reader.readAsDataURL((<HTMLInputElement>e.target).files![0]);
        }
     }
    } 
    
    public rmvBoxBckGrnd(runFnc:runBoxItemFnc){
        return(e:Event)=>{
        //pokud se kliklo na tlačítko add boxItem
        if ((<HTMLElement>e.target).id === runFnc.rmv.box.bckgrnd || (<HTMLElement>e.target).id === runFnc.rmv.outerBox.bckgrnd){
            e.preventDefault();
            console.log((<HTMLElement>e.target).id);

            //získání hodnot z checked inputů
            let presets = InputGetter.getChckInpdVls('#boxItem-preset');
            console.log(presets);
            let triggerId;
            //trigger je element, na kterém se vyvolalo menu
            if ((<HTMLElement>e.target).id === runFnc.rmv.box.bckgrnd) {
                triggerId = localStorage.getItem('triggerid');
            }
            else if ((<HTMLElement>e.target).id === runFnc.rmv.outerBox.bckgrnd){
                triggerId = localStorage.getItem('trggrPrntId');
            }
            if(triggerId){
                const trigger = document.getElementById(triggerId);
                if(trigger){

                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');
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
                            if (triggerData.img) {
                                delete triggerData.img;
                                trigger.style.backgroundImage = '';
                            
                                LocStorage.upgrItem(ctgrData.subItems, triggerId, triggerData)
                                LocStorage.setItem('items', items);

                            }
                            else{
                                return;
                            }
                        }
                    }
                    
                }
            }
        }
    }
    }

    public edtGrow(runFnc:runBoxItemFnc){
        return(e:Event)=>{
        //pokud se kliklo na tlačítko add boxItem
        if ((<HTMLElement>e.target).id === runFnc.edt.box.grow|| (<HTMLElement>e.target).id === runFnc.edt.outerBox.grow){
            e.preventDefault();
            
            //even target je button z menu!
            const evTarget = (<HTMLElement>e.target);
            //získání hodnot z checked inputů
            let presets = InputGetter.getChckInpdVls('#boxItem-preset');
            console.log(presets);

            //trigger je element, na kterém se vyvolalo menu
            let triggerId;
            if ((<HTMLElement>e.target).id === runFnc.edt.box.grow) {
                triggerId = localStorage.getItem('triggerid');
            }
            else if((<HTMLElement>e.target).id === runFnc.edt.outerBox.grow){
                triggerId = localStorage.getItem('trggrPrntId');

            }
            if(triggerId){
                const trigger = document.getElementById(triggerId);
                if(trigger){

                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');
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
                        if ((<boxItemClass>triggerData.classes).grow[0] !== presets[0].value) {
                            
                                if (trigger.parentElement?.classList.contains('horizontal')) {
                                    if (trigger.style.width) {
                                        trigger.style.width = '';
                                        if (triggerData.inlStyl?.width) {
                                            delete triggerData.inlStyl.width;
                                        }
                                    }
                                    if (trigger.classList.contains('x100')) {
                                        trigger.classList.remove('x100');
                                        (<boxItemClass>triggerData.classes).width[0] = 'x0';
                                    }
                                }
                                else if (trigger.parentElement?.classList.contains('vertical')){
                                    if (trigger.style.height) {
                                        trigger.style.height = '';
                                        if (triggerData.inlStyl?.height) {
                                            delete triggerData.inlStyl.height;
                                        }
                                    }
                                    if (trigger.classList.contains('y100')) {
                                        trigger.classList.remove('y100');
                                        (<boxItemClass>triggerData.classes).height[0] = 'y0';
                                    }
                                }
                            
                            let badClass = (<boxItemClass>triggerData.classes).grow[0];
                            trigger.classList.remove(badClass);
                            trigger.classList.add(presets[0].value);


                            (<boxItemClass>triggerData.classes).grow[0] = presets[0].value;
                            LocStorage.upgrItem(ctgrData.subItems, triggerId, triggerData)
                            LocStorage.setItem('items', items);

                        }
                        else{
                            return;
                        }
                    }
                }
                    
                }
            }
        }
    }
    }

    public edtBoxDcrtn(runFnc:runBoxItemFnc){
        return(e:Event)=>{
            //pokud se kliklo na tlačítko add boxItem
            if ((<HTMLElement>e.target).id === runFnc.edt.box.drctn || (<HTMLElement>e.target).id === runFnc.edt.outerBox.drctn){
                e.preventDefault();
                console.log((<HTMLElement>e.target).id);

                //získání hodnot z checked inputů
                let presets = InputGetter.getChckInpdVls('#boxItem-preset');
                console.log(presets);
                let triggerId;
                //trigger je element, na kterém se vyvolalo menu
                if ((<HTMLElement>e.target).id === runFnc.edt.box.drctn) {
                    triggerId = localStorage.getItem('triggerid');
                }
                else if ((<HTMLElement>e.target).id === runFnc.edt.outerBox.drctn){
                    triggerId = localStorage.getItem('trggrPrntId');
                }
                if(triggerId){
                    const trigger = document.getElementById(triggerId);
                    if(trigger){

                        const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');
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
                            if ((<boxItemClass>triggerData.classes).flexDrctn[0] !== presets[0].value) {
                                let badClass = (<boxItemClass>triggerData.classes).flexDrctn[0];
                                trigger.classList.remove(badClass);
                                trigger.classList.add(presets[0].value);


                                (<boxItemClass>triggerData.classes).flexDrctn[0] = presets[0].value;
                                LocStorage.upgrItem(ctgrData.subItems, triggerId, triggerData)
                                LocStorage.setItem('items', items);

                            }
                            else{
                                return;
                            }
                        }
                    }
                        
                    }
                }
            }
        }
    }

    /**
     * Creates item box and appends event target to it - needs test if event target can be appended, cause it is just read only
     * @param e 
     */
    public addOuterBoxItem(flexBoxItem: BoxItem){
        return(e:Event)=> {
            //pokud se kliklo na tlačítko add boxItem
            if ((<HTMLElement>e.target).id === 'add-outerBoxItem'){
                console.log('add-outerBoxItem')
                e.preventDefault();
                //even target je button z menu!
                const evTarget = (<HTMLElement>e.target);
                //získání hodnot z checked inputů
                let presets = InputGetter.getChckInpdVls('#boxItem-preset');
                console.log(presets);

                //trigger je element, na kterém se vyvolalo menu
                const triggerId = localStorage.getItem('triggerid');
                if(triggerId){
                    const trigger = document.getElementById(triggerId);
                    if(trigger){

                        const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');

                        //id item boxu
                        const newItemId = LocStorage.crtNewItemId();
                        
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

                            let classes:boxItemClass = {
                                classId:['item', 'boxItem'],
                                position:['fb-jc-start', 'fb-ai-start', 'fi-none'],
                                subItPstn:[],
                                common:[styles.boxItem_Y_1],
                                flexDrctn:[],
                                grow:[],
                                width:['x0'],
                                height:['y0'],
                            };
                            if(presets.length){
                                LocStorage.saveFbInptClasOptn(presets, classes);
                            }
                        
                                const triggerNextSblng = trigger.nextElementSibling;
                                if(debug)
                                    console.log('triggerNextSblng:',triggerNextSblng);
                                const triggerPreviousSblng = trigger.previousElementSibling;
                                const triggerPrnt = trigger.parentElement;
                                //najdi trigger object in local storage
                                const triggerData = LocStorage.findItem(ctgrData.subItems,triggerId);
                                console.log('triggerData after LocStorage.findItem(items[triggerCategory],triggerId);', triggerData)
                        
                                const newItemBoxData:item = {
                                    id:newItemId,
                                    classes: classes,
                                    kind:'boxItem' };
                                //změn data dimension a order v triggerData
                                if (triggerData) {
                                    newItemBoxData.subItems = [triggerData];
                                    flexBoxItem.pasteItemAccordingId(ctgrData.subItems,triggerId, newItemBoxData)
                                    
                                    LocStorage.setItem('items', items);
                                    //vložení trigger elementu do item boxu
                                    const boxItem = flexBoxItem.crtFlexItemBox(newItemBoxData, trggrCtgrName);
                                    
                                    boxItem.append(<Node>trigger);
                                    
                                    //vložení item boxu na bývalé místo trigger elementu 
                                    if(triggerPrnt){
                                        flexBoxItem.appndInTrggrParntElm(triggerNextSblng, triggerPreviousSblng, triggerPrnt, boxItem);
                                    }    
                                }
                        }
                    }
                }
            }
        }
    }
    /**
     * Creates item box and appends event target to it - needs test if event target can be appended, cause it is just read only
     * @param e 
     */
    public addInnerBoxItem(flexBoxItem: BoxItem){
        return(e:Event)=> {
            //pokud se kliklo na tlačítko add boxItem
            if ((<HTMLElement>e.target).id === flexBoxItem.scndMenu.runFnc.add.innerBox){
                e.preventDefault();
                console.log(flexBoxItem.scndMenu.runFnc.add.innerBox)
                //even target je button z menu!
                const evTarget = (<HTMLElement>e.target);
                //získání hodnot z checked inputů
                let presets = InputGetter.getChckInpdVls('#boxItem-preset');
                console.log(presets);

                //trigger je element, na kterém se vyvolalo menu
                const triggerId = localStorage.getItem('triggerid');
                if(triggerId){
                    const trigger = document.getElementById(triggerId);
                    if(trigger){
                        
                        const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');

                        //id item boxu
                        const newItemId = LocStorage.crtNewItemId();
                        
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

                            let classes:boxItemClass = {
                                classId:['item', 'boxItem'],
                                position:['fb-jc-start', 'fb-ai-start', 'fi-none'],
                                subItPstn:[],
                                common:[styles.boxItem_Y_1],
                                flexDrctn:[],
                                grow:[],
                                width:['x0'],
                                height:['y0'],
                            };
                            const newItemBoxData:item = {
                                id:newItemId,
                                classes:classes,
                                kind:'boxItem'};

                            if(presets.length){
                                LocStorage.saveFbInptClasOptn(presets, classes);
                            }
                            //pokud se klikne do main container, pokud je trigger zároveň kategorií
                            if (triggerId === trggrCtgrName) {
                                //blok pro uložení do localStorage
                                LocStorage.pushNewItem(items.items, trggrCtgrName, newItemBoxData);
                                LocStorage.setItem('items', items);
                                //create box item and append to DOM
                                const boxItem = flexBoxItem.crtFlexItemBox(newItemBoxData, trggrCtgrName);
                                flexBoxItem.appndInTriggerElm(trigger?.childNodes, trigger, boxItem);
                            }
                            else {
                            
                                //najdi trigger object in local storage
                                const triggerData = LocStorage.findItem(ctgrData.subItems,triggerId);
                                
                                //změn data dimension a order v triggerData
                                if (triggerData) {
                                    
                                    LocStorage.pasteItemInSubAccordingId(ctgrData.subItems, triggerId, newItemBoxData)
                                    LocStorage.setItem('items', items);
                                    //vložení trigger elementu do item boxu
                                    const boxItem = flexBoxItem.crtFlexItemBox(newItemBoxData, trggrCtgrName);
                                    
                                    trigger.append(boxItem);
                                
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Finds trigger item in category and replaces it with newItem, in which this old one is
     * @param itemsInCtgr 
     * @param triggerId 
     * @param newItem 
     */
    pasteItemAccordingId(itemsInCtgr:item[] | undefined , triggerId:string, newItem:item){
        let result:boolean = false;
        if (!itemsInCtgr) {
            console.log('Item.subitems = undefined in fnc BoxItem.pasteItemAccordingId');
            return result = false;
        } 
        else {
            
            itemsInCtgr.forEach( (item, index, arrayItself) => {
                if (item.id === triggerId) {
                    arrayItself[index] = newItem;
                    result = true;
                    
                }
                else if(item.subItems){
                    let subItems = item.subItems as item[];
                   result = this.pasteItemAccordingId(subItems, triggerId, newItem)
                    
                }
            });
        }
        return result;
    }

    /**
     * Function for main container(the top container)
     * If trigger element is main container like frstMainBox, append new element always to the trigger element before all existing trigger siblings or if no siblings to the end
     * @param sblngs 
     * @param trigger 
     * @param boxItem 
     */
    private appndInTriggerElm(sblngs:NodeList | undefined, trigger:HTMLElement, newElm:HTMLElement ){
        //pokud je parrent vrcholný contejner typu frstMainBox, přidej item dovnitř něj, nikdy naopak
        if(sblngs){
           
            /* trigger?.insertBefore(newElm, sblngs[0]); */
            trigger?.append(newElm);
        }
        else {
            
            trigger?.append(newElm);
        }
    }

    /**
     * Function for items(item can be container like boxItem except MAIN(top) container)
     * If trigger element is item like img or item box, append new element always to the trigger PARENT element where the trigger element was located
     * @param nextSblng 
     * @param triggerPrnt 
     * @param newElm 
     */
    private appndInTrggrParntElm(nextSblng: ChildNode | null, previousSblng:ChildNode | null, triggerPrnt:HTMLElement , newElm:HTMLElement ){
        if(nextSblng){
            
            triggerPrnt?.insertBefore(newElm, nextSblng);
        }
        else if (previousSblng) {
            
            previousSblng.after(newElm);
            
        } 
        else {
            
            triggerPrnt?.append(newElm);
        }
    }

    
    public crtFlexItemBox(item:item, ctgrId:ctgrId) {
        const boxItem = this.createFlexContainer(undefined, {});

        //přidej třídu do DOM
        let key: keyof typeof item.classes;
        for ( key in item.classes) {
            if (item.classes.hasOwnProperty(key)) {
                item.classes[key].forEach( classs => {
                    boxItem.classList.add(classs);
                });
            }
        }
        if (item.inlStyl) {
        let key: keyof typeof item.inlStyl;
            for ( key in item.inlStyl) {
                if (Object.prototype.hasOwnProperty(key)) {
                    const element = item.inlStyl[key];
                    
                }
            }
        }
        if (item.img) {
            boxItem.style.backgroundImage = "url('" + item.img + "')";
        }
        boxItem.setAttribute('id', item.id);
        boxItem.setAttribute('data-category',ctgrId);
        boxItem.setAttribute('data-kind','boxItem');
        return boxItem;
    }


    private rplcItem(items:item[], ctgrId:ctgrId, newItemBox:item){
        for (const item of items) {
            if (item.id === ctgrId) {
                if (item.subItems) {
                    item.subItems!.forEach( (item) => {
                        if(item.id === newItemBox.id){
                            item = newItemBox;
                        }
                    });
                }
            }
        }
    }

    public rmvBoxItemAll(e:Event){
        if ((<HTMLElement>e.target).id === 'rmv-boxItem-all') {
            console.log('rmv-boxItem-all');
            const itemMenu = (<HTMLElement>e.target).closest('#itemMenu');
            const triggerId = itemMenu?.getAttribute('data-triggerid');
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if(trigger){
                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');

                    //Local Storage part
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

                        if (LocStorage.rmvItem(ctgrData.subItems,triggerId)) {
                            LocStorage.setItem('items', items);
                            //DOM part
                            trigger.remove();
                        }
                    }
                }
            }
        }
    }

    public rmvBoxItem(e:Event){
        if ((<HTMLElement>e.target).id === 'rmv-boxItem') {
            console.log('rmv-boxItem');
            const itemMenu = (<HTMLElement>e.target).closest('#itemMenu');
            const triggerId = itemMenu?.getAttribute('data-triggerid');
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if(trigger){
                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');

                    //Local Storage part
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
                        const triggerParrent = trigger.parentElement;
                        if(triggerParrent){
                            //pokud není main container rodič triggeru
                            if (triggerParrent.id !== trggrCtgrName) {
                                if (LocStorage.rplcTrggrWTrggrSubItems(ctgrData.subItems,triggerParrent.id, triggerId)) {
                                
                                    LocStorage.setItem('items', items);
                                } 
                            }
                            else{
                                if (LocStorage.rplcTrggrWTrggrSubItemsInMain(ctgrData.subItems, triggerId)) {
                                
                                    LocStorage.setItem('items', items);
                                } 
                                
                            }
                            //DOM part
                            let triggerChildren = trigger.children;
                            let triggerNextSblng = trigger.nextSibling;
                            trigger.remove();
                            for (let index = 0; index <= triggerChildren.length;) {
                                if(triggerChildren.length){
                                    console.log('index === 0',triggerChildren);
                                    triggerParrent.insertBefore(triggerChildren[index],triggerNextSblng);
                                }
                                else{
                                    break;
                                }
                                /* else{
                                    console.log('index !== 0',triggerChildren);
                                    triggerParrent.insertBefore(triggerChildren[index],triggerChildren[index-1])
                                } */
                            }
                        }
                    }
                }
            }
        }
    }

    /* public edtBoxItems(e:Event){
        const trggrPrntKind = localStorage.getItem('trggrPrntKind');
        if (trggrPrntKind) {
            if ((<HTMLElement>e.target).id === 'edt-outerBox' && trggrPrntKind === 'boxItem') {
                e.preventDefault();
                console.log('edt-outerBox, boxItem');

                const triggerId = localStorage.getItem('triggerid');
                if (triggerId) {
                    const trigger = document.getElementById(triggerId);
                    if(trigger){
                        const triggerCategory = <ctgrId>trigger.getAttribute('data-category');
                    
                        const inputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll('#outerBox-preset input');
                        let presets: string[] = [];
                        inputs.forEach((input) => {
                            if (input.checked) {
                                presets.push(input.value);
                            }
                        });
                        console.log(presets);
                        
                        let triggerData = <item | null>{};
                        const items = LocStorage.getItems('items');
                        
                        //pokud trigger není boxItem a zároveň trigger parent je boxItem
                        const triggerPrnt = trigger.parentElement;
                        if(triggerPrnt){
                            if (triggerData = LocStorage.findItem(items[triggerCategory].subItems, triggerPrnt.id)) {

                                if(presets.length){
                                    triggerData.classes.position.forEach(classs => {
                                        console.log('ano, obsahuji css tridu, co je v pameti')
                                    if (triggerPrnt.classList.contains(classs)) {
                                        triggerPrnt.classList.remove(classs);
                                    } 
                                    });
                                    triggerData.classes.position =[];
                                    presets.forEach(classs => {
                                        triggerPrnt.classList.add(classs);
                                        triggerData!.classes.position.push(classs);
                                    });
                                }
                            }
                            console.log(triggerData);
                            
                            LocStorage.setItem('items', items);
                            
                            //Local Storage part
                            const items = LocStorage.getItems('items');
                            LocStorage.rmvItem(items[triggerCategory],triggerId);
                            LocStorage.setItem('items', items);
                            //DOM part
                            trigger.remove(); 
                        }
                    }
                }
            }
        }
    } */

    public edtboxItemPstn(runFnc:runBoxItemFnc){
        return(e:Event)=>{
        if ((<HTMLElement>e.target).id === runFnc.edt.box.pstn  || (<HTMLElement>e.target).id === runFnc.edt.outerBox.pstn ){
            e.preventDefault();
            console.log((<HTMLElement>e.target).id);
            let triggerId;
            if ((<HTMLElement>e.target).id === runFnc.edt.box.pstn) {
                triggerId = localStorage.getItem('triggerid');
            }
            else if ((<HTMLElement>e.target).id === runFnc.edt.outerBox.pstn) {
                triggerId = localStorage.getItem('trggrPrntId');
            }
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if(trigger){
                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');
                
                    const inputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll('#edt-box-preset input');
                    let presets: string[] = [];
                    inputs.forEach((input) => {
                        if (input.checked) {
                            presets.push(input.value);
                        }
                    });
                    console.log(presets);
                    
                    let triggerData = <item | null>{};
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
                        if (triggerData = LocStorage.findItem(ctgrData.subItems, triggerId)) {
                            if(presets.length){
                                triggerData.classes.position.forEach(classs => {
                                    console.log('ano, obsahuji css tridu, co je v pameti')
                                if (trigger.classList.contains(classs)) {
                                    trigger.classList.remove(classs);
                                } 
                                });
                                triggerData.classes.position =[];
                                presets.forEach(classs => {
                                        trigger.classList.add(classs);
                                        triggerData!.classes.position.push(classs);
                                });
                            }
                        } 
                        console.log(triggerData);
                        
                        LocStorage.setItem('items', items);

                        /*
                        //Local Storage part
                        const items = LocStorage.getItems('items');
                        LocStorage.rmvItem(items[triggerCategory],triggerId);
                        LocStorage.setItem('items', items);
                        //DOM part
                        trigger.remove();  */
                    }
                }
            }
        }
    }
    }

    public edtOuterBoxItem(e:Event){
        if ((<HTMLElement>e.target).id === 'edt-outer-boxItem' ) {
            e.preventDefault();
            console.log('edt-outer-boxItem');

            const triggerPrntId = localStorage.getItem('trggrPrntId');
            if (triggerPrntId) {
                const triggerPrnt = document.getElementById(triggerPrntId);
                if(triggerPrnt){
                    const trggrCtgrName = <ctgrId>triggerPrnt.getAttribute('data-category');
                
                    const inputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll('#edt-box-preset input');
                    let presets: string[] = [];
                    inputs.forEach((input) => {
                        if (input.checked) {
                            presets.push(input.value);
                        }
                    });
                    console.log(presets);
                    
                    let triggerData = <item | null>{};
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
                        if (triggerData = LocStorage.findItem(ctgrData.subItems, triggerPrntId)) {
                            if(presets.length){
                                triggerData.classes.position.forEach(classs => {
                                    console.log('ano, obsahuji css tridu, co je v pameti')
                                if (triggerPrnt.classList.contains(classs)) {
                                    triggerPrnt.classList.remove(classs);
                                } 
                                });
                                triggerData.classes.position =[];
                                presets.forEach(classs => {
                                    triggerPrnt.classList.add(classs);
                                        triggerData!.classes.position.push(classs);
                                });
                            }
                        } 
                        console.log(triggerData);
                        
                        LocStorage.setItem('items', items);

                        /*
                        //Local Storage part
                        const items = LocStorage.getItems('items');
                        LocStorage.rmvItem(items[triggerCategory],triggerId);
                        LocStorage.setItem('items', items);
                        //DOM part
                        trigger.remove();  */
                    }
                }
            }
        }
    }
    

}


