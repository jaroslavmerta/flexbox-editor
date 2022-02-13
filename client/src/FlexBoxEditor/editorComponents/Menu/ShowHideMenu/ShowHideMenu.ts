import { buttonData } from '../menuIntrfc';
import { FrstMenu } from './../FrstMenu/FrstMenu';
import { ScndMenu } from './../ScndMenu/ScndMenu';
import styles from './showHideMenu.module.scss';
import stylEditor from "../../../editor.module.scss"
import { BoxItem } from './../../Item/BoxItem/BoxItem';
import { MainBox } from './../../MainBox/MainBox';
import { ImageItem } from './../../Item/ImageItem/ImageItem';
import { Item } from '../../Item/Item';
import { runBoxItemScndMenuIds } from '../../Item/BoxItem/objectInterfaces';
import { runImgItemScndMenuIds } from '../../Item/ImageItem/objectInterface';
import { runItemScndMenuIds } from '../../Item/objectInterfaces';
import { CheckId } from './../../../../common/error/checkId/CheckId';
import { runMainBoxScndMenuIds } from '../../MainBox/objectInterfaces';

const debugCheckEvTrgtIdForBttnId = false;

export class ShowHideMenu{

    //Turn on/off
    static move: boolean;
    static resize:boolean;

    //Dependencies
    private frstMenu: FrstMenu;
    private scndMenu: ScndMenu;
    private boxItem: BoxItem;
    private mainBox: MainBox;
    private imgItem: ImageItem;
    private item: Item;

    private moveStateMenu:buttonData[];
    private rszStateMenu: buttonData[];

    constructor(frstMenu: FrstMenu, scndMenu:ScndMenu, boxItem: BoxItem, mainBox:MainBox, imgItem:ImageItem, item: Item){
        this.frstMenu = frstMenu;
        this.scndMenu = scndMenu;
        this.boxItem = boxItem;
        this.mainBox = mainBox;
        this.imgItem = imgItem;
        this.item = item;

        //Move state menu
        this.moveStateMenu = [
            {id: 'move-item-here', type:'button', text :'Move item here'},
            {id: 'move-end', type:'button', text :'Cancel moving'},
        ];
        this.rszStateMenu = [
            {id: 'rsz-item-pixel', type:'button', text :'Save resized item'},
            {id: 'rsz-item-pixel-end', type:'button', text :'Cancel resize'},
        ]; 
    }

