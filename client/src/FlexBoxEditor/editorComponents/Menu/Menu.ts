
import { anchData, buttonData } from './menuIntrfc';
import styles from './menu.module.scss'

export class Menu{
    
    protected navData: {id:string};

    constructor(){
        this.navData = {id: 'itemMenu'};
    }

    


    private crtTitleInDiv(titleText:string  ){
        const divBox = document.createElement('div');
        const title = document.createElement('h4');
        title.innerText = titleText;
        divBox.append(title);
        divBox.classList.add('doNotClose');
        
        return divBox;
    }

    /**
     * giveBttnsTitle
     */
    protected giveBttnsTitle(buttons:DocumentFragment, titleText:string, clas?:string ) {
        const titleBox = this.crtTitleInDiv(titleText);
        titleBox.append(buttons);
        if (clas) {
            titleBox.classList.add(clas);
        }
        return titleBox;
    }

    public crtNavMenuA(anchData:anchData[], navData:{id:string}){
        const ul = this.crtUlWA( anchData)
        const nav = document.createElement('nav');
        nav.setAttribute('id', navData.id)
        nav.appendChild(ul);

        return nav;
        
    }
    /**
     * Creates and returns unordered list with anchor inside
     * @param numberOfLi 
     * @param anchData 
     * @returns 
     */
    private crtUlWA( anchData:anchData[]){
        const ul = document.createElement('ul');  
        anchData.forEach( anch => {
            const li =  document.createElement('li');
            const a =  document.createElement('a');
            a.setAttribute('id',anch.id);
            a.innerText = anch.text;
            li.appendChild(a);
            ul.appendChild(li);
        })
            
        return ul;
    }   

    public crtNavMenuB(buttonData:buttonData[], navData:{id:string}, commonClass?:string){
        const ul = this.crtUlWB( buttonData, commonClass)
        const nav = document.createElement('nav');
        nav.setAttribute('id', navData.id)
        if(commonClass){
            nav.classList.add(commonClass);
        }
        nav.appendChild(ul);

        return nav;
        
    }
    /**
     * Creates and returns unordered list with button inside
     * @param numberOfLi 
     * @param anchData 
     * @returns 
     */
    private crtUlWB( buttonData:buttonData[], commonClass?:string){
        const ul = document.createElement('ul');  
        if(commonClass){
            ul.classList.add(commonClass);
        }
        buttonData.forEach( button => {
            const li =  document.createElement('li');
            const newButton =  document.createElement('button');
            newButton.setAttribute('id',button.id);
            newButton.setAttribute('type',button.type);
            if( button.text)
                newButton.innerText = button.text;
            if(commonClass){
                ul.classList.add(commonClass);
                li.classList.add(commonClass);
                
            }

            li.appendChild(newButton);
            ul.appendChild(li);
        })
            
        return ul;
    }
    //this
    public crtNavMenuBI(buttonData:buttonData[], navData:{id:string}, subMenuClas:string, subMenuPosX:string, subMenuPosY:string, commonClass?:string){
        const ul = this.crtUlWithBI( buttonData,subMenuClas,subMenuPosX, subMenuPosY, commonClass);
        const div = document.createElement('div');
        div.setAttribute('id', navData.id)
        if(commonClass){
            div.classList.add(commonClass);
        }
        div.appendChild(ul);

        return div;
    }

    public crtMenuBI(buttonData:buttonData[], navData:{id:string},subMenuClas?:string, commonClass?:string){
        const ul = this.crtUlWithBI( buttonData, subMenuClas, commonClass)
        const div = document.createElement('div');
        div.setAttribute('id', navData.id)
        if(commonClass){
            div.classList.add(commonClass);
        }
        div.appendChild(ul);

        return div;
    }


