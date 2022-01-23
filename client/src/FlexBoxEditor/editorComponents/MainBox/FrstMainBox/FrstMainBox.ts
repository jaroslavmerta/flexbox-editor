import { Flex } from '../../../../HTMLComponents/flexBox/Flex';
import { frstMainBoxItemStyle } from '../../Item/itemAtrStyl';
import { LocStorage } from '../../../../common/localStorage/LocStorage';
import { MainBox } from '../MainBox';
import { BoxItem } from '../../Item/BoxItem/BoxItem';
import { ImageItem } from '../../Item/ImageItem/ImageItem';
import { item } from '../../../../common/localStorage/storageInterfaces';
import { CError } from '../../../../common/error/cError/CError';

export class FrstMainBox extends MainBox{

    private flexComponent:Flex;

    constructor( boxItem:BoxItem, imageItem:ImageItem, flexComponent: Flex){
        super(boxItem,imageItem);
        this.flexComponent = flexComponent;
    }

    public createFrstMainBox() {
        let frstMainBoxDefault:item = {
            id: 'frstMainBox',
            kind: 'mainBox',
            classes: {
                classId:['frstMainBox'],
                position:['fb-jc-start', 'fb-ai-start'],
                flexDrctn:['horizontal'],
                subItPstn:[],
                common:[],
                grow:[],
                width:['x0'],
                height:['y0'],
            }
        }
        let items = LocStorage.getItems('items');
        let isCategory = this.isCtgr(items.items, 'frstMainBox');
        //if category comcis is empty
        if (!isCategory) {
            this.setDefaultCtgr(items, frstMainBoxDefault);
        }
        let frstMainBox:HTMLDivElement |null = null;
        for (const item of items.items) {
            if (item.id === 'frstMainBox') {
                frstMainBox = this.crtMainBox(item,'frstMainBox', 'mainBox',this.flexComponent);
                if(this.existItems('frstMainBox')){
                    const frstMainBoxItems = this.createItems('frstMainBox', frstMainBoxItemStyle );
                    if (frstMainBoxItems) {
                        frstMainBox.appendChild(frstMainBoxItems);
                        console.log('frstMainBox items created');
                    }
                }
                return frstMainBox;
            }
            
        }
        throw new CError("FrstMainBox could not be created");
        
    }
    
}