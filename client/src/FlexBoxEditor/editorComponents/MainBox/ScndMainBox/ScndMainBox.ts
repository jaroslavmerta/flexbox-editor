import { scndMainBoxContainerAtr, scndMainBoxContainerCss } from '../../../../HTMLComponents/flexBox/objectsConfig';
import { Item } from '../../Item/Item';
import { Flex } from '../../../../HTMLComponents/flexBox/Flex';
import { scndMainBoxItemStyle } from '../../Item/itemAtrStyl';
import { LocStorage } from '../../../../common/localStorage/LocStorage';
import { MainBox } from '../MainBox';
import { BoxItem } from '../../Item/BoxItem/BoxItem';
import { ImageItem } from '../../Item/ImageItem/ImageItem';
import { item } from '../../../../common/localStorage/storageInterfaces';
import { CError } from '../../../../common/error/cError/CError';

export class ScndMainBox extends MainBox{

    private flexComponent:Flex;

    constructor(boxItem:BoxItem, imageItem:ImageItem, flexComponent: Flex ){
        super(boxItem, imageItem);
        this.flexComponent=flexComponent;
    }

    createScndMainBox(){
        let scndMainBoxDefault:item = {
            id: 'scndMainBox',
            kind: 'mainBox',
            classes: {
                classId:['scndMainBox'],
                position:['fb-jc-start', 'fb-ai-start'],
                flexDrctn:['horizontal'],
                subItPstn:[],
                common:[],
                grow:[],
                width:['x0'],
                height:['y0'],
            }
        }
        const items = LocStorage.getItems('items');
        let isCategory = this.isCtgr(items.items, 'scndMainBox');
        //if category comcis is empty
        if (!isCategory) {
            this.setDefaultCtgr(items, scndMainBoxDefault)
        }
        for (const item of items.items) {
            if (item.id === 'scndMainBox') {
            const scndMainBox = this.crtMainBox(item,'scndMainBox', 'mainBox',this.flexComponent);
            scndMainBox.classList.add('horizontal');
            if(this.existItems('scndMainBox')){
                const scndMainBoxItems = this.createItems('scndMainBox', scndMainBoxItemStyle );
                if (scndMainBoxItems) {
                    scndMainBox.appendChild(scndMainBoxItems);
                    console.log('scndMainBox items created')
                }
            }
            return scndMainBox;
            }
        }
        throw new CError("ScndMainBox box could not be created");
    }
}