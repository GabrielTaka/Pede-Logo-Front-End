(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0151627f"],{"16b7":function(t,e,i){"use strict";var o=i("2b0e");e["a"]=o["a"].extend().extend({name:"delayable",props:{openDelay:{type:[Number,String],default:0},closeDelay:{type:[Number,String],default:0}},data:()=>({openTimeout:void 0,closeTimeout:void 0}),methods:{clearDelay(){clearTimeout(this.openTimeout),clearTimeout(this.closeTimeout)},runDelay(t,e){this.clearDelay();const i=parseInt(this[`${t}Delay`],10);this[`${t}Timeout`]=setTimeout(e||(()=>{this.isActive={open:!0,close:!1}[t]}),i)}}})},"21be":function(t,e,i){"use strict";var o=i("2b0e"),a=i("80d2");e["a"]=o["a"].extend().extend({name:"stackable",data(){return{stackElement:null,stackExclude:null,stackMinZIndex:0,isActive:!1}},computed:{activeZIndex(){if("undefined"===typeof window)return 0;const t=this.stackElement||this.$refs.content,e=this.isActive?this.getMaxZIndex(this.stackExclude||[t])+2:Object(a["s"])(t);return null==e?e:parseInt(e)}},methods:{getMaxZIndex(t=[]){const e=this.$el,i=[this.stackMinZIndex,Object(a["s"])(e)],o=[...document.getElementsByClassName("v-menu__content--active"),...document.getElementsByClassName("v-dialog__content--active")];for(let n=0;n<o.length;n++)t.includes(o[n])||i.push(Object(a["s"])(o[n]));return Math.max(...i)}}})},"3a2f":function(t,e,i){"use strict";i("9734");var o=i("4ad4"),a=i("a9ad"),n=i("16b7"),r=i("b848"),s=i("75eb"),d=i("f573"),c=i("f2e7"),l=i("80d2"),h=i("d9bd"),u=i("58df");e["a"]=Object(u["a"])(a["a"],n["a"],r["a"],s["a"],d["a"],c["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String,zIndex:{default:null}},data:()=>({calculatedMinWidth:0,closeDependents:!1}),computed:{calculatedLeft(){const{activator:t,content:e}=this.dimensions,i=!this.bottom&&!this.left&&!this.top&&!this.right,o=!1!==this.attach?t.offsetLeft:t.left;let a=0;return this.top||this.bottom||i?a=o+t.width/2-e.width/2:(this.left||this.right)&&(a=o+(this.right?t.width:-e.width)+(this.right?10:-10)),this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),`${this.calcXOverflow(a,this.dimensions.content.width)}px`},calculatedTop(){const{activator:t,content:e}=this.dimensions,i=!1!==this.attach?t.offsetTop:t.top;let o=0;return this.top||this.bottom?o=i+(this.bottom?t.height:-e.height)+(this.bottom?10:-10):(this.left||this.right)&&(o=i+t.height/2-e.height/2),this.nudgeTop&&(o-=parseInt(this.nudgeTop)),this.nudgeBottom&&(o+=parseInt(this.nudgeBottom)),`${this.calcYOverflow(o+this.pageYOffset)}px`},classes(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left}},computedTransition(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY(){return this.top||this.bottom},offsetX(){return this.left||this.right},styles(){return{left:this.calculatedLeft,maxWidth:Object(l["f"])(this.maxWidth),minWidth:Object(l["f"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount(){this.$nextTick(()=>{this.value&&this.callActivate()})},mounted(){"v-slot"===Object(l["r"])(this,"activator",!0)&&Object(h["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate(){this.runDelay("close")},genActivatorListeners(){const t=o["a"].options.methods.genActivatorListeners.call(this);return t.focus=t=>{this.getActivator(t),this.runDelay("open")},t.blur=t=>{this.getActivator(t),this.runDelay("close")},t.keydown=t=>{t.keyCode===l["w"].esc&&(this.getActivator(t),this.runDelay("close"))},t}},render(t){const e=t("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:{[this.contentClass]:!0,menuable__content__active:this.isActive,"v-tooltip__content--fixed":this.activatorFixed},style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.showLazyContent(this.getContentSlot()));return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[t("transition",{props:{name:this.computedTransition}},[e]),this.genActivator()])}})},"4ad4":function(t,e,i){"use strict";var o=i("16b7"),a=i("f2e7"),n=i("58df"),r=i("80d2"),s=i("d9bd");const d=Object(n["a"])(o["a"],a["a"]);e["a"]=d.extend({name:"activatable",props:{activator:{default:null,validator:t=>{return["string","object"].includes(typeof t)}},disabled:Boolean,internalActivator:Boolean,openOnHover:Boolean},data:()=>({activatorElement:null,activatorNode:[],events:["click","mouseenter","mouseleave"],listeners:{}}),watch:{activator:"resetActivator",activatorElement(t){t&&this.addActivatorEvents()},openOnHover:"resetActivator"},mounted(){const t=Object(r["r"])(this,"activator",!0);t&&["v-slot","normal"].includes(t)&&Object(s["b"])('The activator slot must be bound, try \'<template v-slot:activator="{ on }"><v-btn v-on="on">\'',this),this.getActivator()},beforeDestroy(){this.removeActivatorEvents()},methods:{addActivatorEvents(){if(!this.activator||this.disabled||!this.activatorElement)return;this.listeners=this.genActivatorListeners();const t=Object.keys(this.listeners);for(const e of t)this.activatorElement.addEventListener(e,this.listeners[e])},genActivator(){const t=Object(r["q"])(this,"activator",Object.assign(this.getValueProxy(),{on:this.genActivatorListeners(),attrs:this.genActivatorAttributes()}))||[];return this.activatorNode=t,t},genActivatorAttributes(){return{role:"button","aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genActivatorListeners(){if(this.disabled)return{};const t={};return this.openOnHover?(t.mouseenter=t=>{this.getActivator(t),this.runDelay("open")},t.mouseleave=t=>{this.getActivator(t),this.runDelay("close")}):t.click=t=>{this.activatorElement&&this.activatorElement.focus(),this.isActive=!this.isActive},t},getActivator(t){if(this.activatorElement)return this.activatorElement;let e=null;if(this.activator){const t=this.internalActivator?this.$el:document;e="string"===typeof this.activator?t.querySelector(this.activator):this.activator.$el?this.activator.$el:this.activator}else t?e=t.currentTarget||t.target:this.activatorNode.length&&(e=this.activatorNode[0].elm);return this.activatorElement=e,this.activatorElement},getContentSlot(){return Object(r["q"])(this,"default",this.getValueProxy(),!0)},getValueProxy(){const t=this;return{get value(){return t.isActive},set value(e){t.isActive=e}}},removeActivatorEvents(){if(!this.activator||!this.activatorElement)return;const t=Object.keys(this.listeners);for(const e of t)this.activatorElement.removeEventListener(e,this.listeners[e]);this.listeners={}},resetActivator(){this.activatorElement=null,this.getActivator()}}})},"62ad":function(t,e,i){"use strict";i("4b85");var o=i("2b0e"),a=i("d9f7"),n=i("80d2");const r=["sm","md","lg","xl"],s=(()=>{return r.reduce((t,e)=>{return t[e]={type:[Boolean,String,Number],default:!1},t},{})})(),d=(()=>{return r.reduce((t,e)=>{return t["offset"+Object(n["C"])(e)]={type:[String,Number],default:null},t},{})})(),c=(()=>{return r.reduce((t,e)=>{return t["order"+Object(n["C"])(e)]={type:[String,Number],default:null},t},{})})(),l={col:Object.keys(s),offset:Object.keys(d),order:Object.keys(c)};function h(t,e,i){let o=t;if(null!=i&&!1!==i){if(e){const i=e.replace(t,"");o+=`-${i}`}return"col"!==t||""!==i&&!0!==i?(o+=`-${i}`,o.toLowerCase()):o.toLowerCase()}}const u=new Map;e["a"]=o["a"].extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...s,offset:{type:[String,Number],default:null},...d,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:i,children:o,parent:n}){let r="";for(const a in e)r+=String(e[a]);let s=u.get(r);if(!s){let t;for(t in s=[],l)l[t].forEach(i=>{const o=e[i],a=h(t,i,o);a&&s.push(a)});const i=s.some(t=>t.startsWith("col-"));s.push({col:!i||!e.cols,[`col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),u.set(r,s)}return t(e.tag,Object(a["a"])(i,{class:s}),o)}})},"75eb":function(t,e,i){"use strict";var o=i("9d65"),a=i("80d2"),n=i("58df"),r=i("d9bd");function s(t){const e=typeof t;return"boolean"===e||"string"===e||t.nodeType===Node.ELEMENT_NODE}e["a"]=Object(n["a"])(o["a"]).extend({name:"detachable",props:{attach:{default:!1,validator:s},contentClass:{type:String,default:""}},data:()=>({activatorNode:null,hasDetached:!1}),watch:{attach(){this.hasDetached=!1,this.initDetach()},hasContent:"initDetach"},beforeMount(){this.$nextTick(()=>{if(this.activatorNode){const t=Array.isArray(this.activatorNode)?this.activatorNode:[this.activatorNode];t.forEach(t=>{if(!t.elm)return;if(!this.$el.parentNode)return;const e=this.$el===this.$el.parentNode.firstChild?this.$el:this.$el.nextSibling;this.$el.parentNode.insertBefore(t.elm,e)})}})},mounted(){this.eager&&this.initDetach()},deactivated(){this.isActive=!1},beforeDestroy(){try{if(this.$refs.content&&this.$refs.content.parentNode&&this.$refs.content.parentNode.removeChild(this.$refs.content),this.activatorNode){const t=Array.isArray(this.activatorNode)?this.activatorNode:[this.activatorNode];t.forEach(t=>{t.elm&&t.elm.parentNode&&t.elm.parentNode.removeChild(t.elm)})}}catch(t){console.log(t)}},methods:{getScopeIdAttrs(){const t=Object(a["n"])(this.$vnode,"context.$options._scopeId");return t&&{[t]:""}},initDetach(){if(this._isDestroyed||!this.$refs.content||this.hasDetached||""===this.attach||!0===this.attach||"attach"===this.attach)return;let t;t=!1===this.attach?document.querySelector("[data-app]"):"string"===typeof this.attach?document.querySelector(this.attach):this.attach,t?(t.insertBefore(this.$refs.content,t.firstChild),this.hasDetached=!0):Object(r["c"])(`Unable to locate target ${this.attach||"[data-app]"}`,this)}}})},9734:function(t,e,i){},"9cc6":function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{"fill-height":"",fluid:""}},[i("v-row",[i("v-col",{attrs:{cols:"12"}},[i("material-card",{attrs:{color:"green"},scopedSlots:t._u([{key:"header",fn:function(){return[i("div",{staticClass:"px-3"},[i("div",{staticClass:"title font-weight-light mb-2"},[t._v("\n              Material Design Icons\n            ")]),i("div",{staticClass:"category font-weight-thin"},[t._v("\n              See all available\n              "),i("a",{staticClass:"white--text",attrs:{href:"https://materialdesignicons.com/",target:"_blank"}},[t._v("\n                Icons\n              ")])])])]},proxy:!0}])},[i("v-row",{attrs:{align:"center",justify:"center"}},t._l(t.icons,function(e){return i("v-col",{key:e,staticClass:"ma-2"},[i("v-tooltip",{attrs:{top:"","content-class":"top"},scopedSlots:t._u([{key:"activator",fn:function(o){var a=o.attrs,n=o.on;return[i("v-icon",t._g(t._b({},"v-icon",a,!1),n),[t._v("\n                  "+t._s(e)+"\n                ")])]}}],null,!0)},[i("span",[t._v(t._s(e))])])],1)}),1)],1)],1),i("v-col",{staticClass:"mx-auto",attrs:{cols:"auto"}},[i("v-btn",{attrs:{large:"",color:"success",href:"https://materialdesignicons.com/",target:"_blank"}},[i("v-icon",{attrs:{left:""}},[t._v("\n          mdi-material-design\n        ")]),i("span",[t._v("See all icons")])],1)],1)],1)],1)},a=[],n={data:()=>({icons:["mdi-access-point","mdi-access-point-network","mdi-account","mdi-account-alert","mdi-account-box","mdi-account-box-multiple","mdi-account-box-outline","mdi-account-card-details","mdi-account-check","mdi-account-circle","mdi-account-convert","mdi-account-edit","mdi-account-group","mdi-account-heart","mdi-account-key","mdi-account-location","mdi-account-minus","mdi-account-multiple","mdi-account-multiple-check","mdi-account-multiple-minus","mdi-account-multiple-outline","mdi-account-multiple-plus","mdi-account-multiple-plus-outline","mdi-account-network","mdi-account-off","mdi-account-outline","mdi-account-plus","mdi-account-plus-outline","mdi-account-remove","mdi-account-search","mdi-account-search-outline","mdi-account-settings","mdi-account-settings-variant","mdi-account-star","mdi-account-switch","mdi-accusoft","mdi-adjust","mdi-adobe","mdi-air-conditioner","mdi-airballoon","mdi-airplane","mdi-airplane-landing","mdi-airplane-off","mdi-airplane-takeoff","mdi-airplay","mdi-airport","mdi-alarm","mdi-alarm-bell","mdi-alarm-check","mdi-alarm-light","mdi-alarm-multiple","mdi-alarm-off","mdi-alarm-plus","mdi-alarm-snooze","mdi-album","mdi-alert","mdi-alert-box","mdi-alert-circle","mdi-alert-circle-outline","mdi-alert-decagram","mdi-alert-octagon","mdi-alert-octagram","mdi-alert-outline","mdi-alien","mdi-all-inclusive","mdi-alpha","mdi-alphabetical","mdi-altimeter","mdi-amazon","mdi-amazon-alexa","mdi-amazon-drive","mdi-ambulance","mdi-amplifier","mdi-anchor","mdi-android","mdi-android-debug-bridge","mdi-android-head","mdi-android-studio","mdi-angle-acute","mdi-angle-obtuse","mdi-angle-right","mdi-angular","mdi-angularjs","mdi-animation","mdi-animation-play","mdi-anvil","mdi-apple","mdi-apple-finder","mdi-apple-icloud","mdi-apple-ios","mdi-apple-keyboard-caps","mdi-apple-keyboard-command","mdi-apple-keyboard-control","mdi-apple-keyboard-option","mdi-apple-keyboard-shift","mdi-apple-safari","mdi-application","mdi-approval","mdi-apps","mdi-arch","mdi-archive","mdi-arrange-bring-forward","mdi-arrange-bring-to-front","mdi-arrange-send-backward","mdi-arrange-send-to-back","mdi-arrow-all","mdi-arrow-bottom-left","mdi-arrow-bottom-left-bold-outline","mdi-arrow-bottom-left-thick","mdi-arrow-bottom-right","mdi-arrow-bottom-right-bold-outline","mdi-arrow-bottom-right-thick","mdi-arrow-collapse","mdi-arrow-collapse-all","mdi-arrow-collapse-down","mdi-arrow-collapse-horizontal","mdi-arrow-collapse-left","mdi-arrow-collapse-right","mdi-arrow-collapse-up","mdi-arrow-collapse-vertical","mdi-arrow-decision","mdi-arrow-decision-auto","mdi-arrow-decision-auto-outline","mdi-arrow-decision-outline","mdi-arrow-down","mdi-arrow-down-bold","mdi-arrow-down-bold-box","mdi-arrow-down-bold-box-outline","mdi-arrow-down-bold-circle","mdi-arrow-down-bold-circle-outline","mdi-arrow-down-bold-hexagon-outline","mdi-arrow-down-bold-outline","mdi-arrow-down-box","mdi-arrow-down-drop-circle","mdi-arrow-down-drop-circle-outline","mdi-arrow-down-thick","mdi-arrow-expand","mdi-arrow-expand-all","mdi-arrow-expand-down","mdi-arrow-expand-horizontal","mdi-arrow-expand-left","mdi-arrow-expand-right","mdi-arrow-expand-up","mdi-arrow-expand-vertical","mdi-arrow-left","mdi-arrow-left-bold","mdi-arrow-left-bold-box","mdi-arrow-left-bold-box-outline","mdi-arrow-left-bold-circle","mdi-arrow-left-bold-circle-outline","mdi-arrow-left-bold-hexagon-outline","mdi-arrow-left-bold-outline","mdi-arrow-left-box","mdi-arrow-left-drop-circle","mdi-arrow-left-drop-circle-outline","mdi-arrow-left-right-bold-outline","mdi-arrow-left-thick","mdi-arrow-right","mdi-arrow-right-bold","mdi-arrow-right-bold-box","mdi-arrow-right-bold-box-outline","mdi-arrow-right-bold-circle","mdi-arrow-right-bold-circle-outline","mdi-arrow-right-bold-hexagon-outline","mdi-arrow-right-bold-outline","mdi-arrow-right-box","mdi-arrow-right-drop-circle","mdi-arrow-right-drop-circle-outline","mdi-arrow-right-thick","mdi-arrow-split-horizontal","mdi-arrow-split-vertical","mdi-arrow-top-left","mdi-arrow-top-left-bold-outline","mdi-arrow-top-left-thick","mdi-arrow-top-right","mdi-arrow-top-right-bold-outline","mdi-arrow-top-right-thick","mdi-arrow-up","mdi-arrow-up-bold","mdi-arrow-up-bold-box","mdi-arrow-up-bold-box-outline","mdi-arrow-up-bold-circle","mdi-arrow-up-bold-circle-outline","mdi-arrow-up-bold-hexagon-outline","mdi-arrow-up-bold-outline","mdi-arrow-up-box","mdi-arrow-up-down-bold-outline","mdi-arrow-up-drop-circle","mdi-arrow-up-drop-circle-outline","mdi-arrow-up-thick","mdi-artist","mdi-assistant","mdi-asterisk","mdi-at","mdi-atlassian","mdi-atom","mdi-attachment","mdi-audio-video","mdi-audiobook","mdi-augmented-reality","mdi-auto-fix","mdi-auto-upload","mdi-autorenew","mdi-av-timer","mdi-axe","mdi-azure","mdi-baby","mdi-baby-buggy","mdi-backburger","mdi-backspace","mdi-backup-restore","mdi-badminton"]})},r=n,s=i("2877"),d=i("6544"),c=i.n(d),l=i("8336"),h=i("62ad"),u=i("a523"),m=i("132d"),p=i("0fd9"),f=i("3a2f"),g=Object(s["a"])(r,o,a,!1,null,null,null);e["default"]=g.exports;c()(g,{VBtn:l["a"],VCol:h["a"],VContainer:u["a"],VIcon:m["a"],VRow:p["a"],VTooltip:f["a"]})},"9d65":function(t,e,i){"use strict";var o=i("d9bd"),a=i("2b0e");e["a"]=a["a"].extend().extend({name:"bootable",props:{eager:Boolean},data:()=>({isBooted:!1}),computed:{hasContent(){return this.isBooted||this.eager||this.isActive}},watch:{isActive(){this.isBooted=!0}},created(){"lazy"in this.$attrs&&Object(o["d"])("lazy",this)},methods:{showLazyContent(t){return this.hasContent?t:void 0}}})},a523:function(t,e,i){"use strict";i("20f6"),i("4b85");var o=i("2b0e");function a(t){return o["a"].extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:i,data:o,children:a}){o.staticClass=`${t} ${o.staticClass||""}`.trim();const{attrs:n}=o;if(n){o.attrs={};const t=Object.keys(n).filter(t=>{if("slot"===t)return!1;const e=n[t];return t.startsWith("data-")?(o.attrs[t]=e,!1):e||"string"===typeof e});t.length&&(o.staticClass+=` ${t.join(" ")}`)}return i.id&&(o.domProps=o.domProps||{},o.domProps.id=i.id),e(i.tag,o,a)}})}var n=i("d9f7");e["a"]=a("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:i,children:o}){let a;const{attrs:r}=i;return r&&(i.attrs={},a=Object.keys(r).filter(t=>{if("slot"===t)return!1;const e=r[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e})),e.id&&(i.domProps=i.domProps||{},i.domProps.id=e.id),t(e.tag,Object(n["a"])(i,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(a||[])}),o)}})},b848:function(t,e,i){"use strict";var o=i("58df");function a(t){const e=[];for(let i=0;i<t.length;i++){const o=t[i];o.isActive&&o.isDependent?e.push(o):e.push(...a(o.$children))}return e}e["a"]=Object(o["a"])().extend({name:"dependent",data(){return{closeDependents:!0,isActive:!1,isDependent:!0}},watch:{isActive(t){if(t)return;const e=this.getOpenDependents();for(let i=0;i<e.length;i++)e[i].isActive=!1}},methods:{getOpenDependents(){return this.closeDependents?a(this.$children):[]},getOpenDependentElements(){const t=[],e=this.getOpenDependents();for(let i=0;i<e.length;i++)t.push(...e[i].getClickableDependentElements());return t},getClickableDependentElements(){const t=[this.$el];return this.$refs.content&&t.push(this.$refs.content),this.overlay&&t.push(this.overlay.$el),t.push(...this.getOpenDependentElements()),t}}})},f573:function(t,e,i){"use strict";var o=i("fe6c"),a=i("21be"),n=i("4ad4"),r=i("58df"),s=i("80d2");const d=Object(r["a"])(a["a"],o["a"],n["a"]);e["a"]=d.extend().extend({name:"menuable",props:{allowOverflow:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[Number,String],default:"auto"},minWidth:[Number,String],nudgeBottom:{type:[Number,String],default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,openOnClick:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},data:()=>({absoluteX:0,absoluteY:0,activatedBy:null,activatorFixed:!1,dimensions:{activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0,offsetLeft:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0}},hasJustFocused:!1,hasWindow:!1,inputActivator:!1,isContentActive:!1,pageWidth:0,pageYOffset:0,stackClass:"v-menu__content--active",stackMinZIndex:6}),computed:{computedLeft(){const t=this.dimensions.activator,e=this.dimensions.content,i=(!1!==this.attach?t.offsetLeft:t.left)||0,o=Math.max(t.width,e.width);let a=0;if(a+=this.left?i-(o-t.width):i,this.offsetX){const e=isNaN(Number(this.maxWidth))?t.width:Math.min(t.width,Number(this.maxWidth));a+=this.left?-e:t.width}return this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),a},computedTop(){const t=this.dimensions.activator,e=this.dimensions.content;let i=0;return this.top&&(i+=t.height-e.height),!1!==this.attach?i+=t.offsetTop:i+=t.top+this.pageYOffset,this.offsetY&&(i+=this.top?-t.height:t.height),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),i},hasActivator(){return!!this.$slots.activator||!!this.$scopedSlots.activator||!!this.activator||!!this.inputActivator}},watch:{disabled(t){t&&this.callDeactivate()},isActive(t){this.disabled||(t?this.callActivate():this.callDeactivate())},positionX:"updateDimensions",positionY:"updateDimensions"},beforeMount(){this.hasWindow="undefined"!==typeof window},methods:{absolutePosition(){return{offsetTop:0,offsetLeft:0,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0}},activate(){},calcLeft(t){return Object(s["f"])(!1!==this.attach?this.computedLeft:this.calcXOverflow(this.computedLeft,t))},calcTop(){return Object(s["f"])(!1!==this.attach?this.computedTop:this.calcYOverflow(this.computedTop))},calcXOverflow(t,e){const i=t+e-this.pageWidth+12;return t=(!this.left||this.right)&&i>0?Math.max(t-i,0):Math.max(t,12),t+this.getOffsetLeft()},calcYOverflow(t){const e=this.getInnerHeight(),i=this.pageYOffset+e,o=this.dimensions.activator,a=this.dimensions.content.height,n=t+a,r=i<n;return r&&this.offsetOverflow&&o.top>a?t=this.pageYOffset+(o.top-a):r&&!this.allowOverflow?t=i-a-12:t<this.pageYOffset&&!this.allowOverflow&&(t=this.pageYOffset+12),t<12?12:t},callActivate(){this.hasWindow&&this.activate()},callDeactivate(){this.isContentActive=!1,this.deactivate()},checkForPageYOffset(){this.hasWindow&&(this.pageYOffset=this.activatorFixed?0:this.getOffsetTop())},checkActivatorFixed(){if(!1!==this.attach)return;let t=this.getActivator();while(t){if("fixed"===window.getComputedStyle(t).position)return void(this.activatorFixed=!0);t=t.offsetParent}this.activatorFixed=!1},deactivate(){},genActivatorListeners(){const t=n["a"].options.methods.genActivatorListeners.call(this),e=t.click;return t.click=t=>{this.openOnClick&&e&&e(t),this.absoluteX=t.clientX,this.absoluteY=t.clientY},t},getInnerHeight(){return this.hasWindow?window.innerHeight||document.documentElement.clientHeight:0},getOffsetLeft(){return this.hasWindow?window.pageXOffset||document.documentElement.scrollLeft:0},getOffsetTop(){return this.hasWindow?window.pageYOffset||document.documentElement.scrollTop:0},getRoundedBoundedClientRect(t){const e=t.getBoundingClientRect();return{top:Math.round(e.top),left:Math.round(e.left),bottom:Math.round(e.bottom),right:Math.round(e.right),width:Math.round(e.width),height:Math.round(e.height)}},measure(t){if(!t||!this.hasWindow)return null;const e=this.getRoundedBoundedClientRect(t);if(!1!==this.attach){const i=window.getComputedStyle(t);e.left=parseInt(i.marginLeft),e.top=parseInt(i.marginTop)}return e},sneakPeek(t){requestAnimationFrame(()=>{const e=this.$refs.content;e&&"none"===e.style.display?(e.style.display="inline-block",t(),e.style.display="none"):t()})},startTransition(){return new Promise(t=>requestAnimationFrame(()=>{this.isContentActive=this.hasJustFocused=this.isActive,t()}))},updateDimensions(){this.hasWindow="undefined"!==typeof window,this.checkActivatorFixed(),this.checkForPageYOffset(),this.pageWidth=document.documentElement.clientWidth;const t={};if(!this.hasActivator||this.absolute)t.activator=this.absolutePosition();else{const e=this.getActivator();if(!e)return;t.activator=this.measure(e),t.activator.offsetLeft=e.offsetLeft,!1!==this.attach?t.activator.offsetTop=e.offsetTop:t.activator.offsetTop=0}this.sneakPeek(()=>{t.content=this.measure(this.$refs.content),this.dimensions=t})}}})}}]);
//# sourceMappingURL=chunk-0151627f.48aa0933.js.map