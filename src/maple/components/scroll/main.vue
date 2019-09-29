<template>
    <div class="cmui-scroll swiper-container" ref="scroll">
        <div class="abs-top flex-container hfull" :style="pullStartStyle" ref="pullStart" v-if="pullEvent">
            <slot name="pullStart" v-if="$slots.pullStart"></slot>
            <p v-text="pullStartText" class="text-center"></p>
        </div>
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
        <div class="abs-bottom flex-container hfull" :style="pullEndStyle" ref="pullEnd">
            <slot name="pullEnd" v-if="$slots.pullEnd"></slot>
            <p v-text="pullEndText" class="text-center"></p>
        </div>
    </div>
</template>
<script>
    import Swiper from 'swiper';
    import _ from 'lodash';
    export default {
        name:'cmui-scroll',
        data:function(){
            return {
                swiper:null,
                pullStartStyle:{
                    transform:''
                },
                pullEndStyle:{
                    transform:''
                },
                pullStartText:'',
                pullEndText:''
            }
        },
        props:{
            col:{type:[String,Number],default:'auto'},
            direction:{type:String,default:'h'},
            watch:null,
            pullDis:{type:Number,default:50},
            pullEvent:{type:Boolean,default:true},
            freeMode:{type:Boolean,default:true},
            pullText:Array,
        },
        watch:{
            watch(){
                if(this.swiper){
                    this.$nextTick(()=>{
                        this.swiper.update();
                    })
                }
            }
        },
        methods:{
            updatePull(progress,translate,endHandel){
                if(!this.pullEvent){
                    return ;
                }
                if(progress<0){
                    if(translate>this.pullDis){
                        this.pullStartText=_.get(this.pullText,1);
                        endHandel&&this.$emit('pullStart',this)
                    }else{
                        this.pullStartText=_.get(this.pullText,0);
                    }
                    let dis=parseInt(_.min([translate-20,10]));
                    if(this.direction==='v'){
                        this.pullStartStyle.transform='translate(0,'+dis+'px)';
                    }else{
                        this.pullStartStyle.transform='translate('+dis+'px,0)';
                    }

                }else if(progress>1){
                    /**
                     * todo 位置计算
                     * 现在滑动到底部时的距离计算有误差，需要改正
                     * */
                    if(translate*(progress-1)*-1-20>this.pullDis){
                        this.pullEndText=_.get(this.pullText,3);
                        endHandel&&this.$emit('pullEnd',this)
                    }else{
                        this.pullEndText=_.get(this.pullText,2);
                    }
                    let dis=_.min([translate*(progress-1)*-1-20,10])*-1;
                    if(this.direction==='v'){
                        this.pullEndStyle.transform='translate(0,'+dis+'px)';
                    }else{
                        this.pullEndStyle.transform='translate('+dis+'px,0)';
                    }
                }
                this.$emit('pull',progress,this);
            },
            resetPull(){
                this.pullStartStyle.transform='translate(-100%)';
                this.pullEndStyle.transform='translate(-100%)';
            }
        },
        mounted(){
            let container=this.$refs.scroll;
            let _this=this;
            this.$nextTick(function(){
                _this.swiper=new Swiper(container,{
                    direction:_this.direction=='v'?'vertical':'horizontal',
                    slidesPerView :+_this.col||'auto',
                    freeMode:_this.freeMode,
                    on:{
                        progress(value){
                            _this.updatePull(value,this.translate);
                        },
                        touchEnd(){
                            _this.updatePull(this.progress,this.translate,true);
                            _.delay(_this.resetPull)
                        }
                    }
                });
                _this.$emit('rendered',this)
            })
        },
        destroyed() {
            this.swiper.destroy();
        }
    }
</script>