(this["webpackJsonpvirus-frontend"]=this["webpackJsonpvirus-frontend"]||[]).push([[0],{33:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var s=n(1),i=n.n(s),a=n(14),c=n.n(a),r=(n(33),n(3)),o=n(4),l=n(7),d=n(6),u=n(5),h=n(10),p=n(2),b=n.n(p),j=n(8),m=n(11),O=n.n(m),v=n(16);var f,x,k,g,C,N,y,S,E=function(e){var t="/img/";switch(e){case 0:t+="empty.png";break;case 1:t+="blueActive.png";break;case 2:t+="blueBase.png";break;case-1:t+="redActive.png";break;case-2:t+="redBase.png";break;default:t+="empty.png"}return t},_=n(0),A=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=E(this.props.state);return Object(_.jsx)("img",{alt:"cell",className:"cell",src:e,onClick:this.props.onClick.bind(this,this.props.h,this.props.w)})}}]),n}(i.a.Component),w=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this,t=Object(v.a)(Array(this.props.size).keys()).map((function(t){var n=e.props.N,s=t,i=n*e.props.size+s,a=e.props.field[i];return Object(_.jsx)(A,{h:n,w:s,onClick:e.props.onCellClick,state:a},i)}));return Object(_.jsx)("div",{className:"field-row",children:t})}}]),n}(i.a.Component),T=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return this.fieldElement=Object(v.a)(Array(this.props.sizeH).keys()).map((function(t){return Object(_.jsx)(w,{size:e.props.sizeW,N:t,onCellClick:e.props.onCellClick,field:e.props.field},t)})),Object(_.jsx)("div",{className:"game-field",children:this.fieldElement})}}]),n}(i.a.Component),R=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e="team-name "+(1===this.props.id?"blue-name":"red-name");return Object(_.jsx)("span",{className:e,children:1===this.props.id?"Blue":"Red"})}}]),n}(i.a.Component),P=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(_.jsx)("img",{alt:"cell",className:this.props.class,src:this.props.img})}}]),n}(i.a.Component),M=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=E(this.props.id),t=E(0),n="move-dot "+(1===this.props.id?"blue-name":"red-name");return Object(_.jsxs)("div",{children:[Object(_.jsx)(P,{img:this.props.n>2?e:t,class:n}),Object(_.jsx)(P,{img:this.props.n>1?e:t,class:n}),Object(_.jsx)(P,{img:this.props.n>0?e:t,class:n})]})}}]),n}(i.a.Component),B=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).state={clicked:!1},s.pressed=s.pressed.bind(Object(l.a)(s)),s}return Object(o.a)(n,[{key:"pressed",value:function(){this.setState({clicked:!this.state.clicked})}},{key:"render",value:function(){return this.props.gameState.isGameEnded||0===this.props.gameState.history.length?Object(_.jsx)("div",{children:Object(_.jsx)("div",{className:"button sidebar-button button-on-info",onClick:this.props.onMenuClick,children:"Menu"})}):this.state.clicked?Object(_.jsxs)("div",{children:[Object(_.jsx)("div",{className:"info-line",children:"Your game would be lost You sure you want to exit?"}),Object(_.jsxs)("div",{className:"columns",children:[Object(_.jsx)("span",{className:"column button sidebar-button button-on-info",onClick:this.props.onMenuClick,children:"Yes"}),Object(_.jsx)("span",{className:"column button sidebar-button button-on-info",onClick:this.pressed,children:"No"})]})]}):Object(_.jsx)("div",{children:Object(_.jsx)("div",{className:"button sidebar-button button-on-info",onClick:this.pressed,children:"Menu"})})}}]),n}(i.a.Component),I=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props.gameState.stepsLeft,t=this.props.gameState.toMove;return this.props.gameState.isGameEnded?Object(_.jsx)("div",{children:Object(_.jsxs)("div",{className:"info-line",children:["Team ",Object(_.jsx)(R,{id:this.props.gameState.winner})," won!"]})}):"offline"===this.props.type||t===this.props.gameState.team?Object(_.jsxs)("div",{children:["offline"===this.props.type?Object(_.jsxs)("div",{className:"info-line",children:[Object(_.jsx)(R,{id:this.props.gameState.toMove})," moves"]}):Object(_.jsx)("div",{className:"info-line",children:"Your move"}),Object(_.jsxs)("div",{className:"info-line",children:[" ",e," step",1===e?"":"s"," left"]}),Object(_.jsx)("div",{className:"info-line",children:Object(_.jsx)(M,{n:e,id:t})})]}):Object(_.jsx)("div",{className:"info-line",children:"Oponents move"})}}]),n}(i.a.Component),L=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return this.props.shouldShow?Object(_.jsx)("div",{className:"button sidebar-button button-on-info",onClick:this.props.onRollBack,children:"TakeBack"}):Object(_.jsx)("div",{})}}]),n}(i.a.Component),D=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this.props.isGameCompleted?"Play Again":"Resign",t=this.props.isBackendConnected&&this.props.isOpponentConnected;return this.props.shouldShow?Object(_.jsx)("div",{className:"button sidebar-button button-on-info",disabled:!t,onClick:this.props.onPlayAgain,children:e}):Object(_.jsx)("div",{})}}]),n}(i.a.Component),W=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).state={copied:!1},s}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return"online"===this.props.type?Object(_.jsx)("div",{children:Object(_.jsxs)("span",{className:"tags has-addons",children:[Object(_.jsxs)("span",{className:"tag is-light is-large ",children:["Room # ",Object(_.jsxs)("code",{children:[" ",this.props.roomId]})]}),Object(_.jsx)("button",{className:"tag is-large button",onClick:function(){navigator.clipboard.writeText(e.props.roomId),e.setState({copied:!0}),setTimeout((function(){return e.setState({copied:!1})}),3e3)},children:"\ud83d\udccb"}),this.state.copied?"Copied":""]})}):Object(_.jsx)("div",{})}}]),n}(i.a.Component),z=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){if("offline"===this.props.type)return Object(_.jsx)("div",{});var e=this.props.isBackendConnected?"green":"red",t=this.props.isOpponentConnected?"green":"red",n=Object(_.jsxs)("span",{children:[Object(_.jsx)("span",{className:e+" dot"})," backend is"," ",this.props.isBackendConnected?"":"not ","connected"]}),s="online"===this.props.type?Object(_.jsxs)("span",{children:[Object(_.jsx)("span",{className:t+" dot"})," opponent is"," ",this.props.isOpponentConnected?"":"not ","connected"]}):Object(_.jsx)("span",{});return Object(_.jsxs)("div",{className:"connection-status",children:[n,Object(_.jsx)("br",{}),s]})}}]),n}(i.a.Component),U=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(_.jsxs)("div",{children:[Object(_.jsx)(z,{isBackendConnected:this.props.gameState.isBackendConnected,isOpponentConnected:this.props.gameState.isOpponentConnected,type:this.props.type}),Object(_.jsx)(W,{roomId:this.props.gameState.roomId,type:this.props.type}),Object(_.jsx)("br",{}),Object(_.jsxs)("div",{className:"has-text-centered",children:[Object(_.jsx)(I,{gameState:this.props.gameState,type:this.props.type}),Object(_.jsx)(L,{onRollBack:this.props.onRollBack,shouldShow:"offline"===this.props.type}),Object(_.jsx)(D,{onPlayAgain:this.props.onPlayAgain,shouldShow:"online"===this.props.type,isGameCompleted:this.props.gameState.isGameEnded,isBackendConnected:this.props.gameState.isBackendConnected,isOpponentConnected:this.props.gameState.isOpponentConnected}),Object(_.jsx)(B,{gameState:this.props.gameState,onMenuClick:this.props.onMenuClick})]})]})}}]),n}(s.Component),H=function(e,t,n){return e*n+t},J=function(e,t){return e%t},G=function(e,t){return Math.floor(e/t)},F=function(e,t,n,s){var i=[];return e>0&&(i.push(H(e-1,t,s)),t>0&&i.push(H(e-1,t-1,s))),e<n-1&&(i.push(H(e+1,t,s)),t<s-1&&i.push(H(e+1,t+1,s))),t>0&&(i.push(H(e,t-1,s)),e<n-1&&i.push(H(e+1,t-1,s))),t<s-1&&(i.push(H(e,t+1,s)),e>0&&i.push(H(e-1,t+1,s))),i},K=function e(t,n,s,i){var a=H(t,n,s.sizeW);return!(i.indexOf(a)>-1)&&(i.push(a),s.field[a]===s.toMove||s.field[a]===2*s.toMove&&F(t,n,s.sizeH,s.sizeW).map((function(t){return e(G(t,s.sizeW),J(t,s.sizeW),s,i)})).some((function(e){return e})))},V=function(e,t,n){if(s=e.field[H(t,n,e.sizeW)],i=e.toMove,0!==s&&i!==-s)return!1;var s,i,a=F(t,n,e.sizeH,e.sizeW),c=[];return a.map((function(t){return K(G(t,e.sizeW),J(t,e.sizeW),e,c)})).some((function(e){return e}))},Y=function(e,t){return 0===e?t:-e+t},q=function(e){for(var t=Object(h.a)({},e),n=0;n<3;n++){for(var s=!1,i=0;i<t.sizeW*t.sizeH;i++)if(V(t,G(i,t.sizeW),J(i,t.sizeW))){s=!0;var a=t.field.slice();a[i]=Y(a[i],t.toMove),t.field=a;break}if(!s)return!1}return!0},$="virus-war-backend.herokuapp.com",Q=null!==(f=null===(x=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_MEDIUM_AI_ENABLED:"True",REACT_APP_USE_SSL:"false",REACT_APP_SERVER_URL:"virus-war-backend.herokuapp.com",REACT_APP_ONLINE_MODE_ENABLED:"True"}))||void 0===x?void 0:x.REACT_APP_EASY_AI_ENABLED)&&void 0!==f&&f,X=null!==(k=null===(g=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_MEDIUM_AI_ENABLED:"True",REACT_APP_USE_SSL:"false",REACT_APP_SERVER_URL:"virus-war-backend.herokuapp.com",REACT_APP_ONLINE_MODE_ENABLED:"True"}))||void 0===g?void 0:g.REACT_APP_MEDIUM_AI_ENABLED)&&void 0!==k&&k,Z=null!==(C=null===(N=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_MEDIUM_AI_ENABLED:"True",REACT_APP_USE_SSL:"false",REACT_APP_SERVER_URL:"virus-war-backend.herokuapp.com",REACT_APP_ONLINE_MODE_ENABLED:"True"}))||void 0===N?void 0:N.REACT_APP_HARD_AI_ENABLED)&&void 0!==C&&C,ee=null!==(y=null===(S=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_MEDIUM_AI_ENABLED:"True",REACT_APP_USE_SSL:"false",REACT_APP_SERVER_URL:"virus-war-backend.herokuapp.com",REACT_APP_ONLINE_MODE_ENABLED:"True"}))||void 0===S?void 0:S.REACT_APP_ONLINE_MODE_ENABLED)&&void 0!==y&&y,te=Q||X||Z,ne=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var s;Object(r.a)(this,n),(s=t.call(this,e)).setUpSocket=function(){var e,t="ws://";"ai"===s.props.type&&(e=t+$+"/ws/ai/"+s.props.aiType+"/"),s.timeouts=[],"online"===s.props.type&&(e=t+$+"/ws/room/"+(s.state.roomId||"")+"?team="+s.state.team),console.log("connecting to the backend",e),s.socket=new WebSocket(e),s.socket.onopen=function(){s.setState({isBackendConnected:!0}),console.log("backend connected")},s.socket.onmessage=function(e){s.handleSocketData(JSON.parse(e.data))},s.socket.onclose=function(e){console.log("Connection unexpectedly closed with code:",e.code,"retrying in two secconds"),s.setState({isBackendConnected:!1}),s.timeouts.push(setTimeout((function(){s.setUpSocket()}),2e3))}},s.handleSocketData=function(){var e=Object(j.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("handling received data",t),"move"!==t.type){e.next=4;break}return e.next=4,s.handleReceivedMove(t);case 4:if("stateUpdate"!==t.type){e.next=7;break}return e.next=7,s.setState(t.state);case 7:if("resetState"!==t.type){e.next=10;break}return e.next=10,s.resetStateFromField(t);case 10:if("error"!==t.type){e.next=13;break}return e.next=13,s.props.onMenuClick();case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.handleRollBack=function(){if(0!==s.state.history.length&&"offline"===s.props.type){var e=s.state.history.slice(),t=s.state.field.slice(),n=s.state.toMove,i=s.state.stepsLeft+1,a=s.state.isGameEnded,c=s.state.winner,r=e.pop(),o=t[r[0]*s.sizeW+r[1]];t[r[0]*s.sizeW+r[1]]=-Math.sign(o)*(Math.abs(o)-1),i>3&&(n=-n,i=1,a&&(a=!1,c=null)),s.setState({field:t,toMove:n,stepsLeft:i,history:e,isGameEnded:a,winner:c})}},s.handlePlayAgain=Object(j.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("online"===s.props.type){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,O.a.post("http://"+$+"/room/"+s.state.roomId+"/restart");case 4:case"end":return e.stop()}}),e)}))),s.handleCellClick=function(){var e=Object(j.a)(b.a.mark((function e(t,n){var i,a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i=s.state.toMove!==s.state.team&&"offline"!==s.props.type,a="online"===s.props.type&&(!s.state.isBackendConnected||!s.state.isOpponentConnected),!(i||a||s.state.isGameEnded)&&V(s.state,t,n)){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,s.makeStep(t,n);case 6:if("ai"!==s.props.type){e.next=9;break}return e.next=9,s.sendStateToAiIfNeeded();case 9:if("online"!==s.props.type){e.next=12;break}return e.next=12,s.sendMoveToOpponent(t,n);case 12:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),s.makeStep=function(){var e=Object(j.a)(b.a.mark((function e(t,n){var i,a,c,r,o,l,d;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=s.state.field.slice(),a=s.state.history.slice(),c=s.state.stepsLeft-1,r=s.state.toMove,o=s.state.winner,l=s.state.isGameEnded,i[t*s.sizeW+n]=Y(i[t*s.sizeW+n],s.state.toMove),a.push([t,n]),0===c&&(r=-r,c=3,(d=Object(h.a)({},s.state)).field=i.slice(),d.history=a.slice(),d.stepsLeft=c,d.toMove=r,q(d)||(l=!0,o=-r)),e.next=11,s.setState({toMove:r,field:i,stepsLeft:c,history:a,isGameEnded:l,winner:o});case 11:return e.abrupt("return",e.sent);case 12:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),s.sendStateToAiIfNeeded=Object(j.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(s.state.team!==s.state.toMove)||s.state.isGameEnded){e.next=10;break}if(!s.state.isBackendConnected){e.next=8;break}return e.next=5,s.socket.send(JSON.stringify(s.state));case 5:console.log("state sent for ai game"),e.next=10;break;case 8:console.log("state not sent, retrying in two seconds"),s.timeouts.push(setTimeout((function(){s.sendStateIfNeeded()}),2e3));case 10:case"end":return e.stop()}}),e)}))),s.sendMoveToOpponent=function(){var e=Object(j.a)(b.a.mark((function e(t,n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.socket.send(JSON.stringify({type:"move",move:[[t,n]],state:s.state}));case 2:console.log("state move and updated state to opponent");case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),s.resetStateFromField=function(){var e=Object(j.a)(b.a.mark((function e(t){var n,i,a,c,r,o,l;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.field,i=null,a=!1,c=n.map(Math.abs).reduce((function(e,t){return e+t}),0)-2,r=s.state.history.slice(0,c),o=Math.floor((c+1)/3)%2===0?1:-1,l={history:r,field:n,toMove:o,stepsLeft:3-(c+1)%3},console.log(l),q(Object(h.a)(Object(h.a)({},s.state),l))||(a=!0,i=-o),s.setState(Object(h.a)(Object(h.a)({},l),{},{isGameEnded:a,winner:i}));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.getInfoBarColor=function(){return 1===s.state.team?"info-background":"danger-background"},s.sizeH=8,s.sizeW=8;var i=new Array(s.sizeH*s.sizeW).fill(0);return i[0]=1,i[s.sizeH*s.sizeW-1]=-1,s.state={field:i,toMove:1,stepsLeft:2,sizeH:s.sizeH,sizeW:s.sizeW,history:[],isGameEnded:!1,winner:null,isBackendConnected:!1,isOpponentConnected:!1,team:e.team,roomId:e.roomId},s.handleCellClick=s.handleCellClick.bind(Object(l.a)(s)),s.handleRollBack=s.handleRollBack.bind(Object(l.a)(s)),s}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=Object(j.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("offline"!==this.props.type){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this.setUpSocket();case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){var e=Object(j.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("unmounting, closing socket"),!this.socket){e.next=6;break}return this.socket.onclose=null,e.next=5,this.socket.close();case 5:this.timeouts.forEach(clearTimeout);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleReceivedMove",value:function(e){var t=this;if(this.state.toMove===this.state.team||this.state.isGameEnded)throw new Error("move received when not expected");var n=e.move;if(n.length>this.state.stepsLeft)throw new Error("More moves than possible");n.forEach(function(){var e=Object(j.a)(b.a.mark((function e(n){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!V(t.state,n[0],n[1])){e.next=3;break}return e.next=3,t.makeStep(n[0],n[1]);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"render",value:function(){return Object(_.jsx)("div",{className:"container is-fluid game-container",children:Object(_.jsxs)("div",{className:"tile is-ancestor",children:[Object(_.jsx)("div",{className:"tile is-parent is-8",children:Object(_.jsx)("div",{className:"tile is-child is-game-tile",children:Object(_.jsx)(T,{sizeH:this.sizeH,sizeW:this.sizeW,onCellClick:this.handleCellClick,field:this.state.field})})}),Object(_.jsx)("div",{className:"tile is-parent",children:Object(_.jsx)("div",{className:"tile is-child is-info-bar "+this.getInfoBarColor(),children:Object(_.jsx)(U,{onMenuClick:this.props.onMenuClick,onRollBack:this.handleRollBack,onPlayAgain:this.handlePlayAgain,gameState:this.state,type:this.props.type})})})]})})}}]),n}(i.a.Component),se=n(15),ie=n.n(se),ae=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).onNext=function(){s.state.currentSlide!==Object.keys(s.state.data).length&&s.setState({currentSlide:s.state.currentSlide+1})},s.onPrev=function(){1!==s.state.currentSlide&&s.setState({currentSlide:s.state.currentSlide-1})},s.state={currentSlide:1,data:{1:{imgSrc:"/img/rules/1.png",element:Object(_.jsx)("div",{className:"rules-text content",children:Object(_.jsxs)("ul",{children:[Object(_.jsx)("li",{children:"Two players play on square grid."}),Object(_.jsx)("li",{children:"Each player can make 3 steps on a cell near his active dots (viruses) during his turn."})]})})},2:{imgSrc:"/img/rules/2.png",element:Object(_.jsx)("div",{className:"rules-text content",children:Object(_.jsxs)("ul",{children:[Object(_.jsx)("li",{children:"If you make a step on opponents virus, you create a base."}),Object(_.jsx)("li",{children:"Each base can either be active or inactive."})]})})},3:{imgSrc:"/img/rules/3.png",element:Object(_.jsx)("div",{className:"rules-text content",children:Object(_.jsx)("ul",{children:Object(_.jsxs)("li",{children:["Any base, that have a virus or ",Object(_.jsx)("b",{children:"active"})," base near it is active."]})})})},4:{imgSrc:"/img/rules/4.png",element:Object(_.jsx)("content",{className:"rules-text content",children:Object(_.jsxs)("ul",{children:[Object(_.jsx)("li",{children:"You can make steps on cells that are near viruses, or active bases."}),Object(_.jsx)("li",{children:"Inactive bases can not produce viruses."})]})})},5:{imgSrc:"/img/rules/5.png",element:Object(_.jsx)("div",{className:"rules-text content",children:Object(_.jsxs)("ul",{children:[Object(_.jsx)("li",{children:"Player that can not make a legal 3-step move loses."}),Object(_.jsx)("li",{children:"That's it! What the winning move for white would be here?"})]})})}}},s.onNext=s.onNext.bind(Object(l.a)(s)),s.onPrev=s.onPrev.bind(Object(l.a)(s)),s}return Object(o.a)(n,[{key:"render",value:function(){return Object(_.jsxs)("div",{children:[Object(_.jsx)("div",{className:"has-text-centered rules-title is-bold",children:"Rules"}),Object(_.jsx)("div",{className:"container",children:Object(_.jsxs)("div",{className:"columns",children:[Object(_.jsx)("div",{className:"column is-5-tablet rules-image",children:Object(_.jsx)("img",{src:this.state.data[this.state.currentSlide].imgSrc,alt:"screen shot"})}),Object(_.jsx)("div",{className:"column rules-text",children:this.state.data[this.state.currentSlide].element})]})}),Object(_.jsx)("div",{disabled:this.state.currentSlide===Object.keys(this.state.data).length,className:"button rules-button rules-next-button button-on-danger",onClick:this.onNext,children:" Next"}),Object(_.jsx)("div",{disabled:1===this.state.currentSlide,className:"button rules-button rules-prev-button button-on-danger",onClick:this.onPrev,children:" Previous"}),Object(_.jsx)("div",{className:"button rules-button rules-back-button button-on-danger",onClick:this.props.onCloseClick,children:"Close"})]})}}]),n}(i.a.Component);ie.a.setAppElement("#root");var ce=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).handleRoomIdChange=function(e){var t=e.target.value.replace(/\D/g,"").slice(0,4);s.setState({roomToJoin:t,canJoin:4===t.length})},s.handleJoinOnlineClick=Object(j.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.state.canJoin){e.next=2;break}return e.abrupt("return");case 2:return s.setState({isJoinLoading:!0}),e.next=5,s.checkIfRoomCanBeJoined(s.state.roomToJoin);case 5:if(!e.sent){e.next=11;break}return e.next=8,s.setState({isJoinLoading:!1});case 8:s.props.onOnlineClick(null,s.state.roomToJoin),e.next=15;break;case 11:return e.next=13,s.setState({isJoinLoading:!1});case 13:console.log("there is no room with this id"),s.showNotification("Room with id "+s.state.roomToJoin+" does not exist \ud83c\udf1a");case 15:case"end":return e.stop()}}),e)}))),s.handleCreateOnlineClick=function(e){s.props.onOnlineClick(e)},s.checkIfRoomCanBeJoined=function(){var e=Object(j.a)(b.a.mark((function e(t){var n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.a.get("http://"+$+"/room/"+t+"/");case 2:return n=e.sent,e.abrupt("return",n.data.exists&&n.data.teams_joined.length<2);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.showNotification=function(e){s.setState({notification:e}),setTimeout(s.setState.bind(Object(l.a)(s),{notification:""}),5e3)},s.handleToggleRules=s.handleToggleRules.bind(Object(l.a)(s)),s.state={showRules:!1,roomToJoin:"",canJoin:!1,joinLoading:!1,notification:""},s}return Object(o.a)(n,[{key:"handleToggleRules",value:function(){this.setState({showRules:!this.state.showRules})}},{key:"render",value:function(){return Object(_.jsxs)("div",{className:"container is-fluid menu-hero",children:[Object(_.jsx)("div",{className:"tile is-ancestor",children:Object(_.jsx)("div",{className:"tile is-parent",children:Object(_.jsx)("div",{className:"tile is-parent is-12",children:Object(_.jsx)("div",{className:"tile is-child notification is-game-title",children:Object(_.jsxs)("div",{className:"has-text-centered",children:[Object(_.jsx)("div",{className:"title",children:"Virus War Game"}),Object(_.jsx)("div",{className:"subtitle",children:"Two-player game with easy rules and deep strategy"})]})})})})}),this.state.notification?Object(_.jsx)("div",{className:"tile is-ancestor",children:Object(_.jsx)("div",{className:"tile is-parent",children:Object(_.jsx)("div",{className:"tile is-parent is-12",children:Object(_.jsx)("div",{className:"tile is-child notification",children:Object(_.jsx)("div",{className:"has-text-centered",children:Object(_.jsx)("div",{children:this.state.notification})})})})})}):Object(_.jsx)("div",{}),Object(_.jsx)("div",{className:"title is-ancestor",children:Object(_.jsxs)("div",{className:"tile",children:[Object(_.jsx)("div",{className:"tile is-parent ",children:Object(_.jsxs)("article",{className:"tile is-child notification is-danger",children:[Object(_.jsx)("div",{className:"has-text-centered",children:Object(_.jsx)("div",{className:"title",children:"Explore the game"})}),Object(_.jsxs)("div",{className:"button menu-button button-on-danger",onClick:this.handleToggleRules,children:[Object(_.jsx)("span",{role:"img","aria-label":"book",children:"\ud83d\udcd6"})," ","Read Rules"]}),Object(_.jsxs)("div",{className:"button menu-button button-on-danger",onClick:this.props.onNavigationClick.bind(this,"offline"),children:[Object(_.jsx)("span",{role:"img","aria-label":"offline",children:"\ud83d\uddfa\ufe0f"}),"\u200d Analysis Board"]})]})}),te?Object(_.jsx)("div",{className:"tile is-parent ",children:Object(_.jsxs)("article",{className:"tile is-child notification is-warning",children:[Object(_.jsx)("div",{className:"has-text-centered",children:Object(_.jsx)("div",{className:"title",children:"Play With AI"})}),Q?Object(_.jsxs)("div",{className:"button menu-button button-on-warning",onClick:this.props.onNavigationClick.bind(this,"easy"),children:[Object(_.jsx)("span",{role:"img","aria-label":"easy",children:"\ud83d\udc76"})," ","Easy"]}):Object(_.jsx)("div",{}),X?Object(_.jsxs)("div",{className:"button menu-button button-on-warning",onClick:this.props.onNavigationClick.bind(this,"medium"),children:[Object(_.jsx)("span",{role:"img","aria-label":"medium",children:"\ud83e\udd13"})," ","Medium"]}):Object(_.jsx)("div",{}),Z?Object(_.jsxs)("div",{className:"button menu-button button-on-warning",onClick:this.props.onNavigationClick.bind(this,"hard"),children:[Object(_.jsx)("span",{role:"img","aria-label":"hard",children:"\ud83e\udd16"})," ","Hard"]}):Object(_.jsx)("div",{}),Q||X||Z?Object(_.jsx)("div",{}):Object(_.jsxs)("div",{className:"label",children:[" ",Object(_.jsx)("br",{}),"No AI backends are enabled at the moment :("]})]})}):Object(_.jsx)("div",{}),ee?Object(_.jsx)("div",{className:"tile is-parent ",children:Object(_.jsxs)("article",{className:"tile is-child notification is-info",children:[Object(_.jsx)("div",{className:"has-text-centered",children:Object(_.jsx)("div",{className:"title",children:"Play With a Friend"})}),Object(_.jsxs)("div",{className:"button menu-button button-on-info",onClick:this.handleCreateOnlineClick.bind(this,1),children:[Object(_.jsx)("span",{role:"img","aria-label":"online",children:"\ud83c\udfae"})," ","Create a game"]}),Object(_.jsx)("hr",{}),Object(_.jsx)("input",{className:"input is-info menu-button",type:"text",placeholder:"4-digit room code",value:this.state.roomToJoin,onChange:this.handleRoomIdChange}),Object(_.jsxs)("div",{className:(this.state.isJoinLoading?"is-loading ":"")+"button menu-button button-on-info",disabled:!this.state.canJoin,onClick:this.handleJoinOnlineClick.bind(this),children:[Object(_.jsx)("span",{role:"img","aria-label":"online",children:"\ud83c\udf9f\ufe0f"})," ","Join by code"]})]})}):Object(_.jsx)("div",{})]})}),Object(_.jsx)(ie.a,{isOpen:this.state.showRules,onRequestClose:this.handleToggleRules,className:"rules-modal",overlayClassName:"overlay",shouldFocusAfterRender:!1,children:Object(_.jsx)(ae,{onCloseClick:this.handleToggleRules})})]})}}]),n}(i.a.Component),re=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(_.jsx)("footer",{className:"footer my-footer",children:Object(_.jsxs)("div",{className:"content has-text-centered",children:[Object(_.jsxs)("p",{children:["Created by ",Object(_.jsx)("a",{href:"https://nkorobkov.com",children:"Nikita Korobkov"}),". Code is licensed under",Object(_.jsx)("a",{href:"http://opensource.org/licenses/mit-license.php",children:" MIT"})," license."]}),Object(_.jsxs)("p",{children:[Object(_.jsx)("a",{href:"https://github.com/nkorobkov/virus-frontend",children:"Source Frontend"})," ||",Object(_.jsx)("a",{href:"https://github.com/nkorobkov/virus-game",children:" Source Backend"})," ||",Object(_.jsx)("a",{href:"https://nkorobkov.com/projects/virus",children:" Project Description"})]})]})})}}]),n}(i.a.Component),oe=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(r.a)(this,n),(s=t.call(this,e)).handleNavigation=function(e){s.setState({activePage:e})},s.handleOnlineGame=function(e,t){s.setState({activePage:"online",team:e,roomId:t})},s.handleMenuClick=function(){s.setState({activePage:"menu"})},s.state={activePage:"menu"},s.handleMenuClick=s.handleMenuClick.bind(Object(l.a)(s)),s.handleNavigation=s.handleNavigation.bind(Object(l.a)(s)),s}return Object(o.a)(n,[{key:"render",value:function(){var e;switch(this.state.activePage){case"menu":e=Object(_.jsx)(ce,{onNavigationClick:this.handleNavigation,onOnlineClick:this.handleOnlineGame});break;case"easy":e=Object(_.jsx)(ne,{type:"ai",aiType:"easy",team:1,onMenuClick:this.handleMenuClick});break;case"medium":e=Object(_.jsx)(ne,{type:"ai",aiType:"medium",team:1,onMenuClick:this.handleMenuClick});break;case"hard":e=Object(_.jsx)(ne,{type:"ai",aiType:"hard",team:1,onMenuClick:this.handleMenuClick});break;case"online":e=Object(_.jsx)(ne,{type:"online",roomId:this.state.roomId,team:this.state.team,onMenuClick:this.handleMenuClick});break;case"offline":e=Object(_.jsx)(ne,{type:"offline",team:1,onMenuClick:this.handleMenuClick});break;default:e=Object(_.jsx)(ce,{onNavigationClick:this.handleNavigation,onOnlineClick:this.handleOnlineGame})}return Object(_.jsxs)("div",{children:[e,Object(_.jsx)(re,{})]})}}]),n}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(_.jsx)(oe,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[65,1,2]]]);
//# sourceMappingURL=main.ef3ca63b.chunk.js.map