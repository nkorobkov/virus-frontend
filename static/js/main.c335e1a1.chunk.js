(this["webpackJsonpvirus-frontend"]=this["webpackJsonpvirus-frontend"]||[]).push([[0],{23:function(e,t,s){},37:function(e,t,s){"use strict";s.r(t);var n=s(1),i=s.n(n),a=s(11),c=s.n(a),o=(s(23),s(2)),r=s(3),l=s(6),d=s(5),h=s(4),u=s(7),j=s(12),b=s.n(j),p=s(18),O=s(13);var m,v,f,x,k,g,N=function(e){var t="/img/";switch(e){case 0:t+="empty.png";break;case 1:t+="blueActive.png";break;case 2:t+="blueBase.png";break;case-1:t+="redActive.png";break;case-2:t+="redBase.png";break;default:t+="empty.png"}return t},C=s(0),y=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){var e=N(this.props.state);return Object(C.jsx)("img",{alt:"cell",className:"cell",src:e,onClick:this.props.onClick.bind(this,this.props.h,this.props.w)})}}]),s}(i.a.Component),S=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){var e=this,t=Object(O.a)(Array(this.props.size).keys()).map((function(t){var s=e.props.N,n=t,i=s*e.props.size+n,a=e.props.field[i];return Object(C.jsx)(y,{h:s,w:n,onClick:e.props.onCellClick,state:a},i)}));return Object(C.jsx)("div",{className:"field-row",children:t})}}]),s}(i.a.Component),E=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){var e=this;return this.fieldElement=Object(O.a)(Array(this.props.sizeH).keys()).map((function(t){return Object(C.jsx)(S,{size:e.props.sizeW,N:t,onCellClick:e.props.onCellClick,field:e.props.field},t)})),Object(C.jsx)("div",{className:"game-field",children:this.fieldElement})}}]),s}(i.a.Component),T=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){var e="team-name "+(1===this.props.id?"blue-name":"red-name");return Object(C.jsx)("span",{className:e,children:1===this.props.id?"Blue":"Red"})}}]),s}(i.a.Component),R=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){return Object(C.jsx)("img",{alt:"cell",className:this.props.class,src:this.props.img})}}]),s}(i.a.Component),_=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){var e=N(this.props.id),t=N(0),s="move-dot "+(1===this.props.id?"blue-name":"red-name");return Object(C.jsxs)("div",{children:[Object(C.jsx)(R,{img:this.props.n>2?e:t,class:s}),Object(C.jsx)(R,{img:this.props.n>1?e:t,class:s}),Object(C.jsx)(R,{img:this.props.n>0?e:t,class:s})]})}}]),s}(i.a.Component),w=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).state={clicked:!1},n.pressed=n.pressed.bind(Object(l.a)(n)),n}return Object(r.a)(s,[{key:"pressed",value:function(){this.setState({clicked:!this.state.clicked})}},{key:"render",value:function(){return this.props.gameState.isGameEnded||0===this.props.gameState.history.length?Object(C.jsx)("div",{children:Object(C.jsx)("div",{className:"button sidebar-button button-on-info",onClick:this.props.onMenuClick,children:"Menu"})}):this.state.clicked?Object(C.jsxs)("div",{children:[Object(C.jsx)("div",{className:"info-line",children:"Your game would be lost You sure you want to exit?"}),Object(C.jsxs)("div",{className:"columns",children:[Object(C.jsx)("span",{className:"column button sidebar-button button-on-info",onClick:this.props.onMenuClick,children:"Yes"}),Object(C.jsx)("span",{className:"column button sidebar-button button-on-info",onClick:this.pressed,children:"No"})]})]}):Object(C.jsx)("div",{children:Object(C.jsx)("div",{className:"button sidebar-button button-on-info",onClick:this.pressed,children:"Menu"})})}}]),s}(i.a.Component),M=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){var e=this.props.gameState.stepsLeft,t=this.props.gameState.toMove;return this.props.gameState.isGameEnded?Object(C.jsx)("div",{children:Object(C.jsxs)("div",{className:"info-line",children:["Team ",Object(C.jsx)(T,{id:this.props.gameState.winner})," won!"]})}):"offline"===this.props.type||t===this.props.gameState.playerTeam?Object(C.jsxs)("div",{children:["offline"===this.props.type?Object(C.jsxs)("div",{className:"info-line",children:[Object(C.jsx)(T,{id:this.props.gameState.toMove})," moves"]}):Object(C.jsx)("div",{className:"info-line",children:"It's our move"}),Object(C.jsxs)("div",{className:"info-line",children:[" ",e," step",1===e?"":"s"," left"]}),Object(C.jsx)("div",{className:"info-line",children:Object(C.jsx)(_,{n:e,id:t})})]}):Object(C.jsx)("div",{className:"info-line",children:"Our opponent is thinking..."})}}]),s}(i.a.Component),A=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){return this.props.shouldShow?Object(C.jsx)("div",{className:"button sidebar-button button-on-info",onClick:this.props.onRollBack,children:"TakeBack"}):Object(C.jsx)("div",{})}}]),s}(i.a.Component),P=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){if("offline"===this.props.type)return Object(C.jsx)("div",{});var e=this.props.isBackendConnected?"green":"red",t=this.props.isBackendConnected?"green":"red",s=Object(C.jsxs)("span",{children:[Object(C.jsx)("span",{className:e+" dot"})," backend is ",this.props.isBackendConnected?"":"not ","connected"]}),n="online"===this.props.type?Object(C.jsxs)("span",{children:[Object(C.jsx)("span",{className:t+"dot"})," opponent is ",this.props.isBackendConnected?"":"not ","connected"]}):Object(C.jsx)("span",{});return Object(C.jsxs)("div",{className:"connection-status",children:[s,n]})}}]),s}(i.a.Component),W=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){return Object(C.jsxs)("div",{children:[Object(C.jsx)(P,{isBackendConnected:this.props.gameState.isBackendConnected,type:this.props.type}),Object(C.jsxs)("div",{className:"has-text-centered",children:[Object(C.jsx)(M,{gameState:this.props.gameState,type:this.props.type}),Object(C.jsx)(A,{onRollBack:this.props.onRollBack,shouldShow:"offline"===this.props.type}),Object(C.jsx)(w,{gameState:this.props.gameState,onMenuClick:this.props.onMenuClick})]})]})}}]),s}(n.Component),z=function(e,t,s){return e*s+t},B=function(e,t){return e%t},D=function(e,t){return Math.floor(e/t)},I=function(e,t,s,n){var i=[];return e>0&&(i.push(z(e-1,t,n)),t>0&&i.push(z(e-1,t-1,n))),e<s-1&&(i.push(z(e+1,t,n)),t<n-1&&i.push(z(e+1,t+1,n))),t>0&&(i.push(z(e,t-1,n)),e<s-1&&i.push(z(e+1,t-1,n))),t<n-1&&(i.push(z(e,t+1,n)),e>0&&i.push(z(e-1,t+1,n))),i},L=function e(t,s,n,i){var a=z(t,s,n.sizeW);return!(i.indexOf(a)>-1)&&(i.push(a),n.field[a]===n.toMove||n.field[a]===2*n.toMove&&I(t,s,n.sizeH,n.sizeW).map((function(t){return e(D(t,n.sizeW),B(t,n.sizeW),n,i)})).some((function(e){return e})))},H=function(e,t,s){if(n=e.field[z(t,s,e.sizeW)],i=e.toMove,0!==n&&i!==-n)return!1;var n,i,a=I(t,s,e.sizeH,e.sizeW),c=[];return a.map((function(t){return L(D(t,e.sizeW),B(t,e.sizeW),e,c)})).some((function(e){return e}))},U=function(e,t){return 0===e?t:-e+t},G=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(e){var n;Object(o.a)(this,s),(n=t.call(this,e)).setUpSocket=function(e){console.log("connecting to the backend"),n.socket=new WebSocket(e),n.socket.onopen=function(){n.setState({isBackendConnected:!0}),console.log("backend connected")},n.socket.onmessage=function(e){n.handleReceivedMove(JSON.parse(e.data))},n.socket.onclose=function(t){console.log("Cant connect to the server with code:",t.code,"retrying in two secconds"),n.setState({isBackendConnected:!1}),n.timeouts.push(setTimeout((function(){n.setUpSocket(e)}),2e3))}},n.handleRollBack=function(){if(0!==n.state.history.length&&"offline"===n.props.type){var e=n.state.history.slice(),t=n.state.field.slice(),s=n.state.toMove,i=n.state.stepsLeft+1,a=n.state.isGameEnded,c=n.state.winner,o=e.pop(),r=t[o[0]*n.sizeW+o[1]];t[o[0]*n.sizeW+o[1]]=-Math.sign(r)*(Math.abs(r)-1),i>3&&(s=-s,i=1,a&&(a=!1,c=null)),n.setState({field:t,toMove:s,stepsLeft:i,history:e,isGameEnded:a,winner:c})}},n.handleCellClick=function(e,t){n.state.toMove!==n.state.playerTeam&&"offline"!==n.props.type||n.state.isGameEnded||!H(n.state,e,t)||n.makeStep(e,t).then(n.sendStateIfNeeded.bind(Object(l.a)(n)))},n.sizeH=8,n.sizeW=8;var i=new Array(n.sizeH*n.sizeW).fill(0);return i[0]=1,i[n.sizeH*n.sizeW-1]=-1,n.state={field:i,toMove:1,stepsLeft:2,sizeH:n.sizeH,sizeW:n.sizeW,history:[],isGameEnded:!1,winner:null,isBackendConnected:!1,playerTeam:1},n.handleCellClick=n.handleCellClick.bind(Object(l.a)(n)),n.handleRollBack=n.handleRollBack.bind(Object(l.a)(n)),n}return Object(r.a)(s,[{key:"componentDidMount",value:function(){"ai"===this.props.type&&this.setUpSocket("wss://virus-war-backend.herokuapp.com/ws/ai/"+this.props.aiType+"/"),this.timeouts=[]}},{key:"componentWillUnmount",value:function(){console.log("unmounting, closing socket"),this.socket&&(this.socket.onclose=null,this.socket.close()),this.timeouts.forEach(clearTimeout)}},{key:"handleReceivedMove",value:function(e){var t=this;if(this.state.toMove!==this.state.playerTeam&&!this.state.isGameEnded){var s=e.move;if(s.length>this.state.stepsLeft)throw new Error("More moves than possible");s.forEach(function(){var e=Object(p.a)(b.a.mark((function e(s){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!H(t.state,s[0],s[1])){e.next=3;break}return e.next=3,t.makeStep(s[0],s[1]);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}}},{key:"makeStep",value:function(e,t){var s=this,n=this.state.field.slice(),i=this.state.history.slice(),a=this.state.stepsLeft-1,c=this.state.toMove,o=this.state.winner,r=this.state.isGameEnded;if(n[e*this.sizeW+t]=U(n[e*this.sizeW+t],this.state.toMove),i.push([e,t]),0===a){c=-c,a=3;var l=Object(u.a)({},this.state);l.field=n.slice(),l.history=i.slice(),l.stepsLeft=a,l.toMove=c,function(e){for(var t=Object(u.a)({},e),s=0;s<3;s++){for(var n=!1,i=0;i<t.sizeW*t.sizeH;i++)if(H(t,D(i,t.sizeW),B(i,t.sizeW))){n=!0;var a=t.field.slice();a[i]=U(a[i],t.toMove),t.field=a;break}if(!n)return!1}return!0}(l)||(r=!0,o=-c)}return new Promise((function(e){s.setState({toMove:c,field:n,stepsLeft:a,history:i,isGameEnded:r,winner:o},e)}))}},{key:"sendStateIfNeeded",value:function(){var e=this,t="ai"===this.props.type&&this.state.playerTeam!==this.state.toMove,s="online"===this.props.type;(t&&!this.state.isGameEnded||s)&&(this.state.isBackendConnected?(this.socket.send(JSON.stringify(this.state)),console.log("state sent")):(console.log("state not sent, retrying in two seconds"),this.timeouts.push(setTimeout((function(){e.sendStateIfNeeded()}),2e3))))}},{key:"render",value:function(){return Object(C.jsx)("div",{className:"container is-fluid game-container",children:Object(C.jsxs)("div",{className:"tile is-ancestor",children:[Object(C.jsx)("div",{className:"tile is-parent is-8",children:Object(C.jsx)("div",{className:"tile is-child is-game-tile",children:Object(C.jsx)(E,{sizeH:this.sizeH,sizeW:this.sizeW,onCellClick:this.handleCellClick,field:this.state.field})})}),Object(C.jsx)("div",{className:"tile is-parent",children:Object(C.jsx)("div",{className:"tile is-child is-info-bar ",children:Object(C.jsx)(W,{onMenuClick:this.props.onMenuClick,onRollBack:this.handleRollBack,gameState:this.state,type:this.props.type})})})]})})}}]),s}(i.a.Component),F=s(8),K=s.n(F),V=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).onNext=function(){n.state.currentSlide!==Object.keys(n.state.data).length&&n.setState({currentSlide:n.state.currentSlide+1})},n.onPrev=function(){1!==n.state.currentSlide&&n.setState({currentSlide:n.state.currentSlide-1})},n.state={currentSlide:1,data:{1:{imgSrc:"/img/rules/1.png",element:Object(C.jsx)("div",{className:"rules-text content",children:Object(C.jsxs)("ul",{children:[Object(C.jsx)("li",{children:"Two players play on square grid."}),Object(C.jsx)("li",{children:"Each player can make 3 steps on a cell near his active dots (viruses) during his turn."})]})})},2:{imgSrc:"/img/rules/2.png",element:Object(C.jsx)("div",{className:"rules-text content",children:Object(C.jsxs)("ul",{children:[Object(C.jsx)("li",{children:"If you make a step on opponents virus, you create a base."}),Object(C.jsx)("li",{children:"Each base can either be active or inactive."})]})})},3:{imgSrc:"/img/rules/3.png",element:Object(C.jsx)("div",{className:"rules-text content",children:Object(C.jsx)("ul",{children:Object(C.jsxs)("li",{children:["Any base, that have a virus or ",Object(C.jsx)("b",{children:"active"})," base near it is active."]})})})},4:{imgSrc:"/img/rules/4.png",element:Object(C.jsx)("content",{className:"rules-text content",children:Object(C.jsxs)("ul",{children:[Object(C.jsx)("li",{children:"You can make steps on cells that are near viruses, or active bases."}),Object(C.jsx)("li",{children:"Inactive bases can not produce viruses."})]})})},5:{imgSrc:"/img/rules/5.png",element:Object(C.jsx)("div",{className:"rules-text content",children:Object(C.jsxs)("ul",{children:[Object(C.jsx)("li",{children:"Player that can not make a legal 3-step move loses."}),Object(C.jsx)("li",{children:"That's it! What the winning move for white would be here?"})]})})}}},n.onNext=n.onNext.bind(Object(l.a)(n)),n.onPrev=n.onPrev.bind(Object(l.a)(n)),n}return Object(r.a)(s,[{key:"render",value:function(){return Object(C.jsxs)("div",{children:[Object(C.jsx)("div",{className:"has-text-centered rules-title is-bold",children:"Rules"}),Object(C.jsx)("div",{className:"container",children:Object(C.jsxs)("div",{className:"columns",children:[Object(C.jsx)("div",{className:"column is-5-tablet rules-image",children:Object(C.jsx)("img",{src:this.state.data[this.state.currentSlide].imgSrc,alt:"screen shot"})}),Object(C.jsx)("div",{className:"column rules-text",children:this.state.data[this.state.currentSlide].element})]})}),Object(C.jsx)("div",{disabled:this.state.currentSlide===Object.keys(this.state.data).length,className:"button rules-button rules-next-button button-on-danger",onClick:this.onNext,children:" Next"}),Object(C.jsx)("div",{disabled:1===this.state.currentSlide,className:"button rules-button rules-prev-button button-on-danger",onClick:this.onPrev,children:" Previous"}),Object(C.jsx)("div",{className:"button rules-button rules-back-button button-on-danger",onClick:this.props.onCloseClick,children:"Close"})]})}}]),s}(i.a.Component),J=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(e){return Object(o.a)(this,s),t.call(this,e)}return Object(r.a)(s,[{key:"render",value:function(){return Object(C.jsx)("div",{className:"container",children:Object(C.jsxs)("div",{className:"tile is-ancestor",children:[Object(C.jsx)("div",{className:"tile is-parent",children:Object(C.jsx)("div",{className:"tile is-child notification",children:"Create room"})}),Object(C.jsx)("div",{className:"tile is-parent",children:Object(C.jsx)("div",{className:"tile is-child notification",children:"Join room"})})]})})}}]),s}(i.a.Component),Y=null!==(m=null===(v=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_MEDIUM_AI_ENABLED:"True",REACT_APP_SERVER_URL:"virus-war-backend.herokuapp.com"}))||void 0===v?void 0:v.REACT_APP_EASY_AI_ENABLED)&&void 0!==m&&m,q=null!==(f=null===(x=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_MEDIUM_AI_ENABLED:"True",REACT_APP_SERVER_URL:"virus-war-backend.herokuapp.com"}))||void 0===x?void 0:x.REACT_APP_MEDIUM_AI_ENABLED)&&void 0!==f&&f,$=null!==(k=null===(g=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_MEDIUM_AI_ENABLED:"True",REACT_APP_SERVER_URL:"virus-war-backend.herokuapp.com"}))||void 0===g?void 0:g.REACT_APP_HARD_AI_ENABLED)&&void 0!==k&&k;K.a.setAppElement("#root");var Q=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).handleToggleRules=n.handleToggleRules.bind(Object(l.a)(n)),n.handleToggleOnline=n.handleToggleOnline.bind(Object(l.a)(n)),n.state={showRules:!1,showOnline:!1},n}return Object(r.a)(s,[{key:"handleToggleRules",value:function(){this.setState({showRules:!this.state.showRules})}},{key:"handleToggleOnline",value:function(){this.setState({showOnline:!this.state.showOnline})}},{key:"render",value:function(){return Object(C.jsxs)("div",{className:"container is-fluid menu-hero",children:[Object(C.jsx)("div",{className:"tile is-ancestor",children:Object(C.jsx)("div",{className:"tile is-parent",children:Object(C.jsx)("div",{className:"tile is-parent is-12",children:Object(C.jsx)("div",{className:"tile is-child notification is-game-title",children:Object(C.jsxs)("div",{className:"has-text-centered",children:[Object(C.jsx)("div",{className:"title",children:"Virus War Game"}),Object(C.jsx)("div",{className:"subtitle",children:"Two-player game with easy rules and deep strategy"})]})})})})}),Object(C.jsx)("div",{className:"title is-ancestor",children:Object(C.jsxs)("div",{className:"tile",children:[Object(C.jsx)("div",{className:"tile is-parent ",children:Object(C.jsxs)("article",{className:"tile is-child notification is-danger",children:[Object(C.jsx)("div",{className:"has-text-centered",children:Object(C.jsx)("div",{className:"title",children:"Read Rules"})}),Object(C.jsxs)("div",{className:"button menu-button button-on-danger",onClick:this.handleToggleRules,children:[Object(C.jsx)("span",{role:"img","aria-label":"book",children:"\ud83d\udcd6"})," Rules"]})]})}),Object(C.jsx)("div",{className:"tile is-parent ",children:Object(C.jsxs)("article",{className:"tile is-child notification is-warning",children:[Object(C.jsx)("div",{className:"has-text-centered",children:Object(C.jsx)("div",{className:"title",children:"Play With AI"})}),Y?Object(C.jsxs)("div",{className:"button menu-button button-on-warning",onClick:this.props.onNavigationClick.bind(this,"easy"),children:[Object(C.jsx)("span",{role:"img","aria-label":"easy",children:"\ud83d\udc76"})," Tony"]}):Object(C.jsx)("div",{}),q?Object(C.jsxs)("div",{className:"button menu-button button-on-warning",onClick:this.props.onNavigationClick.bind(this,"medium"),children:[Object(C.jsx)("span",{role:"img","aria-label":"medium",children:"\ud83e\udd13"})," Jessie"]}):Object(C.jsx)("div",{}),$?Object(C.jsxs)("div",{className:"button menu-button button-on-warning",onClick:this.props.onNavigationClick.bind(this,"hard"),children:[Object(C.jsx)("span",{role:"img","aria-label":"hard",children:"\ud83e\udd16"})," Max"]}):Object(C.jsx)("div",{}),Y||q||$?Object(C.jsx)("div",{}):Object(C.jsxs)("div",{className:"label",children:[" ",Object(C.jsx)("br",{}),"No AI backends are enabled at the moment :("]})]})}),Object(C.jsx)("div",{className:"tile is-parent ",children:Object(C.jsxs)("article",{className:"tile is-child notification is-info",children:[Object(C.jsx)("div",{className:"has-text-centered",children:Object(C.jsx)("div",{className:"title",children:"Play With a Friend"})}),Object(C.jsxs)("div",{className:"button menu-button button-on-info",onClick:this.props.onNavigationClick.bind(this,"offline"),children:[Object(C.jsx)("span",{role:"img","aria-label":"offline",children:"\ud83e\udd1c\ud83e\udd1b"}),"\u200d Offline"]})]})})]})}),Object(C.jsx)(K.a,{isOpen:this.state.showRules,onRequestClose:this.handleToggleRules,className:"rules-modal",overlayClassName:"overlay",shouldFocusAfterRender:!1,children:Object(C.jsx)(V,{onCloseClick:this.handleToggleRules})}),Object(C.jsx)(K.a,{isOpen:this.state.showOnline,onRequestClose:this.handleToggleOnline,className:"rules-modal",overlayClassName:"overlay",shouldFocusAfterRender:!1,children:Object(C.jsx)(J,{onCloseClick:this.handleToggleOnline,createRoom:this.handleToggleOnline,joinRoom:this.handleToggleOnline})})]})}}]),s}(i.a.Component),X=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"render",value:function(){return Object(C.jsx)("footer",{className:"footer my-footer",children:Object(C.jsxs)("div",{className:"content has-text-centered",children:[Object(C.jsxs)("p",{children:["Created by ",Object(C.jsx)("a",{href:"https://nkorobkov.com",children:"Nikita Korobkov"}),". Code is licensed under",Object(C.jsx)("a",{href:"http://opensource.org/licenses/mit-license.php",children:" MIT"})," license."]}),Object(C.jsxs)("p",{children:[Object(C.jsx)("a",{href:"https://github.com/nkorobkov/virus-frontend",children:"Source Frontend"})," ||",Object(C.jsx)("a",{href:"https://github.com/nkorobkov/virus-game",children:" Source Backend"})," ||",Object(C.jsx)("a",{href:"https://nkorobkov.com/projects/virus",children:" Project Description"})]})]})})}}]),s}(i.a.Component),Z=function(e){Object(d.a)(s,e);var t=Object(h.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).handleNavigation=function(e){n.setState({activePage:e})},n.handleMenuClick=function(){n.setState({activePage:"menu"})},n.state={activePage:"menu"},n.handleMenuClick=n.handleMenuClick.bind(Object(l.a)(n)),n.handleNavigation=n.handleNavigation.bind(Object(l.a)(n)),n}return Object(r.a)(s,[{key:"render",value:function(){var e;switch(this.state.activePage){case"menu":e=Object(C.jsx)(Q,{onNavigationClick:this.handleNavigation});break;case"easy":e=Object(C.jsx)(G,{type:"ai",aiType:"easy",onMenuClick:this.handleMenuClick});break;case"medium":e=Object(C.jsx)(G,{type:"ai",aiType:"medium",onMenuClick:this.handleMenuClick});break;case"hard":e=Object(C.jsx)(G,{type:"ai",aiType:"hard",onMenuClick:this.handleMenuClick});break;case"offline":e=Object(C.jsx)(G,{type:"offline",onMenuClick:this.handleMenuClick});break;default:e=Object(C.jsx)(Q,{onNavigationClick:this.handleNavigation})}return Object(C.jsxs)("div",{children:[e,Object(C.jsx)(X,{})]})}}]),s}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(C.jsx)(Z,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[37,1,2]]]);
//# sourceMappingURL=main.c335e1a1.chunk.js.map