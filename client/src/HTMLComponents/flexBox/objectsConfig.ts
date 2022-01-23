//FrstMainBox config
const frstMainBoxContainerCss = {
    'align-items':'center',
    'justify-content':'center',
    border:'1px solid black',
    'min-height': '100px',
    'max-width':'100vw'
}
/**
 * FrstMainBox container html atributes
 */
const frstMainBoxContainerAtr = {
    class: 'frstMainBox',
    id: 'frstMainBox',
    'data-kind':'mainBox',
    'data-category':'frstMainBox'
};

/** *** *** *** *** *** *** *** *** *** *** */

//Material config
const scndMainBoxContainerCss = {
    'align-items':'center',
    border:'1px solid black',
    'min-height': '100px',
    'max-width':'100vw'
}
/**
 * FrstMainBox container html atributes
 */
const scndMainBoxContainerAtr = {
    class: 'material',
    id: 'material',
    'data-kind':'boxMaterial',
    'data-category':'material'
};

export{
    frstMainBoxContainerCss, 
    frstMainBoxContainerAtr, 
    scndMainBoxContainerCss, 
    scndMainBoxContainerAtr};