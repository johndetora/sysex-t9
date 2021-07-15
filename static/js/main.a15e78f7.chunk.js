(this["webpackJsonpsysex-t9"]=this["webpackJsonpsysex-t9"]||[]).push([[0],{13:function(e,t){},25:function(e,t){},26:function(e,t){},27:function(e,t,s){},28:function(e,t,s){"use strict";s.r(t);var n=s(1),c=s.n(n),r=s(14),o=s.n(r),a=s(11),i=s(4),l=s(3),d=s.n(l),h=(s(5),s(0)),j=function(e){return d.a.enable((function(t){t&&alert("WebMidi could not be enabled.",t);var s=d.a.inputs[0],n=d.a.outputs[0];e.setInput(s),e.setOutput(n)}),!0),Object(h.jsxs)("div",{className:"midi-ports",children:[Object(h.jsx)("span",{children:"Input Port: "}),Object(h.jsx)("select",{className:"ports",onChange:function(e){return console.log(e)},children:d.a.inputs.map((function(e){return Object(h.jsx)("option",{children:e.name},e.id)}))}),Object(h.jsx)("span",{className:"output",children:"Output Port: "}),Object(h.jsx)("select",{className:"ports",children:d.a.outputs.map((function(e){return Object(h.jsx)("option",{children:e.name},e.id)}))})]})},u=s(2);var p=function(e){return Object(h.jsxs)("label",{className:"button",children:["Import Sheet",Object(h.jsx)("input",{type:"file",className:"file",onChange:function(t){!function(t){var s=new FileReader;s.readAsArrayBuffer(t),s.onload=function(t){var s=t.target.result,n=u.read(s,{type:"buffer"}).Sheets.SysEx;console.log("worksheet",n);var c=u.utils.sheet_to_json(n,{header:1});console.group(),console.table("data",c);for(var r=[],o=c.length,a=3;a<o;a++)r.push({index:a,name:c[a][0],port:c[a][1],sysex:c[a][2],expected:c[a][3],expectedLength:null,response:"",responseLength:null,passFail:null});e.setItems(r),console.log("Worksheet load successful"),e.help(!1)}}(t.target.files[0])}})]})};var b=function(e){var t=u.utils.book_new(),s=u.utils.json_to_sheet(e.data);return u.utils.book_append_sheet(t,s,"Sysex Results"),Object(h.jsx)("div",{children:Object(h.jsx)("button",{className:"button",onClick:function(){return u.writeFile(t,"sysex-results.xlsx")},children:"Export to New Sheet"})})};var x=function(){return Object(h.jsxs)("div",{className:"window",children:[Object(h.jsxs)("section",{className:"window__header",children:[Object(h.jsx)("h4",{children:"Welcome to Sysex Tester 9"}),Object(h.jsx)("p",{children:"Sysex T9 will import your excel sheets and parse the cells for sysex data, where you will be able to send the messages to your MIDI device while monitoring the response."}),"________________"]}),Object(h.jsxs)("section",{className:"window__content",children:[Object(h.jsx)("p",{children:" To use Sysex T9: "}),Object(h.jsxs)("p",{children:[" ","1. Create an excel sheet based on"," ",Object(h.jsx)("a",{href:".",target:"_blank",children:"this template"})]}),Object(h.jsxs)("p",{children:["2. Click the Import Sheet button. NOTE: This menu will disappear once a sheet is imported. Access this window again by clicking [help]"," "]}),Object(h.jsx)("p",{children:"3. Make sure your Input and Output Ports are set to the proper MIDI Device "}),Object(h.jsx)("p",{children:" 4. Click Send to send each Sysex message. If the message is successful, the response will be written to the Response cell. "}),Object(h.jsxs)("p",{children:["5. Along with the Sysex response message, the amount of bytes sent and received will be written and compared. ",Object(h.jsx)("br",{}),"If the number of bytes of the response matches the expected number of bytes, the message will be colored green. If the incorrect amount of bytes are received, the message will be colored red."]}),Object(h.jsx)("p",{children:"6. Once finished, [Export to New Sheet] and save the results to your system"}),"________________"]}),Object(h.jsxs)("section",{className:"window__footer",children:[Object(h.jsx)("p",{}),"If you want to see more data while operating Sysex T9:",Object(h.jsx)("p",{}),"1. Open up the console on your browser by right clicking anywhere and clicking [Inspect].",Object(h.jsx)("p",{}),"2. Click on the [Console] tab to get readouts of the data being sent and received.",Object(h.jsx)("p",{}),"If you want to access this menu again, press the [help] button at any time.",Object(h.jsx)("p",{})]})]})};var O=function(e){var t=e.help,s=e.setHelp;return Object(h.jsx)("div",{children:Object(h.jsx)("button",{className:"button",onClick:function(){return s(!t)},children:"help"})})};s(27);var m=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),s=t[0],c=t[1],r=Object(n.useState)(),o=Object(i.a)(r,2),l=o[0],d=o[1],u=Object(n.useState)(),m=Object(i.a)(u,2),f=m[0],g=m[1],_=Object(n.useState)([]),y=Object(i.a)(_,2),v=(y[0],y[1],Object(n.useState)(!0)),w=Object(i.a)(v,2),N=w[0],I=w[1];function S(e){console.log(e);var t=parseInt(e.target.id),n=s.filter((function(e){return e.index===t})).map((function(e){return e.sysex})).join(" ").split(" ");n.splice(0,1);var r=n.map((function(e){return e="0x"+e,parseInt(Number(e,10))}));console.log("sent: (RAW)",r),f?(f.send(240,r),function(e){l.addListener("sysex","all",(function(t){var n=Object(a.a)(t.data);console.log("received (RAW):",n),console.log("response length is",n.length),function(e,t){var n=s.map((function(s){return s.index===e&&(-1===s.response.indexOf("F0")&&(s.response+=t),s.expectedLength||(s.expectedLength+=s.expected.split(" ").length),s.responseLength||(s.responseLength+=function(e){return e.length}(t)),s.responseLength===s.expectedLength&&(s.passFail="pass",console.table(s))),s}));console.log("sysex response: "+t.join("")),c(n)}(e,function(e){return e.map((function(e){return 2===(e=e.toString(16)+" ").length&&(e="0"+e),e.toUpperCase()}))}(n))}))}(t)):alert("No MIDI output port selected")}return Object(h.jsxs)("div",{className:"container",children:[Object(h.jsx)("p",{className:"title",children:"Sysex T9"}),Object(h.jsxs)("div",{className:"utilities",children:[Object(h.jsx)(p,{setItems:c,help:I}),Object(h.jsx)(j,{setInput:d,setOutput:g,input:l,output:f}),Object(h.jsx)(b,{data:s}),Object(h.jsx)(O,{help:N,setHelp:I})]}),N?Object(h.jsx)(x,{}):"",Object(h.jsx)("div",{className:"main-container",children:Object(h.jsxs)("table",{className:"table-container",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{className:s.length>2?"table-header":"invisible",children:[Object(h.jsx)("th",{className:"header__item",children:"Name"}),Object(h.jsx)("th",{children:"Port"}),Object(h.jsx)("th",{children:"Sysex Message"}),Object(h.jsx)("th",{children:"Expected"}),Object(h.jsx)("th",{children:"Response"})]})}),Object(h.jsx)("tbody",{children:s.map((function(e){return Object(h.jsxs)("tr",{className:"table_row",children:[Object(h.jsx)("td",{className:"msg_name",children:e.name}),Object(h.jsx)("td",{className:"port",children:e.port}),Object(h.jsx)("td",{className:"sysex-container",children:Object(h.jsxs)("div",{className:"sysex-cell",children:[e.sysex,Object(h.jsxs)("button",{className:"send-button",id:e.index,value:e.sysex,onClick:S,children:["send"," "]})]})}),Object(h.jsxs)("td",{className:"response",children:[e.expected," ",e.expectedLength]}),Object(h.jsx)("td",{className:"response",children:e.response.match(/[^,*]/gm)}),Object(h.jsx)("br",{}),Object(h.jsx)("div",{className:"pass"===e.passFail?"pass":"fail",children:e.responseLength?"Response: ".concat(e.responseLength," bytes"):""})]},e.index)}))})]})}),Object(h.jsx)("footer",{children:"\xa9 Copyright 2021 John DeTora. All rights reserved."})]})};o.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(m,{})}),document.getElementById("root"))},5:function(e,t,s){}},[[28,1,2]]]);
//# sourceMappingURL=main.a15e78f7.chunk.js.map