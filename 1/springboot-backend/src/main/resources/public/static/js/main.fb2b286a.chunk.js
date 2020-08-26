(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{31:function(e,t,a){e.exports=a(62)},36:function(e,t,a){},37:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},38:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(28),m=a.n(r),c=(a(36),a(37),a(38),a(29)),o=a(1),s=a(3),i=a(4),u=a(5),d=a(10),p=a(9),E=a(13),h=a.n(E),y="https://learn-learn-from-youtube.herokuapp.com/api/v1/employees",v=new(function(){function e(){Object(s.a)(this,e)}return Object(i.a)(e,[{key:"getEmployees",value:function(){return h.a.get(y)}},{key:"createEmployee",value:function(e){return h.a.post(y,e)}},{key:"getEmployeeById",value:function(e){return h.a.get(y+"/"+e)}},{key:"updateEmployee",value:function(e,t){return h.a.put(y+"/"+t,e)}},{key:"deleteEmployee",value:function(e){return h.a.delete(y+"/"+e)}}]),e}()),f=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={employees:[]},n.addEmployee=n.addEmployee.bind(Object(u.a)(n)),n.editEmployee=n.editEmployee.bind(Object(u.a)(n)),n.deleteEmployee=n.deleteEmployee.bind(Object(u.a)(n)),n}return Object(i.a)(a,[{key:"deleteEmployee",value:function(e){var t=this;v.deleteEmployee(e).then((function(a){t.setState({employees:t.state.employees.filter((function(t){return t.id!==e}))})}))}},{key:"viewEmployee",value:function(e){this.props.history.push("/view-employee/".concat(e))}},{key:"editEmployee",value:function(e){this.props.history.push("/add-employee/".concat(e))}},{key:"componentDidMount",value:function(){var e=this;v.getEmployees().then((function(t){e.setState({employees:t.data})}))}},{key:"addEmployee",value:function(){this.props.history.push("/add-employee/_add")}},{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("h2",{className:"text-center"},"Employees List"),l.a.createElement("div",{className:"row"},l.a.createElement("button",{className:"btn btn-primary",onClick:this.addEmployee}," Add Employee")),l.a.createElement("br",null),l.a.createElement("div",{className:"row"},l.a.createElement("table",{className:"table table-striped table-bordered"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null," Employee First Name"),l.a.createElement("th",null," Employee Last Name"),l.a.createElement("th",null," Employee Email Id"),l.a.createElement("th",null," Actions"))),l.a.createElement("tbody",null,this.state.employees.map((function(t){return l.a.createElement("tr",{key:t.id},l.a.createElement("td",null," ",t.firstName," "),l.a.createElement("td",null," ",t.lastName),l.a.createElement("td",null," ",t.emailId),l.a.createElement("td",null,l.a.createElement("button",{onClick:function(){return e.editEmployee(t.id)},className:"btn btn-info"},"Update "),l.a.createElement("button",{style:{marginLeft:"10px"},onClick:function(){return e.deleteEmployee(t.id)},className:"btn btn-danger"},"Delete "),l.a.createElement("button",{style:{marginLeft:"10px"},onClick:function(){return e.viewEmployee(t.id)},className:"btn btn-info"},"View ")))}))))))}}]),a}(n.Component),b=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={},n}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("header",null,l.a.createElement("nav",{className:"navbar navbar-expand-md navbar-dark bg-dark"},l.a.createElement("div",null,l.a.createElement("a",{href:"https://javaguides.net",className:"navbar-brand"},"Employee Management App")))))}}]),a}(n.Component),N=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={},n}return Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("footer",{className:"footer"},l.a.createElement("span",{className:"text-muted"},"All Rights Reserved 2020 @JavaGuides")))}}]),a}(n.Component),g=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).saveOrUpdateEmployee=function(e){e.preventDefault();var t={firstName:n.state.firstName,lastName:n.state.lastName,emailId:n.state.emailId};console.log("employee => "+JSON.stringify(t)),"_add"===n.state.id?v.createEmployee(t).then((function(e){n.props.history.push("/employees")})):v.updateEmployee(t,n.state.id).then((function(e){n.props.history.push("/employees")}))},n.changeFirstNameHandler=function(e){n.setState({firstName:e.target.value})},n.changeLastNameHandler=function(e){n.setState({lastName:e.target.value})},n.changeEmailHandler=function(e){n.setState({emailId:e.target.value})},n.state={id:n.props.match.params.id,firstName:"",lastName:"",emailId:""},n.changeFirstNameHandler=n.changeFirstNameHandler.bind(Object(u.a)(n)),n.changeLastNameHandler=n.changeLastNameHandler.bind(Object(u.a)(n)),n.saveOrUpdateEmployee=n.saveOrUpdateEmployee.bind(Object(u.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;"_add"!==this.state.id&&v.getEmployeeById(this.state.id).then((function(t){var a=t.data;e.setState({firstName:a.firstName,lastName:a.lastName,emailId:a.emailId})}))}},{key:"cancel",value:function(){this.props.history.push("/employees")}},{key:"getTitle",value:function(){return"_add"===this.state.id?l.a.createElement("h3",{className:"text-center"},"Add Employee"):l.a.createElement("h3",{className:"text-center"},"Update Employee")}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("br",null),l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"card col-md-6 offset-md-3 offset-md-3"},this.getTitle(),l.a.createElement("div",{className:"card-body"},l.a.createElement("form",null,l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null," First Name: "),l.a.createElement("input",{placeholder:"First Name",name:"firstName",className:"form-control",value:this.state.firstName,onChange:this.changeFirstNameHandler})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null," Last Name: "),l.a.createElement("input",{placeholder:"Last Name",name:"lastName",className:"form-control",value:this.state.lastName,onChange:this.changeLastNameHandler})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null," Email Id: "),l.a.createElement("input",{placeholder:"Email Address",name:"emailId",className:"form-control",value:this.state.emailId,onChange:this.changeEmailHandler})),l.a.createElement("button",{className:"btn btn-success",onClick:this.saveOrUpdateEmployee},"Save"),l.a.createElement("button",{className:"btn btn-danger",onClick:this.cancel.bind(this),style:{marginLeft:"10px"}},"Cancel")))))))}}]),a}(n.Component),k=(n.Component,function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={id:n.props.match.params.id,employee:{}},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;v.getEmployeeById(this.state.id).then((function(t){e.setState({employee:t.data})}))}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("br",null),l.a.createElement("div",{className:"card col-md-6 offset-md-3"},l.a.createElement("h3",{className:"text-center"}," View Employee Details"),l.a.createElement("div",{className:"card-body"},l.a.createElement("div",{className:"row"},l.a.createElement("label",null," Employee First Name: "),l.a.createElement("div",null," ",this.state.employee.firstName)),l.a.createElement("div",{className:"row"},l.a.createElement("label",null," Employee Last Name: "),l.a.createElement("div",null," ",this.state.employee.lastName)),l.a.createElement("div",{className:"row"},l.a.createElement("label",null," Employee Email ID: "),l.a.createElement("div",null," ",this.state.employee.emailId)))))}}]),a}(n.Component));var O=function(){return l.a.createElement("div",null,l.a.createElement(c.a,null,l.a.createElement(b,null),l.a.createElement("div",{className:"container"},l.a.createElement(o.c,null,l.a.createElement(o.a,{path:"/",exact:!0,component:f}),l.a.createElement(o.a,{path:"/employees",component:f}),l.a.createElement(o.a,{path:"/add-employee/:id",component:g}),l.a.createElement(o.a,{path:"/view-employee/:id",component:k}))),l.a.createElement(N,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(61);m.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[31,1,2]]]);
//# sourceMappingURL=main.fb2b286a.chunk.js.map