    /**
     * Creates and returns unordered list with button or input inside
     * @param buttonData 
     * @param commonClass 
     * @returns 
     */
    private crtUlWithBI( buttonData:buttonData[], subMenuClas?:string, subMenuPosX?:string, subMenuPosY?:string, commonClass?:string ){
        const ul = document.createElement('ul');  
        if(commonClass){
            ul.classList.add(commonClass);
        }
        buttonData.forEach( button => {
            const li =  document.createElement('li');
            li.setAttribute('id',button.id);
            
                                     
            let newButton =  document.createElement('button');
            newButton.setAttribute('id',button.id);
            newButton.setAttribute('type',button.type);               
            newButton.innerText = button.text;
            if (button.notClose) {
                newButton.classList.add(button.notClose);
            }

            if (button.input) {
                const input = button.input;
                let newInput;
                newInput =  document.createElement('input');
                newInput.setAttribute('id',input.id);
                newInput.setAttribute('type',input.type);      
                newInput.setAttribute('accept',input.accept);
                newInput.classList.add(styles.hidden)

                newButton.append(newInput);
            }   
            if(commonClass){
                ul.classList.add(commonClass);
                li.classList.add(commonClass);
            }
            
            if (button.subMenu) {
                let subUl = this.crtUlWithBI(button.subMenu, subMenuClas, commonClass);
                if (subMenuClas) {
                    subUl.classList.add(subMenuClas);
                }
                //position on axe x 
                if (subMenuPosX) {
                    subUl.classList.add(subMenuPosX);
                }
                //position on axe y
                if (subMenuPosY) {
                    subUl.classList.add(subMenuPosY);
                }
                newButton.append(subUl);
            }
            
            li.appendChild(newButton);
            ul.appendChild(li);

        });
            
        return ul;
    }
    /**
     * Chtěl jsem nahradit neustálé vytváření menu nahrazením dat v již vytvořeném menu
     * , ale ukázalo se, že to je moc práce za málo muziky
     * @param itemMenuBttns 
     * @param buttonData 
     */
    protected chngBttns(itemMenuBttns:HTMLCollection ,buttonData:buttonData[]){
        let i = 0;
        buttonData.forEach( button => {
            let bttnFromDOM = (<HTMLButtonElement>itemMenuBttns[i]);
            let input = itemMenuBttns[0].getElementsByTagName('input');
            if ( input[0] && button.input  ) {
                if ((input[0].id === button.input.id)){

                }

            }
            if (bttnFromDOM.id === button.id) {
                if (bttnFromDOM.type !== button.type) {
                    itemMenuBttns[i].setAttribute('type', button.type);
                }
                if (bttnFromDOM.innerText !== button.text) {
                    bttnFromDOM.innerText = button.text;
                }
                
            }
        });
    }

    protected placeMenu(e:Event, nav:HTMLElement, styleItemMenu:string, xRight?:string, xLeft?:string, yUp?:string, yDown?:string){
        nav.classList.add(styleItemMenu);
        //get menu width
        nav.style.visibility = 'hidden';
        nav.style.position = 'absolute';
        document.body.append(nav);
        let navWidth = nav.offsetWidth;
        let navHeight = nav.offsetHeight;
        console.log('navHeight',navHeight)
        let navDOM = document.getElementById('itemMenu');

        nav.remove();
        nav.style.visibility = '';
        nav.style.position = '';

        const pageX = (<MouseEvent>e).pageX;
        const pageY = (<MouseEvent>e).pageY;
        
        
        let frstMainBox = document.getElementById('frstMainBox');
        
        if (frstMainBox) {
            let docWidth = document.documentElement.clientWidth;
            let docHeight = document.documentElement.scrollHeight;
            let viewportHeight = window.innerHeight;
            let frstMainBoxWidth = frstMainBox.offsetWidth;
            let spaceFromCursorToEdgeW = (docWidth - pageX);
            
            //subMenu respond to X change
            if (spaceFromCursorToEdgeW < navWidth * 2 ) {
                if (xRight && xLeft) {
                   let subMenuEL = nav.querySelectorAll(`.${xRight}` );
             
                   for (let index = 0; index < subMenuEL.length; index++) {
                  
                       subMenuEL[index].classList.remove(xRight);
                       subMenuEL[index].classList.add(xLeft);
                       
                   }
                }
            }

            if (spaceFromCursorToEdgeW < navWidth ) {
      
                let moveNum = navWidth - spaceFromCursorToEdgeW;
                nav.style.setProperty('left', `${pageX - moveNum}px`);

            }
            else{
                nav.style.setProperty('left', `${pageX}px`);
            }
            
            let clientY = (<MouseEvent>e).clientY;
            let spaceFromCursorToEdgeHVP = (viewportHeight - clientY);
            let spaceFromCursorToEdgeH = (docHeight - pageY);

            
            //subMenu respond to Y change
            if(navHeight > pageY){
                if (yUp && yDown) {
                    let subMenuEL = nav.querySelectorAll(`.${yDown}` );
              
                    for (let index = 0; index < subMenuEL.length; index++) {
                   
                        subMenuEL[index].classList.remove(yDown);
                        subMenuEL[index].classList.add(yUp);
                    }
                 }
            }
            if (spaceFromCursorToEdgeHVP < navHeight) {
                let moveNum = navHeight - spaceFromCursorToEdgeHVP;
                nav.style.setProperty('top', `${pageY - moveNum}px`);
                //nav.style.position = 'fixed';
            }
             else {
                nav.style.setProperty('top', `${pageY}px`);
            }
            
        }
    }
}