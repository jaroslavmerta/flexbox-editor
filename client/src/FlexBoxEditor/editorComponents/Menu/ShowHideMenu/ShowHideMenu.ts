import { buttonData } from '../menuIntrfc';
import { FrstMenu } from './../FrstMenu/FrstMenu';
import { ScndMenu } from './../ScndMenu/ScndMenu';
import styles from './showHideMenu.module.scss';
import stylEditor from "../../../editor.module.scss"
import { BoxItem } from './../../Item/BoxItem/BoxItem';
import { MainBox } from './../../MainBox/MainBox';
import { ImageItem } from './../../Item/ImageItem/ImageItem';

export class ShowHideMenu{

    //Turn on/off
    static move: boolean;
    static resize:boolean;

    //Dependencies
    private frstMenu: FrstMenu;
    private scndMenu: ScndMenu;
    private boxItem: BoxItem;
    private mainBox: MainBox;
    private imageItem: ImageItem;

    private moveStateMenu:buttonData[];
    private rszStateMenu: buttonData[];

    constructor(frstMenu: FrstMenu, scndMenu:ScndMenu, boxItem: BoxItem, mainBox:MainBox, imageItem:ImageItem){
        this.frstMenu = frstMenu;
        this.scndMenu = scndMenu;
        this.boxItem = boxItem;
        this.mainBox = mainBox;
        this.imageItem = imageItem;

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

    public showHideMenu(showHideMenu:ShowHideMenu){
        return(e:Event)=> {
            
            //pro odlišení více menu, změň id např. na frstMainBoxFrstMenu apod.
            if(!(<HTMLElement>e.target).classList.contains('itemMenu') ){

                const evTarget = (<HTMLElement>e.target);
                const dataKind = evTarget.getAttribute('data-kind');
                const frstMainBox = document.getElementById('frstMainBox');
                //vytvořit objekt FrstMenu, asi statický, ve kterém se předá argument 'move', který 
                //v menu signalizuje, at se nezobrazuje klasické menu, ale jen button pro ukončení move akce
                if (ShowHideMenu.resize) {
                   
                    if((
                        //pokud je evTarget potomkem komiksu a nemá id resizer
                        frstMainBox?.contains(evTarget) && evTarget.id !== 'resizer') && 
                        !frstMainBox.classList.contains('hasNavRsz')
                        ){
                       
                        showHideMenu.rmvMenu(frstMainBox, 'hasNavRsz');
                       
                        localStorage.setItem('triggerid', evTarget.id);
                        frstMainBox.classList.add('hasNavRsz');

                        showHideMenu.showStateMenu(e,frstMainBox);
                        
                    }
                    else if (frstMainBox){
                        let frstMenuNav = document.getElementById('itemMenu');
                        if(frstMenuNav){
                            if(!frstMenuNav.classList.contains(styles.hide)){
                                showHideMenu.hideMenu(frstMainBox, frstMenuNav, 'hasNavRsz');

                            }   
                        }
                    }
                }
                else if (ShowHideMenu.move) {
                   
                    if((
                        evTarget.classList.contains('frstMainBox') || 
                        evTarget.classList.contains('item') || 
                        evTarget.classList.contains('scndMainBox')) && 
                        !evTarget.classList.contains(styles.hasNavMove)/* !itemNav[0] */ 
                        ){
                        
                        showHideMenu.rmvMenu(evTarget, styles.hasNavMove);
                        //outline se nadá přebýt, takže se musí odstranit moveBox před přidáním hasNavMove
                        evTarget.classList.remove(stylEditor.moveBox);
                        evTarget.classList.add(styles.hasNavMove);
                        showHideMenu.showStateMenu(e,evTarget);
                        
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
                                showHideMenu.hideMenu(evTarget, frstMenuNav, styles.hasNavMove);
                                
                                if(dataKind !== 'imageItem')
                                    evTarget.classList.add(stylEditor.moveBox);

                            }   
                        }
                    }
                }
                else{
                    //pokud je target item a ještě nemá menu
                    if ((
                    evTarget.classList.contains('frstMainBox') || 
                    evTarget.classList.contains('item') || 
                    evTarget.classList.contains('scndMainBox') ||
                    evTarget.id === 'edt-img-pstn-scndMenu-radioPstnImg' ||
                    evTarget.id === 'add-outerBox-scndMenu-radio' || //
                    evTarget.id === this.boxItem.scndMenu.runScndMenu.add.innerBox || //
                    evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.pstn || //
                    evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.outerBox.drctn || //
                    evTarget.id === 'rsz-item-pixel-scndMenu-bttn' || 
                    evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.grow || //
                    evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.outerBox.grow || //
                    evTarget.id === 'rsz-item-percent-scndMenu-radio' || 
                    evTarget.id === 'rsz-outerBox-percent-scndMenu-radio' || 
                    evTarget.id === 'rsz-outerBox-pixel-scndMenu-bttn' || 
                    evTarget.id === 'edt-outerMainBox-drctn-scndMenu-radio' || 
                    evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.drctn || //
                    evTarget.id === 'edt-mainBox-drctn-scndMenu-radio' || 
                    evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.pstn || //
                    evTarget.id === 'edt-outerMainBox-pstn-scndMenu-radioPstnBox' || 
                    evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.bckgrnd || //
                    evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.outerBox.bckgrnd || //
                    evTarget.id === 'add-mainBox-bckgrnd-scndMenu-bttn' || 
                    evTarget.id === 'edt-mainBox-pstn-scndMenu-radioPstnBox') && 
                    !evTarget.classList.contains(styles.hasNav)/* !itemNav[0] */ 
                    ) {
                        
                        //pokud je otevřené menu v itemu, ale klikne se po druhé na jiný item,
                        //odstraní existující menu než se vytvoří nové v druhém itemu
                        showHideMenu.rmvMenu(evTarget, styles.hasNav);
                        if((evTarget.id === 'add-mainBox-bckgrnd-scndMenu-bttn') ||(evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.outerBox.bckgrnd) ||(evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.bckgrnd) ||(evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.pstn) || (evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.pstn)||(evTarget.id === 'edt-mainBox-drctn-scndMenu-radio')||(evTarget.id === 'edt-outerMainBox-drctn-scndMenu-radio')||(evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.outerBox.drctn) ||(evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.outerBox.grow) ||(evTarget.id === 'rsz-outerBox-percent-scndMenu-radio') ||(evTarget.id === 'rsz-outerBox-pixel-scndMenu-bttn') ||(evTarget.id === 'rsz-item-percent-scndMenu-radio')||(evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.grow)||(evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.drctn) ||(evTarget.id === 'add-outerBox-scndMenu-radio') || (evTarget.id === 'rsz-item-pixel-scndMenu-bttn') ||(evTarget.id === this.boxItem.scndMenu.runScndMenu.add.innerBox) ||(evTarget.id === 'edt-img-pstn-scndMenu-radioPstnImg')|| (evTarget.id === 'edt-outerBox-preset') ||(evTarget.id === this.boxItem.scndMenu.runScndMenu.edt.box.pstn) || (evTarget.id === 'edt-mainBox-pstn-scndMenu-radioPstnBox')){
                            const menuTrgtId = localStorage.getItem('triggerid');
                            if(menuTrgtId){
                                const menuTrgt = document.getElementById(menuTrgtId);
                                if (menuTrgt) {
                                    menuTrgt.classList.add(styles.hasNav);
                                }
                            }
                        }
                        else{
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
    }

    /**
     * Callback, when item is clicked, show item menu
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
                    nav = this.frstMenu.createFrstMenu(e, evTarget.id, this.mainBox.clickedMainBox);
                }
                
                if(dataKind === 'imageItem'){
                    if (trggrPrntKind) {
                        if (trggrPrntKind === 'boxItem' || trggrPrntKind === 'mainBox') {
                            nav = this.frstMenu.createFrstMenu(e, evTarget.id, this.imageItem.clickedImg, trggrPrntKind);
                        }
                    }
                }
                if(dataKind === 'boxItem'){
                    if (trggrPrntKind) {
                        if (trggrPrntKind === 'boxItem'||trggrPrntKind === 'mainBox') {
                            nav = this.frstMenu.createFrstMenu(e, evTarget.id, this.boxItem.clickedIBox, trggrPrntKind);
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
     * Callback, when item is clicked, show item menu
     * @param e 
     */
    public showStateMenu(e:Event, evTarget:HTMLElement){
    if (
        (evTarget.getAttribute('data-kind') === 'imageItem') || 
        (evTarget.getAttribute('data-kind') === 'mainBox') || 
        (evTarget.getAttribute('data-kind') === 'boxItem')
        ) {
            const dataKind = evTarget.getAttribute('data-kind');

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
            console.log('zavírám menu pomocí kontroly tříd')
        }
        else{
            //spustí se při kliknutí na button, kde není id, ani class item nebo frstMainBox, a také se spustí,když je otevřené menu na jednom itemu
            //a klikne se na jiný item, v tu chvíli tento jiný item nemá třídu hasNav a je event targetem, takže pro odstranění třídy hasNav 
            // na přechozím itemu se musí využít záznam id atributu tohoto předchozího itemu v tagu nav v atributu data-trigger a odstranit třídu na něm
            console.log('zavírám menu pomocí data-triggerid')
            if(evTarget.id === 'add-boxItem-preset'){
               return;
            }
            else{
                
                let triggerId = localStorage.getItem('triggerid');
                if(triggerId){
                    const prevMenuItem = document.getElementById(triggerId);
                    prevMenuItem?.classList.remove(focusClass);
                }
            }
        }
    }
}