    /**
     * Checks event target id for first menu button id, that runs second menu
     * @param evTrgtId Event target id
     * @param boxItemScndMenuIds Collection of ids that runs second menu for BoxItem
     * @param imgItemScndMenuIds Collection of ids that runs second menu for ImageItem
     * @param itemScndMenuIds Collection of ids that runs second menu for Item
     * @param mainBoxScndMenuIds Collection of ids that runs second menu for MainBox
     * @returns boolean 
     */
    private checkEvTrgtIdForBttnId(evTrgtId:string, boxItemScndMenuIds:runBoxItemScndMenuIds, imgItemScndMenuIds:runImgItemScndMenuIds, itemScndMenuIds:runItemScndMenuIds, mainBoxScndMenuIds:runMainBoxScndMenuIds){
        let cutEvTarget = evTrgtId.split('-');
        switch (cutEvTarget[1]) {
            case 'boxItem':
                {
                    let key: keyof runBoxItemScndMenuIds;
                    for ( key in boxItemScndMenuIds ) {
                        for (const [k, v] of Object.entries(boxItemScndMenuIds[key].box)) {
                        
                            if (v === evTrgtId) {
                                return true;
                            }
                        }
                    }
                    if (debugCheckEvTrgtIdForBttnId)
                        console.log('Event target id is not in BoxItem scndMenuId; kind: boxItem');
                    return false;
                }
            break;
            case 'outerBoxItem':
                {
                    let key: keyof runBoxItemScndMenuIds;
                    for ( key in boxItemScndMenuIds ) {
                        for (const [k, v] of Object.entries(boxItemScndMenuIds[key].outerBox)) {
                        
                            if (v === evTrgtId) {
                                return true;
                            }
                        }
                    }
                    if (debugCheckEvTrgtIdForBttnId)
                        console.log('Event target id is not in BoxItem scndMenuId; kind: outerBox');
                    return false;
                }
            break;
            case 'mainBox':
                {
                    let key: keyof runMainBoxScndMenuIds;
                    for ( key in mainBoxScndMenuIds ) {
                        for (const [k, v] of Object.entries(mainBoxScndMenuIds[key].box)) {
                        
                            if (v === evTrgtId) {
                                return true;
                            }
                        }
                    }
                    if (debugCheckEvTrgtIdForBttnId)
                        console.log('Event target id is not in MainBox scndMenuId; kind: box');
                    return false;
                }
            break;
            case 'outerMainBox':
                {
                    let key: keyof runMainBoxScndMenuIds;
                    for ( key in mainBoxScndMenuIds ) {
                        for (const [k, v] of Object.entries(mainBoxScndMenuIds[key].outerBox)) {
                        
                            if (v === evTrgtId) {
                                return true;
                            }
                        }
                    }
                    if (debugCheckEvTrgtIdForBttnId)
                        console.log('Event target id is not in MainBox scndMenuId; kind: outerBox');
                    return false;
                }
            break;
            case 'imgItem':
                {
                    let key: keyof runImgItemScndMenuIds;
                    for ( key in imgItemScndMenuIds ) {
                        for (const [k, v] of Object.entries(imgItemScndMenuIds[key])) {
                            
                            if (v === evTrgtId) {
                                return true;
                            }
                        }
                    }
                    if (debugCheckEvTrgtIdForBttnId)
                        console.log('Event target id is not in ImageItem scndMenuId; kind: imgItem');
                    return false;
                }
            break;
            case 'item':
                {
                    let key: keyof runItemScndMenuIds;
                    for ( key in itemScndMenuIds ) {
                        for (const [k, v] of Object.entries(itemScndMenuIds[key].item)) {
                            
                            if (v === evTrgtId) {
                                return true;
                            }
                        }
                    }
                    if (debugCheckEvTrgtIdForBttnId)
                        console.log('Event target id is not in Item scndMenuId; kind: item');
                    return false;
                }
            break;
            case 'outerItem':
                {
                    let key: keyof runItemScndMenuIds;
                    for ( key in itemScndMenuIds ) {
                        for (const [k, v] of Object.entries(itemScndMenuIds[key].outerBoxItem)) {
                            if (v === evTrgtId) {
                                return true;
                            }
                        }
                    }
                    if (debugCheckEvTrgtIdForBttnId)
                        console.log('Event target id is not in Item scndMenuId; kind: outerBoxItem');
                    return false;
                }
            break;
            default:
                if (debugCheckEvTrgtIdForBttnId)
                    console.log("Event target Id does not exist in Items and MainBox property scndMenuIds");
                return false;
        }
    }

    /**
     * Show or hide RESIZE state menu
     * @returns 
     */
    public showHideStateMenuRsz (e:Event){
        if (ShowHideMenu.resize) {
            
            const frstMainBox = document.getElementById('frstMainBox');
            const evTarget = (<HTMLElement>e.target);

            if((
            //if event target is frstMainBox descendant and has no id 'resizer'
            frstMainBox?.contains(evTarget) && evTarget.id !== 'resizer') && 
            !frstMainBox.classList.contains('hasNavRsz')
            ){
            
                this.rmvMenu(frstMainBox, 'hasNavRsz');
            
                localStorage.setItem('triggerid', evTarget.id);
                frstMainBox.classList.add('hasNavRsz');

                this.showStateMenu(e,frstMainBox);
                
            }
            else if (frstMainBox){
                let frstMenuNav = document.getElementById('itemMenu');
                if(frstMenuNav){
                    if(!frstMenuNav.classList.contains(styles.hide)){
                        this.hideMenu(frstMainBox, frstMenuNav, 'hasNavRsz');
                    }   
                }
            }
        }
    }

