sap.ui.jsview("sdb.sdb_massMaintainuser", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf sdb.sdb_massMaintainuser
	*/ 
	getControllerName : function() {
		return "sdb.sdb_massMaintainuser";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf sdb.sdb_massMaintainuser
	*/ 
	createContent : function(oController) 
	
	{
		// Model declarations 

		var oModelMEmpName = new sap.ui.model.odata.ODataModel(
				"../Services/employeeName.xsodata/", false);
		oModelMEmpName.setSizeLimit(500);
		
		var oModelMQ = new sap.ui.model.odata.ODataModel(
				"../Services/empQualifications.xsodata/", false);
		oModelMQ.setSizeLimit(500);
		
		var oModelMTP = new sap.ui.model.odata.ODataModel(
				"../Services/technology_product.xsodata/", false);
		oModelMTP.setSizeLimit(500);
		
		var oModelMDS = new sap.ui.model.odata.ODataModel(
				"../Services/developmentskills.xsodata/", false);
		oModelMDS.setSizeLimit(500);
		
		//Create a panel instance
		var oPanel = new sap.ui.commons.Panel();

		//Set the title of the panel
		oPanel.setTitle(new sap.ui.core.Title({text: "Mass Skill update"}));
		
		// TeamDropdownBoxdeclaration
		var oDropdownBoxTeamNameM = new sap.ui.commons.DropdownBox(
				"oDropdownBoxTeamNameM",
				{
					tooltip : "TeamName",
					

					// binding the change and applying filter
					change : function(oEvent) {

						
						var sampleVariable = oEvent.oSource
								.getSelectedKey();
					
						
						if(sampleVariable != "Select Team"){
				
							//get the employee names
							
							var aUrl = '../Services/fetchEmpname.xsjs'
								
								var aUrl = '../Services/fetchEmpname.xsjs?teamName='
									+ escape(sampleVariable.trim());
								
							jQuery
								.ajax({
									url : aUrl,
									method : 'GET',
									dataType : 'json',
									success : function(myJSON) {
										
										oEmployeeListBox.destroyItems();
																				
										var i = 1;
										var cnt = myJSON[0].count;	
								 		while(i<=cnt){
								 			
								 			oEmployeeListBox.addItem(new sap.ui.core.ListItem({
												text : myJSON[i].en,
												key : myJSON[i].en
											}))
								 	   	   
								 		   i++;
								 		   
								 		}	
								 			
								     
									}
								});
																
						}
						else{
							
							oEmployeeListBox.destroyItems();
						}
						
						
					
					}
					
				});
		
		oDropdownBoxTeamNameM.setSelectedKey(" Select Team");
		//get the team names
		
		var aUrl = '../Services/fetchTeamnames.xsjs'
			
		jQuery
			.ajax({
				url : aUrl,
				method : 'GET',
				dataType : 'json',
				success : function(myJSON) {
					
					oDropdownBoxTeamNameM.addItem(new sap.ui.core.ListItem({
						text : "  Select Team",
						key : "Select Team"
					}));
					
					var i = 1;
					var cnt = myJSON[0].count;	
			 		while(i<=cnt){
			 			
			 			oDropdownBoxTeamNameM.addItem(new sap.ui.core.ListItem({
							text : myJSON[i].tn,
							key : myJSON[i].tn
						}))
			 	   	   
			 		   i++;
			 		   
			 		}	
			 			
			 		oDropdownBoxTeamNameM.setSelectedKey("Select Team");
			     
				}
			});
		
		
	var EmployeeNames = [];
		
		//Empployee Multiselection
		
		var oEmployeeListBox = new sap.ui.commons.ListBox({
		  height : "200px",
		  width: "300px",
		  select : function(e) {
			  EmployeeNames = [];
			  var a = [];
			  jQuery.each(oEmployeeListBox.getSelectedItems(), function(idx,item) { a.push(item.getText().toUpperCase());});
			  oTextSummary.setText(a);
			  EmployeeNames = a;
		
			  if (a.length > 0 ){
				  
				  oButtonUpdate.setEnabled(true);
				  oButtonMcancel.setEnabled(true);
				  oSimpleListBoxMDS.setEditable(true);
				  oSimpleListBoxMTP.setEditable(true);
				  oSimpleListBoxM.setEditable(true);
			  
			  };
		  },
		  allowMultiSelect : true
		});
		
		

		var oTextSummary = new sap.ui.commons.TextView(
				{width: "300px"
					
				}
				);

		oEmployeeListBox.addItem(new sap.ui.core.ListItem({
			text : "No team selected",
			key : "No team selected"
		}));
		
		
//Template for the qualification binding

		var oItemTemplateQualification = new sap.ui.core.Item();
		oItemTemplateQualification.bindProperty("text", "name");
		oItemTemplateQualification.bindProperty("enabled",
			"enabled");
		
		var oSorter = new sap.ui.model.Sorter("name", false);		

    	var oSimpleListBoxM = new sap.ui.commons.ListBox({
			items : {
				path : "/employeeQualifications",
				template : oItemTemplateQualification,
				sorter:oSorter
			},
			
			height : "150px",
			width : "300px" ,
			select : function(e) {
				 var b = [];
				  jQuery.each(oSimpleListBoxM.getSelectedItems(), function(idx,item) { b.push(item.getText());});
		
			},
			
			allowMultiSelect : true,
			visibleItems : 10,
			editable : true
		});

    	oSimpleListBoxM.setModel(oModelMQ);
		

//List box for TP 

		var oItemTemplateTP = new sap.ui.core.Item();
		oItemTemplateTP.bindProperty("text", "technology_product");
		oItemTemplateTP.bindProperty("enabled",
				"enabled");
		
		var oSimpleListBoxMTP = new sap.ui.commons.ListBox({
			items : {
				path : "/technologyProduct",
				template : oItemTemplateTP
			},
			 sorter: new sap.ui.model.Sorter("technology_product"), // <---  
			height : "150px",
			width : "300px" ,
			select : function(e) {
				 var c = [];
				  jQuery.each(oSimpleListBoxMTP.getSelectedItems(), function(idx,item) { c.push(item.getText());});
				 
				},
			
			allowMultiSelect : true,
			visibleItems : 10,
			editable : true
		});

		oSimpleListBoxMTP.setModel(oModelMTP);
						
		
//List End						
		
		
		
//List box for development skills 
		
		var oItemTemplateDS = new sap.ui.core.Item();
		oItemTemplateDS.bindProperty("text", "development_skill");
		oItemTemplateDS.bindProperty("enabled",
				"enabled");
		
		var oSimpleListBoxMDS = new sap.ui.commons.ListBox({
			items : {
				path : "/developmentSkills",
				template : oItemTemplateDS
			},
			height : "150px",
			width : "300px" ,
			select : function(e) {
				 var d = [];
				  jQuery.each(oSimpleListBoxMDS.getSelectedItems(), function(idx,item) { d.push(item.getText());});
				
				
				},
			
			allowMultiSelect : true,
			visibleItems : 10,
			editable : true
		});

		oSimpleListBoxMDS.setModel(oModelMDS);

//List End		

		var tpMaintainM;
		var dsMaintainM;
		var qualMaintainM;
		
		  oSimpleListBoxMDS.setEditable(false);
		  oSimpleListBoxMTP.setEditable(false);
		  oSimpleListBoxM.setEditable(false);
		
		var oButtonUpdate = new sap.ui.commons.Button({
			text : "Save",
			icon : "sap-icon://save",
			enabled : false,
			lite: true,
			press : function() {
				
		
												
				//getting the required values from the form  
				
			
				
				
				
				
				i = 0;
				var QualArrayStoreM = oSimpleListBoxM.getSelectedItems();
				var QualArrayM = [];
				while (i < oSimpleListBoxM.getSelectedItems().length)
				{
					
					QualArrayM.push((QualArrayStoreM[i].mProperties.text));
					i++;
				};
											
				var QGetM = QualArrayM.toString();
				
				QGetM = QGetM.replace(/,/g,";");
				
				
				i = 0;
				var TPArrayStoreM = oSimpleListBoxMTP.getSelectedItems();
				var TPArrayM = [];
				while (i < oSimpleListBoxMTP.getSelectedItems().length)
				{
					
					TPArrayM.push((TPArrayStoreM[i].mProperties.text));
					i++;
				};
											
				var TPGetM = TPArrayM.toString();
				
				TPGetM = TPGetM.replace(/,/g,";");
		
				
				i = 0;
				var DSArrayStoreM = oSimpleListBoxMDS.getSelectedItems();
				var DSArrayM = [];
				while (i < oSimpleListBoxMDS.getSelectedItems().length)
				{
					
					DSArrayM.push((DSArrayStoreM[i].mProperties.text));
					i++;
				};
											
				var DSGetM = DSArrayM.toString();
				
				DSGetM = DSGetM.replace(/,/g,";");
				
				
				i=0;
				
				while(i < EmployeeNames.length){
	
					var empNameGetM = EmployeeNames[i];
					
					//***************************************
					
					
					var aUrl = '../Services/populateMU.xsjs?employeename='
						+ escape(empNameGetM);
					
				jQuery
						.ajax({
							url : aUrl,
							method : 'GET',
							dataType : 'json',
							success : function(myJSON) {
								

								tpMaintainM = "";
								tpMaintainM = myJSON[0].technology_product;
								
								tpMaintainArray = [];
								
								tpMaintainArray = tpMaintainM.split(";");
							
									TPGetM = TPGetM.concat(",",tpMaintainArray);	
									
									console.log(TPGetM);
						
								dsMaintainM = "";
								dsMaintainM = myJSON[0].development_skills;
								
								dsMaintainArray = [];
								
								dsMaintainArray = dsMaintainM.split(";");
							
								DSGetM = DSGetM.concat(",",dsMaintainArray);
								
								console.log(DSGetM);
								
								qualMaintainM = "";
								qualMaintainM = myJSON[0].qualification;
								
								qualMaintainArray = [];
								
								qualMaintainArray = qualMaintainM.split(";");
							
								
								
								QGetM = QGetM.concat(",",qualMaintainArray);
								
								console.log(QGetM);

								DSGetM = DSGetM.replace(/,/g,";");
								TPGetM = TPGetM.replace(/,/g,";");
								QGetM = QGetM.replace(/,/g,";");
						
				var aUrl = '../Services/addSkillData.xsjs?empName='
					
					+ encodeURIComponent(empNameGetM)
					+ '&qualification='
					+ encodeURIComponent(QGetM)
					+ '&tech_prod='
					+ encodeURIComponent(TPGetM)
					+ '&dev_skill='
					+ encodeURIComponent(DSGetM);
			
				$.ajax({
					
					url : aUrl,
					type : 'POST',
					dataType : 'text',
					
				    success: function(myJSON){
				
					
			                             }
						});
				
				
							}
						});
				i++;
				
				};	
				
				EmployeeNames =[];
				oSimpleListBoxMDS.clearSelection();
				oSimpleListBoxMTP.clearSelection();
				oSimpleListBoxM.clearSelection();
				oEmployeeListBox.destroyItems();
									
				oEmployeeListBox.addItem(new sap.ui.core.ListItem({
					text : "No team selected",
					key : "No team selected"
				}));
				oDropdownBoxTeamNameM.setSelectedKey("Select Team");
				oButtonUpdate.setEnabled(false);
				oButtonMcancel.setEnabled(false);
				
				oSimpleListBoxMDS.setEditable(false);
				oSimpleListBoxMTP.setEditable(false);
				oSimpleListBoxM.setEditable(false);
				
			 }
		});	 
				
		var oButtonMcancel = new sap.ui.commons.Button({
			text : "Cancel",
			icon : "sap-icon://sys-cancel",
			lite: true,
			press : function() {
				
								
				EmployeeNames =[];
				
				oSimpleListBoxMDS.clearSelection();
				oSimpleListBoxMTP.clearSelection();
				oSimpleListBoxM.clearSelection();
				oEmployeeListBox.destroyItems();
				oTextSummary.setText("");
				
				oEmployeeListBox.addItem(new sap.ui.core.ListItem({
					text : "No team selected",
					key : "No team selected"
				}));
				oDropdownBoxTeamNameM.setSelectedKey("Select Team");
				oButtonUpdate.setEnabled(false);
				
				  oSimpleListBoxMDS.setEditable(false);
				  oSimpleListBoxMTP.setEditable(false);
				  oSimpleListBoxM.setEditable(false);
				  
			}
			 
		});	
		
//***************************************************************************************//		
		//Layout
		
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			id : "matrix1",
			layoutFixed : false
			});
		
		oLayout.createRow(oDropdownBoxTeamNameM);
		oLayout.createRow(oEmployeeListBox,oSimpleListBoxM,oSimpleListBoxMTP,oSimpleListBoxMDS);
		oLayout.createRow(oTextSummary);
		oLayout.createRow();
		
		//add content to the panel 
		oPanel.addButton(oButtonUpdate);
		oPanel.addButton(oButtonMcancel);
		oPanel.addContent(oLayout);
			return oPanel;
		
	}
	
	

});
