let fileTree =require('./fileTree');
function getMdList(path){
    return fileTree.list('doc/'+path).map(item=>item.path.replace('doc','.'))
}
module.exports = {
    title: '欢迎使用CyanMaple',
    description: 'Just playing around',
    serviceWorker:true,
    themeConfig:{
        sidebar:[
            '/',
            {
                title:'Cyan',
                children:getMdList('Cyan'),
            },
            '/methodsAPI.md',
            {
                title:'组件',
                children:[
                    'actions.md',
                    'affix.md',
                    'alert.md',
                    'captcha.md',
                    'collapse.md',
                    'confirm.md',
                    'countdown.md',
                    'datePicker.md',
                    'image.md',
                    'list.md',
                    'mask.md',
                    'popup.md',
                    'notice.md',
                    'pick.md',
                    'progress.md',
                    'scroll.md'
                ]
            },

        ],
        nav:[
            {text:'冰山工作室官网',items:[
                    {text:'官网',link:'http://www.bingshangroup.com'},
                    {text:'陪你读书',link:'https://www.ximalaya.com/jiaoyu/3740790/'},
                    {text:'立体二维码',link:'http://www.bingshangroup.com#/qc'}
                ]},
            {text:'官网博客',link:'http://www.bingshangroup.com/blog'}
        ]
    }
};