import { buttonData } from '../menuIntrfc';
import { Menu } from '../Menu';
import styles from './frstMenu.module.scss';
import { Input } from '../../../../HTMLComponents/input/Input';
import { BoxItem } from './../../Item/BoxItem/BoxItem';
import { MainBox } from './../../MainBox/MainBox';

export class FrstMenu extends Menu{

    //names
    static readonly flexDrctn = 'flexDrctn';
    static readonly width = 'width';

    //dependecies
    protected input:Input;
    private boxItem: BoxItem;
    private mainBox: MainBox;
 
   

    constructor(input:Input, boxItem:BoxItem, mainBox:MainBox){   
        super();

        this.input = input;
        this.boxItem = boxItem;
        this.mainBox = mainBox;
    
    }

    
    
    /**
     * Creates first level menu
     * @param e 
     * @param itemId ukládá id itemu, na kterém bylo vyvoláno menu
     * @param buttonData 
     * @param trggrPrntKind 
     * @returns 
     */
    public createFrstMenu(e:Event, itemId:string,  buttonData:buttonData[], trggrPrntKind?:'boxItem' |'mainBox'){
        //Sets right edt-outerBox submenu acording to parrent element kind
        if (trggrPrntKind) {
            let index = buttonData.findIndex(button => button.id === 'edt-outerBox');
            if(buttonData[index].subMenu){
                if(trggrPrntKind === 'boxItem'){
                    buttonData[index].subMenu = this.boxItem.edtOuterBoxItemSubMenuBttns;
                    
                }
                else if(trggrPrntKind === 'mainBox'){
                    buttonData[index].subMenu = this.mainBox.edtOuterMainBoxSubMenu;
                }
            };
        }

        const menu = this.crtNavMenuBI(buttonData, this.navData, styles.subMenu, styles.x_right_subMenu, styles.y_down_subMenu, 'doNotClose');
        
        menu.classList.add(styles.subMenu);
        this.placeMenu(e, menu, styles.itemMenu, styles.x_right_subMenu, styles.x_left_subMenu, styles.y_up_subMenu, styles.y_down_subMenu);
       
        
        menu.setAttribute('data-triggerid', itemId);
        return menu;
    }


    


    


}