import { Flex } from "../../../../HTMLComponents/flexBox/Flex"
import { LocStorage } from '../../../../common/localStorage/LocStorage';
import { InputGetter } from '../../../../common/inputGetter/InputGetter';
import { ShowHideMenu } from "../../Menu/ShowHideMenu/ShowHideMenu";


//Error
import { ExistInLocStorageError } from "../../../../common/error/locStorageError/ExistInLocStorageError";

// Interfaces/Types
import { ctgrId } from "../../../editorTypes";
import { bttns, runBoxItemFncIds, scndMenuBoxItemIds } from './objectInterfaces';
import { item, boxItemClass,} from "../../../../common/localStorage/storageInterfaces";

// Scss
import styles from './boxItem.module.scss';
import stylEditor from "../../../editor.module.scss"
import stylIMenu from "../../Menu/FrstMenu/frstMenu.module.scss"
import { Item } from './../Item';


let debug = false;

export class BoxItem extends Flex{

    //names
    static readonly flexDrctn = 'flexDrctn';
    static readonly width = 'width';

    public scndMenuIds: scndMenuBoxItemIds;
    public bttns: bttns;

    //Dependencies
    private item:Item;

    constructor(item:Item){
        super();
        this.item = item;

        this.scndMenuIds = {
            runScndMenu:{
                edt:{
                    box:{
                        pstn: 'edt-box-pstn-scndMenu-radioPstnBox',
                        drctn: 'edt-box-drctn-scndMenu-radio',
                        grow:'edt-box-grow-scndMenu-radio',
                        bckgrnd: 'edt-box-bckgrnd-scndMenu-bttn',
                        rszPixel:'rsz-boxItem-pixel-scndMenu-bttn'
                    },
                    outerBox:{
                        pstn: 'edt-outerBox-pstn-scndMenu-radioPstnBox',
                        drctn:'edt-outerBox-drctn-scndMenu-radio',
                        grow:'edt-outerBox-grow-scndMenu-radio',
                        bckgrnd: 'edt-outerBox-bckgrnd-scndMenu-bttn',
                        rszPixel:'rsz-outerBoxItem-pixel-scndMenu-bttn'
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
                    outerBox:'add-outerBoxItem'
                }
            }
        };

        this.bttns = {
            frstMenu:{
                theMenu:[            
                    {id: 'edt-box', type:'button', text :'Edit box', notClose:'doNotClose', subMenu:[
                        {id: this.scndMenuIds.runScndMenu.edt.box.bckgrnd, type:'file', text :'Background' },
                        {id: this.scndMenuIds.runScndMenu.edt.box.rszPixel, type:'button', text :'Pixel resize'},
                        {id: this.item.scndMenuIds.runScndMenu.edt.item.rszPercent, type:'button', text :'Percent resize'},
                        {id: this.scndMenuIds.runScndMenu.edt.box.pstn, type:'button', text :'Edit position'},
                        {id: this.scndMenuIds.runScndMenu.edt.box.drctn, type:'button', text :'Edit direction'},
                        {id: this.scndMenuIds.runScndMenu.edt.box.grow, type:'button', text:'Edit grow'},
                        
                    ]},
                    {id: 'edt-outerBox', type:'button', text :'Edit outer BOX',notClose:'doNotClose', subMenu:[]},
                    {id: 'add', type:'button', text :'Add', notClose:'doNotClose', subMenu:[
                        {id: this.scndMenuIds.runScndMenu.add.innerBox, type:'button', text :'Add inner box'},
                        {id: this.scndMenuIds.runScndMenu.add.outerBox, type:'button', text :'Add outer box'},
                        {id: 'add-imageItem', type:'file', text :'Add image',
                            input:{
                                id: 'image_input',
                                type:'file',
                                accept:"image/jpeg, image,/png"
                                }
                        },
                        
                    ]},
                    {id: 'move-item', type:'button', text :'Move box'},
                    {id: 'rmv', type:'button', text :'Remove', notClose:'doNotClose', subMenu:[
                        {id: 'rmv-boxItem', type:'button', text :'Remove item box'},
                        {id: 'rmv-boxItem-all', type:'button', text :'Remove item box and all in it'}
        
                    ]},
                ],
                subMenuEdtOuter:[
                    {id: this.scndMenuIds.runScndMenu.edt.outerBox.bckgrnd, type:'button', text :'Background'},
                    {id: this.scndMenuIds.runScndMenu.edt.outerBox.rszPixel, type:'button', text :'Pixel resize'},
                    {id: this.item.scndMenuIds.runScndMenu.edt.outerBoxItem.rszPercent, type:'button', text :'Percent resize'},
                    {id: this.scndMenuIds.runScndMenu.edt.outerBox.pstn, type:'button', text :'Edit position'},
                    {id: this.scndMenuIds.runScndMenu.edt.outerBox.drctn, type:'button', text :'Edit direction'},
                    {id: this.scndMenuIds.runScndMenu.edt.outerBox.grow, type:'button', text:'Edit grow'},
                ]
            },
            scndMenu:{
                bckGrnd:[
                    {id: this.scndMenuIds.runFnc.edt.box.bckgrnd.clickInput, type:'button', text:'Add background image',
                        input:{
                            id: this.scndMenuIds.runFnc.edt.box.bckgrnd.runFnc,
                            type:'file',
                            accept:"image/jpeg, image,/png"
                        }
                    },
                    {id: this.scndMenuIds.runFnc.rmv.box.bckgrnd, type:'button', text:'Remove background image'},
                ],
                bckGrndOuter:[
                    {id: this.scndMenuIds.runFnc.edt.outerBox.bckgrnd.clickInput, type:'button', text:'Add background image',
                        input:{
                            id: this.scndMenuIds.runFnc.edt.outerBox.bckgrnd.runFnc,
                            type:'file',
                            accept:"image/jpeg, image,/png"
                        }
                    },
                    {id: this.scndMenuIds.runFnc.rmv.outerBox.bckgrnd, type:'button', text:'Remove background image'},
                ],
                grow:[
                    {id: 'grow', type:'radio', name :'grow', value:'grow', text:'Grow'},
                    {id: 'noGrow', type:'radio', name :'grow', value:'noGrow', text:'No grow'},
                ],
                addBoxItem:[
                    {id: 'horizontal', type:'radio', name : BoxItem.flexDrctn, value:'horizontal', text:'Horizontal'},
                    {id: 'vertical', type:'radio', name : BoxItem.flexDrctn, value:'vertical', text:'Vertical', checked:'checked'},
                    {id: 'grow', type:'radio', name : BoxItem.width, value:'grow', text:'Grow', checked:'checked'},
                    {id: 'noGrow', type:'radio', name :BoxItem.width, value:'noGrow', text:'Fit content'},
                ],
                rszPixel:[
                    {id: 'rsz-box-width', type:'button', text:'Resize width'},
                    {id: 'rsz-box-height', type:'button', text:'Resize height'},
                    {id: 'rsz-box-both', type:'button', text:'Resize both'},
                    {id: 'rsz-box-pxl', type:'button', text:'Resize with pixels'}
                ],
                rszPixelOuter:[
                    {id: 'rsz-outerBox-width', type:'button', text:'Resize width'},
                    {id: 'rsz-outerBox-height', type:'button', text:'Resize height'},
                    {id: 'rsz-outerBox-both', type:'button', text:'Resize both'},
                    {id: 'rsz-outerBox-pxl', type:'button', text:'Resize with pixels'}
                ]
               
            }
        }

        
    }

    public addImgBckGrnd(runFnc:runBoxItemFncIds){
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
     public fileReader(runFnc:runBoxItemFncIds){
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
    
    public rmvBoxBckGrnd(runFnc:runBoxItemFncIds){
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

    public edtGrow(runFnc:runBoxItemFncIds){
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

    public edtBoxDcrtn(runFnc:runBoxItemFncIds){
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
            if ((<HTMLElement>e.target).id === flexBoxItem.scndMenuIds.runFnc.add.outerBox){
                console.log(flexBoxItem.scndMenuIds.runFnc.add.outerBox)
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
            if ((<HTMLElement>e.target).id === flexBoxItem.scndMenuIds.runFnc.add.innerBox){
                e.preventDefault();
                console.log(flexBoxItem.scndMenuIds.runFnc.add.innerBox)
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

    public edtboxItemPstn(runFnc:runBoxItemFncIds){
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

    public rszPixelState(item:Item){
        return (e:Event)=>{
        if (
        (<HTMLElement>e.target).id === 'rsz-box-width' ||
        (<HTMLElement>e.target).id === 'rsz-box-height' ||
        (<HTMLElement>e.target).id === 'rsz-box-both' ||
        (<HTMLElement>e.target).id === 'rsz-outerBox-width' ||
        (<HTMLElement>e.target).id === 'rsz-outerBox-height' ||
        (<HTMLElement>e.target).id === 'rsz-outerBox-both' 
        ){
            console.log(`rsz item...${(<HTMLElement>e.target).id}`);
            let triggerId;
            let menuTrggrId;
            if (
            (<HTMLElement>e.target).id === 'rsz-box-width' ||
            (<HTMLElement>e.target).id === 'rsz-box-height' ||
            (<HTMLElement>e.target).id === 'rsz-box-both') {
                triggerId = localStorage.getItem('triggerid');
            }
            else if (
            (<HTMLElement>e.target).id === 'rsz-outerBox-width' ||
            (<HTMLElement>e.target).id === 'rsz-outerBox-height' ||
            (<HTMLElement>e.target).id === 'rsz-outerBox-both' ){
                triggerId = localStorage.getItem('trggrPrntId');
                menuTrggrId = localStorage.getItem('triggerid');
            }
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if(trigger){
                    const triggerCategory = <ctgrId>trigger.getAttribute('data-category');

                    localStorage.setItem('resizingItem', triggerId);
                    //if trigger contains grow property, set style width/height and remove grow
                    trigger.style.position = 'relative';
                    trigger.style.overflow = 'hidden';
                    
                    //item.resizeEven(trigger, item);
                    trigger.classList.add(stylEditor.focus);
                    if (menuTrggrId) {
                        let menuTrggr = document.getElementById(menuTrggrId);
                        if (menuTrggr) {
                            menuTrggr.classList.remove(stylIMenu.hasNav);
                        }
                    }
                    else {
                        trigger.classList.remove(stylIMenu.hasNav);
                    }
                    
                    var resizer = document.createElement('div');
                    resizer.id = 'resizer';
                    resizer.style.width = '10px';
                    resizer.style.height = '10px';
                    resizer.style.background = 'red';
                    resizer.style.position = 'absolute';
                    resizer.style.right = '0';
                    resizer.style.bottom = '0';
                    resizer.style.cursor = 'se-resize';
                    trigger.appendChild(resizer);
                    
                    switch ((<HTMLElement>e.target).id) {
                        case 'rsz-box-width':
                        case'rsz-outerBox-width':
                            localStorage.setItem('rszItem', 'rsz-width');

                            if (trigger.classList.contains('grow')) {
                                if (trigger.parentElement?.classList.contains('horizontal')) {
                                    trigger.style.width = `${trigger.offsetWidth}px`; 
                                    trigger.classList.remove('grow');
                                }
                            }

                            var resizeWidth = function (e:Event) {
                                console.log('pageX',(<MouseEvent>e).pageX);
                                //offsetLeft takes the nearest POSITIONED parentElement
                                trigger.style.width = ((<MouseEvent>e).pageX - trigger.offsetLeft -15) + 'px';
                                
                            }
                            
                            var stopResize = function () {
                                window.removeEventListener('mousemove', resizeWidth, false);
                                window.removeEventListener('mouseup', stopResize, false);
                            }
                            
                            var initResize= function () {
                                e.preventDefault()
                                window.addEventListener('mousemove', resizeWidth, false);
                                window.addEventListener('mouseup', stopResize, false);
                            }
                    
                            resizer.addEventListener('mousedown', initResize, false);
                        break;
                        case 'rsz-box-height':
                        case 'rsz-outerBox-height':
                            localStorage.setItem('rszItem', 'rsz-height');

                            if (trigger.classList.contains('grow')) {
                                if (trigger.parentElement?.classList.contains('vertical')) {
                                    trigger.style.height = `${trigger.offsetHeight}px`; 
                                    trigger.classList.remove('grow');
                                }
                            }

                            var resizeHeight = function (e:Event) {
                                trigger.style.height = ((<MouseEvent>e).pageY - trigger.offsetTop - 32) + 'px';
                            }
                            
                            var stopResize = function () {
                                window.removeEventListener('mousemove', resizeHeight, false);
                                window.removeEventListener('mouseup', stopResize, false);
                            }
                            
                            var initResize= function () {
                                window.addEventListener('mousemove', resizeHeight, false);
                                window.addEventListener('mouseup', stopResize, false);
                            }
                            console.log('adfadsff')
                            resizer.addEventListener('mousedown', initResize, false);
                        break;
                        case 'rsz-box-both':
                        case 'rsz-outerBox-both':
                            localStorage.setItem('rszItem', 'rsz-both');

                            if (trigger.classList.contains('grow')) {
                                if (trigger.parentElement?.classList.contains('horizontal')) {
                                    trigger.style.width = `${trigger.offsetWidth}px`; 
                                }
                                if (trigger.parentElement?.classList.contains('vertical')) {
                                    trigger.style.height = `${trigger.offsetHeight}px`; 
                                }
                                trigger.classList.remove('grow');
                                
                            }
                            
                            var resizeBoth = function (e:Event) {
                                
                                trigger.style.width = ((<MouseEvent>e).pageX - trigger.offsetLeft - 22) + 'px';
                                trigger.style.height = ((<MouseEvent>e).pageY - trigger.offsetTop - 32) + 'px';
                            }
                            
                            var stopResize = function () {
                                window.removeEventListener('mousemove', resizeBoth, false);
                                window.removeEventListener('mouseup', stopResize, false);
                            }
                            
                            var initResize= function () {
                                window.addEventListener('mousemove', resizeBoth, false);
                                window.addEventListener('mouseup', stopResize, false);
                            }
                            console.log('adfadsff')
                            resizer.addEventListener('mousedown', initResize, false);
                        break;
                    }
                    ShowHideMenu.resize = true;
                }
            }
        }
    }
    }

    /**
     * Cancels rsz item
     * @param e 
     */
     public rszPixelEnd(e:Event){
        //musí být dvě funkce, jedna pro klik na button, druhá pro klik na označený boxItem třídou moveBox
        if ((<HTMLElement>e.target).id === 'rsz-item-pixel-end') {
            console.log('rsz-item-pixel-end');
            
          /*   const mainBox = document.getElementById('frstMainBox');
            mainBox?.classList.remove('hasNavRsz'); */
            
            let resizngItemId = localStorage.getItem('resizingItem');
            let resizngItem:HTMLElement | null;
            if (resizngItemId) {
                
                resizngItem = document.getElementById(resizngItemId);
                
                if (resizngItem) {
                    const trggrCtgrName = <ctgrId>resizngItem.getAttribute('data-category');
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
                        const rszingItemData = LocStorage.findItem(ctgrData.subItems, resizngItemId);
                        if (rszingItemData) {
                            //vrácení původních css tríd pro width
                            console.log((<boxItemClass>rszingItemData.classes).grow);
                            (<boxItemClass>rszingItemData.classes).grow.forEach(classs => {
                                    resizngItem!.classList.add(classs);
                                
                            });
                            if (rszingItemData.inlStyl) {
                                let iterator:keyof typeof rszingItemData.inlStyl;
                                for ( iterator in rszingItemData.inlStyl) {
                                    resizngItem!.style[`${iterator}`] = rszingItemData.inlStyl[iterator]!;
                                } 
                            }
                                
                        

                        
                            resizngItem.classList.remove(stylEditor.focus);
                            //remove style needed to resize 
                            resizngItem.style.position = '';
                            resizngItem.style.overflow = '';
                            
                            //if inline style width or hight is already in memory, do not delete these inline styles
                            if (!rszingItemData.inlStyl?.width ) {
                                resizngItem.style.width = '';
                            }
                            else if (!rszingItemData.inlStyl?.height) {
                                resizngItem.style.height = '';
                            }
                        }
                    }
                }
            }
            document.getElementById('resizer')?.remove();
            
            ShowHideMenu.resize = false;
            
        }
    }

    /**
     * Cancels move item
     * @param e 
     */
    public rszPixel(e:Event){
        //musí být dvě funkce, jedna pro klik na button, druhá pro klik na označený boxItem třídou moveBox
        if ((<HTMLElement>e.target).id === 'rsz-item-pixel') {
            console.log('rsz-item-pixel');
                let resizngItemId = localStorage.getItem('resizingItem');
                let resizngItem:HTMLElement | null;
                if (resizngItemId) {
                    
                    resizngItem = document.getElementById(resizngItemId);
                    if (resizngItem) {
                        const trggrCtgrName = <ctgrId>resizngItem.getAttribute('data-category');
                        resizngItem.classList.remove(stylEditor.focus);
                        //remove style needed to resize 
                        resizngItem.style.position = '';

                        //width and Height of resizingItem
                        
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
                            const rszItemData = LocStorage.findItem(ctgrData.subItems, resizngItemId);
                            if (rszItemData) {
                                let rszItemWidth;
                                let rszItemHeight;
                                const rszDrctn = localStorage.getItem('rszItem');
                                switch (rszDrctn) {
                                    case 'rsz-width':
                                        rszItemWidth = resizngItem.style.width;
                                        console.log(resizngItem.style.width);
                                        LocStorage.saveInlStylWidth(rszItemData, rszItemWidth);
                                        
                                        
                                        if (resizngItem.classList.contains('x100')) {
                                            resizngItem.classList.remove('x100');
                                            (<boxItemClass>rszItemData.classes).width[0] = 'x0';
                                        }

                                        if (resizngItem.parentElement?.classList.contains('horizontal')) {
                                                if ((<boxItemClass>rszItemData.classes).grow[0] === 'grow') {
                                                    (<boxItemClass>rszItemData!.classes).grow[0] = 'noGrow';
                                            }
                                        }
                                        break;
                                    case 'rsz-height':
                                        rszItemHeight = resizngItem.style.height;
                                        LocStorage.saveInlStylHeight(rszItemData,rszItemHeight);

                                        if (resizngItem.classList.contains('y100')) {
                                            resizngItem.classList.remove('y100');
                                            (<boxItemClass>rszItemData.classes).height[0] = 'y0';
                                        }

                                        if (resizngItem.parentElement?.classList.contains('vertical')) {
                                            if ((<boxItemClass>rszItemData.classes).grow[0] === 'grow') {
                                                (<boxItemClass>rszItemData!.classes).grow[0] = 'noGrow';
                                        }
                                    }
                                        break;
                                    case 'rsz-both':
                                        rszItemWidth = resizngItem.style.width;
                                        rszItemHeight = resizngItem.style.height;
                                        LocStorage.saveInlStylWidth(rszItemData, rszItemWidth);
                                        LocStorage.saveInlStylHeight(rszItemData,rszItemHeight);

                                        if (resizngItem.classList.contains('y100')) {
                                            resizngItem.classList.remove('y100');
                                            (<boxItemClass>rszItemData.classes).height[0] = 'y0';
                                        }
                                        if (resizngItem.classList.contains('x100')) {
                                            resizngItem.classList.remove('x100');
                                            (<boxItemClass>rszItemData.classes).width[0] = 'x0';
                                        }

                                        if (resizngItem.parentElement?.classList.contains('horizontal')) {
                                            if ((<boxItemClass>rszItemData.classes).grow[0] === 'grow') {
                                                (<boxItemClass>rszItemData!.classes).grow[0] = 'noGrow';
                                            }
                                        }
                                        if (resizngItem.parentElement?.classList.contains('vertical')) {
                                            if ((<boxItemClass>rszItemData.classes).grow[0] === 'grow') {
                                                (<boxItemClass>rszItemData!.classes).grow[0] = 'noGrow';
                                            }
                                        }
                                        break;
                                }
                                let saved = LocStorage.upgrItem(ctgrData.subItems, resizngItemId, rszItemData);
                                if (saved) {
                                    document.getElementById('resizer')?.remove();
                                    LocStorage.setItem('items', items)
                                    ShowHideMenu.resize = false;
                                }
                            }
                        }
                    }
                }
        }
    }
    

}


