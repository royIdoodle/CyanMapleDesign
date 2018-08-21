import sliderVue from './slider.vue';
import sliderItemVue from './slider-item.vue';
import Swiper from 'swiper';
import sliderList, { CMUI_SliderList } from './sliderList';

Vue.component('cmui-slider', sliderVue);
Vue.component('cmui-slider-item', sliderItemVue);

// function Slider2() {
//     if (arguments.length) {
//         var argParent, argStrings = [],
//             argObject, argFunction, tempSliderList = new CMUI_SliderList();
//         _.forEach(arguments, item => {
//             if (_.isString(item)) {
//                 if (item[0] == '.' || item[0] == '#') {
//                     if (!argParent) {
//                         var dom = $(item);
//                         if (dom.length) {
//                             argParent = dom;
//                         }
//                     }
//                 } else {
//                     argStrings.push(item);
//                 }
//             } else if (_.isNumber(item)) {
//                 argStrings.push(item.toString());
//             } else if (_.isFunction(item)) {
//                 argFunction = item;
//             } else if (_.isArray(item) && _.every(item, _.isString)) {
//                 argStrings = argStrings.concat(item);
//             } else if (_.isObject(item)) {
//                 if (item instanceof jQuery) {
//                     argParent = item;
//                 } else {
//                     argObject = item;
//                 }

//             }
//         });

//         //只有一个选择器的情况
//         if (argParent && arguments.length == 1) {
//             _.filter(sliderList, (value, key) => argParent == _.get(value, 'container'))
//                 .forEach(item => tempSliderList.add(item));
//             return tempSliderList;
//         }
//         var defaultOptions = {
//             parent: argParent || $('body'),
//             items: (function() {
//                 if (argFunction) {
//                     var rs = argFunction();
//                     if (_.isArray(rs)) {
//                         return rs;
//                     } else {
//                         return [];
//                     }
//                 } else {
//                     return argStrings.length ? argStrings : [];
//                 }
//             })(),
//             id: _.uniqueId('cmui-slider_'),
//             options: {},
//             theme: ''
//         };
//         var options = _.assign(defaultOptions, argObject);
//         var parent = $(options.parent).eq(0);
//         if (!parent.length) {
//             return sliderList;
//         }
//         var tpl = '';
//         tpl += '<div class="cmui-slider">';
//         tpl += '	<div class="swiper-container" id="' + options.id + '" >';
//         tpl += '		<div class="swiper-wrapper">';
//         options.items.forEach(item => {
//             tpl += '<div class="swiper-slide">';
//             tpl += item.toString();
//             tpl += '</div>';
//         });
//         tpl += '		</div>';
//         tpl += '	    <div class="pagination"></div>';
//         tpl += '	</div>';
//         tpl += '</div>';
//         var dom = $(tpl);
//         parent.append(dom);
//         //主题拓展
//         if (options.theme) {
//             _.defaults(options.options);
//         }
//         var swiper = new Swiper($('.swiper-container', dom), options.options);
//         sliderList.add(swiper);
//         return tempSliderList.add(swiper);
//     } else {
//         return sliderList;
//     }
// }
function Slider(arg){
	if(!arg){
		return sliderList;
	}
	let argObject=_.find(arguments,_.isPlainObject)||{};
	let argDom=_.find(arguments,item=>(item instanceof jQuery)||(item instanceof Element));
	let argString=_.find(arguments,_.isString);
	let argArray=_.find(arguments,_.isArray);
	let argNumber=_.find(arguments,_.isNumber);
	//set items
	argObject.items=argObject.items||argArray||[];
	//set parent
	argObject.parent=argObject.parent||argDom||document.body;
	let defaultOptions=_.mapValues(sliderVue.props,item=>item.default);
	let options=_.defaults(argObject,defaultOptions)
	let $tpl=$(`
		<cmui-slider v-bind="options">
			<cmui-slider-item v-for="item in options.items" v-html="item">
			</cmui-slider-item>
		</cmui-slider>`).appendTo(argObject.parent);
	return new Vue({
		el:$tpl[0],
		data:function(){
			return{
				options
			}
		}
	}).$children[0];
}
export default Slider;