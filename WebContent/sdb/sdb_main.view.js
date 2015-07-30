sap.ui.jsview("sdb.sdb_main", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sdb.sdb_main
	*/ 
	getControllerName : function() {
		return "sdb.sdb_main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sdb.sdb_main
	*/ 
	createContent : function(oController) {
		
		
// declaring  the various views in the main view
		
			var oSearchView = sap.ui.view({id:this.createId("search_view"), viewName:"sdb.sdb_new_search", type:sap.ui.core.mvc.ViewType.JS});
			var oUserMaintainView = sap.ui.view({id:this.createId("usermaintain_view"), viewName:"sdb.sdb_maintainuser", type:sap.ui.core.mvc.ViewType.JS});
			var oMassUserMaintainView = sap.ui.view({id:this.createId("massUsermaintain_view"), viewName:"sdb.sdb_massMaintainuser", type:sap.ui.core.mvc.ViewType.JS});
	
	
		
// shell creation to create the container for the different views 
		
		var oShell = new sap.ui.ux3.Shell("sdbShell", {
			appTitle: "Skill Database",
			appIcon: "images/SAPLogo.png",
			appIconTooltip: "SAP logo",
			showLogoutButton: false,
			showSearchTool: false,
			showInspectorTool: false,
			showFeederTool: false,
			paneWidth : 100,
			applyContentPadding : true,
			
			content:oSearchView,
			
				 worksetItems: [new sap.ui.ux3.NavigationItem("WI_search",{key:"wi_search",text:"Search Skill"}),
			               new sap.ui.ux3.NavigationItem("WI_maintain",{key:"wi_maintain",text:"Add Skill"}),
			               new sap.ui.ux3.NavigationItem("WI_massMaintain",{key:"wi_massMaintain",text:"Mass Add Skill"})
			               ],
											
			    worksetItemSelected: function(oEvent){
				var sId = oEvent.getParameter("id");
				var oShell = oEvent.oSource;
				switch (sId) {
				case "WI_search":
					oShell.setContent(oSearchView);
					break;
				case "WI_maintain":
					oShell.setContent(oUserMaintainView);
					break;
				case "WI_massMaintain":
					oShell.setContent(oMassUserMaintainView);
					break;
				default:
					break;
				}
			},
			
			headerItems: [new sap.ui.commons.TextView({text:"User",tooltip:"U.Name"}),
			              new sap.ui.commons.Button({text:"Personalize",tooltip:"Personalize",press:function(oEvent){alert("Here could open an personalize dialog");}}),
						  new sap.ui.commons.MenuButton({
							  text: "Help",
							  tooltip: "Help Menu",
							  menu: new sap.ui.commons.Menu("menu1",{items:[
								  new sap.ui.commons.MenuItem("menuitem1",{text:"Help"}),
								  new sap.ui.commons.MenuItem("menuitem2",{text:"Report Incident"}),
								  new sap.ui.commons.MenuItem("menuitem3",{text:"About"})]})
										})],
				
			
		});
		oShell.setContent(oSearchView);
		return oShell;

		
	}
	
	


});