    /**
     * Show or hide MOVE state menu
     * @returns 
     */
    public showHideStateMenuMove (e:Event){
        if (ShowHideMenu.move) {
            const evTarget = (<HTMLElement>e.target);
            const dataKind = evTarget.getAttribute('data-kind');

            if((
            evTarget.classList.contains('frstMainBox') || 
            evTarget.classList.contains('item') || 
            evTarget.classList.contains('scndMainBox')) && 
            !evTarget.classList.contains(styles.hasNavMove)/* !itemNav[0] */ 
            ){
                
                this.rmvMenu(evTarget, styles.hasNavMove);
                //outline se nadá přebýt, takže se musí odstranit moveBox před přidáním hasNavMove
                evTarget.classList.remove(stylEditor.moveBox);
                evTarget.classList.add(styles.hasNavMove);
                this.showStateMenu(e,evTarget);
                
                const prevItemId = localStorage.getItem('prevItem');
                let prevItem;
                if (prevItemId) {
                    prevItem = document.getElementById(prevItemId);
                }
                if (prevItem) {
                    
                    if ((dataKind === 'imageItem' || dataKind === 'boxItem') && prevItem.tagName !== 'IMG') {
                        prevItem.classList.add(stylEditor.moveBox);
                    }
                    
                }

                localStorage.setItem('prevItem', evTarget.id);
            }
            else {
                let frstMenuNav = document.getElementById('itemMenu');
                if(frstMenuNav){
                    if(!frstMenuNav.classList.contains(styles.hide)){
                        this.hideMenu(evTarget, frstMenuNav, styles.hasNavMove);
                        
                        if(dataKind !== 'imageItem')
                            evTarget.classList.add(stylEditor.moveBox);

                    }   
                }
            }
        }
    
    }

    /**
     * Shows and hide menu
     * @param showHideMenu Instance of this class to call its functions
     * @returns 
     */
    public showHideMenu(showHideMenu:ShowHideMenu){
        return(e:Event)=> {
            if ( !ShowHideMenu.move && !ShowHideMenu.resize ) {
            
                const evTarget = (<HTMLElement>e.target);
            
                //pokud je target item a ještě nemá menu
                if ((
                (evTarget.classList.contains('frstMainBox') || 
                evTarget.classList.contains('item') || 
                evTarget.classList.contains('scndMainBox')) && 
                !evTarget.classList.contains(styles.hasNav) || 
                this.checkEvTrgtIdForBttnId(evTarget.id, this.boxItem.scndMenuIds.runScndMenu, this.imgItem.scndMenuIds.runScndMenu, this.item.scndMenuIds.runScndMenu, this.mainBox.scndMenuIds.runScndMenu))
                ) {
                    
                    //pokud je otevřené menu v itemu, ale klikne se po druhé na jiný item,
                    //odstraní existující menu než se vytvoří nové v druhém itemu
                    showHideMenu.rmvMenu(evTarget, styles.hasNav);
                    //gives class hasNav to menuTarget, when user clicked on button that launches second menu
                    if(this.checkEvTrgtIdForBttnId(evTarget.id, this.boxItem.scndMenuIds.runScndMenu, this.imgItem.scndMenuIds.runScndMenu, this.item.scndMenuIds.runScndMenu, this.mainBox.scndMenuIds.runScndMenu)){
                        const menuTrgtId = localStorage.getItem('triggerid');
                        if(menuTrgtId){
                            const menuTrgt = document.getElementById(menuTrgtId);
                            if (menuTrgt) {
                                menuTrgt.classList.add(styles.hasNav);
                            }
                        }
                    }
                    else{//gives class hasNav to evTarget, when user clicked on frstMainBox, scndMainBox or item
                        localStorage.setItem('triggerid', evTarget.id);
                        evTarget.classList.add(styles.hasNav);
                    }
                    
                    showHideMenu.showMenu(e,evTarget);
                }
                else if(!evTarget.classList.contains('doNotClose')) {
                    let frstMenuNav = document.getElementById('itemMenu');
                    //console.log(frstMenuNav)
                    if(frstMenuNav){
                        if(!frstMenuNav.classList.contains(styles.hide)){
                            showHideMenu.hideMenu(evTarget, frstMenuNav, styles.hasNav);
                        }   
                    }
                }
            }
        }
    }

