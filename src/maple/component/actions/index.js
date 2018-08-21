import actionsVue from "./index.vue";
let defaults = _.mapValues(actionsVue.props,item=>item.default);
Vue.component('cmui-actions',actionsVue);
let id='cmui-actions-'+_.uniqueId();
let CURRENT=null;
let setCurrent=_.once(function(){
  window&&$('<cmui-actions id="'+id+'">').appendTo('body');
  CURRENT=new Vue({
    el:'#'+id
  }).$children[0];
});
function actions(){
	setCurrent();
	let options={items:[]};
	if(arguments){
		if(arguments.length>1){
			let fnList=_.filter(arguments,_.isFunction);
			options.selectFn=fnList[0];
			options.cancelFn=fnList[1];
			let styleList=_.filter(arguments,_.isPlainObject);
			if(styleList.length==1){
				options.itemStyle=styleList[0];
			}
			let stringList=_.filter(arguments,item=>(typeof item).match(/string|number|boolean/)).map(item=>item.toString());
			stringList.forEach((item,index)=>{
				let rs={text:item};
				let style=_.get(styleList,index);
				if(style){
					rs.style=style;
				}
				options.items.push(rs);
			});
			let arrArg=_.find(arguments,_.isArray);
			if(arrArg){
				options.items=arrArg;
			}
		}else{
			if( (typeof arguments[0]).match(/string|number|boolean/)){
				options.items.push({text:arguments[0]});
			}else if(_.isArray(arguments[0])){
				options.items=arguments[0];
			}else if(_.isFunction(arguments[0])){
				return actions(arguments[0]());
			}
		}
	}else{
		return CURRENT;
	}
	options = _.defaults(_.find(arguments,_.isPlainObject),options, defaults);
	_.each(options,(value,key)=>{
		CURRENT[key]=value;
	});
	CURRENT.visible=true;
	return CURRENT
}
export default actions;