    /**
     * When item is clicked, show the First menu or the Second menu
     * @param e 
     */
    public showMenu(e:Event, evTarget:HTMLElement){
        let nav:HTMLElement = <HTMLElement>{};
        const dataKind = evTarget.getAttribute('data-kind');

        if((dataKind === 'mainBox') ||(dataKind === 'imageItem')|| (dataKind === 'boxItem')){
            //uloz trigger and trigger parent id and kind in local storage
            localStorage.setItem('triggerid', evTarget.id);
            let trggrKind = evTarget.getAttribute('data-kind');
            if (trggrKind) {
                localStorage.setItem('triggerkind', trggrKind);
            }

            let trggrPrnt = evTarget.parentElement;
            let trggrPrntKind: string | null = null;
            if (trggrPrnt) {
                trggrPrntKind = trggrPrnt.getAttribute('data-kind');
                if (trggrPrntKind) {
                    localStorage.setItem('trggrPrntKind', trggrPrntKind);
                }
                let trggrPrntId = trggrPrnt.id;
                localStorage.setItem('trggrPrntId', trggrPrntId);
            }

            //Menu part

            //First level of menu
            if((dataKind === 'mainBox')){
                nav = this.frstMenu.createFrstMenu(e, evTarget.id, this.mainBox.bttns.frstMenu.theMenu);
            }
            
            if(dataKind === 'imageItem'){
                if (trggrPrntKind) {
                    if (trggrPrntKind === 'boxItem' || trggrPrntKind === 'mainBox') {
                        nav = this.frstMenu.createFrstMenu(e, evTarget.id, this.imgItem.bttns.frstMenu.theMenu, trggrPrntKind);
                    }
                }
            }
            if(dataKind === 'boxItem'){
                if (trggrPrntKind) {
                    if (trggrPrntKind === 'boxItem'||trggrPrntKind === 'mainBox') {
                        nav = this.frstMenu.createFrstMenu(e, evTarget.id, this.boxItem.bttns.frstMenu.theMenu, trggrPrntKind);
                    }
                }
            }
        }
        else{
            //Second level of menu
            let scndMenu = this.scndMenu.crtScndMenu(e, evTarget.id);
            if (scndMenu) {
                nav = scndMenu;
            }
        }
        
        let root = document.getElementById('root');
        root?.appendChild(nav);
        
    }

    /**
     * When item is clicked, show state menu
     * @param e Event
     * @param evTarget Event target
     */
    public showStateMenu(e:Event, evTarget:HTMLElement){
    if (
    (evTarget.getAttribute('data-kind') === 'imageItem') || 
    (evTarget.getAttribute('data-kind') === 'mainBox') || 
    (evTarget.getAttribute('data-kind') === 'boxItem')
    ) {
        let nav:HTMLElement = <HTMLElement>{};
        if (ShowHideMenu.move) {
            nav = this.frstMenu.createFrstMenu(e, evTarget.id, this.moveStateMenu);
        }
        else if (ShowHideMenu.resize) {
            nav = this.frstMenu.createFrstMenu(e, evTarget.id, this.rszStateMenu);
        }
        let root = document.getElementById('root');

        root?.appendChild(nav);
        }
    }

    /**
     * 
     * @param evTarget 
     * @param frstMenu 
     * @param focusClass 
     */
    public hideMenu(evTarget:HTMLElement, frstMenu:HTMLElement, focusClass:string){
        frstMenu.classList.add(styles.hide);
        this.rmvFocusClass(evTarget, frstMenu, focusClass); 
    }

    /**
     * Removes item menu and class hasNav, that determines to which item menu was invoked
     */
    private rmvMenu(evTarget:HTMLElement, focusClass:string){
        //je v documentu tag nav s tímto id?
        const navTag = document.getElementById('itemMenu');
        if(navTag){
            this.rmvFocusClass(evTarget, navTag, focusClass);
            navTag.remove();
        }
    }

    /**
     * Removes class hasNav in item according to whether event target contains hasHav,removes it in this eventTarget,
     * otherwise get itemId in navigation atribute data-triggerid and removes hasItem in this item
     * Elements must have id atribute
     * @param navTag 
     */
    private rmvFocusClass(evTarget:HTMLElement, navTag:HTMLElement, focusClass:string){
        //pokud se znovu klikne do stejného elementu, kde už je otevřené menu, odstran v něm třídu hasNav
        if((evTarget.classList.contains('item') || evTarget.classList.contains('frstMainBox')) && evTarget.classList.contains(focusClass)){
            evTarget.classList.remove(focusClass);
            console.log('removes id via checking classes');
        }
        else{
            //spustí se při kliknutí na button, kde není id, ani class item nebo frstMainBox, a také se spustí,když je otevřené menu na jednom itemu
            //a klikne se na jiný item, v tu chvíli tento jiný item nemá třídu hasNav a je event targetem, takže pro odstranění třídy hasNav 
            // na přechozím itemu se musí využít záznam id atributu tohoto předchozího itemu v tagu nav v atributu data-trigger a odstranit třídu na něm
            
            console.log('Removes hasNav via triggerid')
            let triggerId = localStorage.getItem('triggerid');
            if(triggerId){
                const prevMenuItem = document.getElementById(triggerId);
                prevMenuItem?.classList.remove(focusClass);
            }
            
        }
    }
}