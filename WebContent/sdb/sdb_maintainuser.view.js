sap.ui
		.jsview(
				"sdb.sdb_maintainuser",
				{

					/**2
					 * Specifies the controller belonging to this View. In the
					 * case that it is not implemented, or that "null" is
					 * returned, this View does not have a controller.
					 * 
					 * @memberOf sdb.sdb_maintainuser
					 */
					getcontrollerName : function() {
						return "sdb.sdb_maintainuser";
					},

					/**
					 * Is initially called once after the controller has been
					 * instantiated. It is the place where the UI is
					 * constructed. Since the controller is given to this
					 * method, its event handlers can be attached right away.
					 * 
					 * @memberOf sdb.sdb_maintainuser
					 */
					createContent : function(ocontroller) {

						// Model declarations 

						var oModelEmpName = new sap.ui.model.odata.ODataModel(
								"../Services/employeeName.xsodata/", false);
						oModelEmpName.setSizeLimit(500);
						
						var oModelQ = new sap.ui.model.odata.ODataModel(
								"../Services/empQualifications.xsodata/", false);
						oModelQ.setSizeLimit(500);
						
						var oModelTP = new sap.ui.model.odata.ODataModel(
								"../Services/technology_product.xsodata/", false);
						oModelTP.setSizeLimit(500);
						
						var oModelDS = new sap.ui.model.odata.ODataModel(
								"../Services/developmentskills.xsodata/", false);
						oModelDS.setSizeLimit(500);
							

						//Variable declaration

						var selectedEmployeeName;
						var i = 0;

						// Create a panel instance
						var oPanelUserMaintain = new sap.ui.commons.Panel({
							showCollapseIcon : false,

						});
						oPanelUserMaintain.setTitle(new sap.ui.core.Title({
							text : "Fill in Skill related information below"
						}));

				
						// create a button to save the data entered

						
						var oButtonedit = new sap.ui.commons.Button({
							text : "Edit",
							icon : "sap-icon://edit",
							lite: true,
							press : function() {
								var tempEmpName = oDropdownBoxEmployeeName.getValue();
								
								if( tempEmpName != "" && tempEmpName != "Select Employee" ){
								
									
									oSimpleListBox.destroyItems();
									oSimpleListBoxTP.destroyItems();
									oSimpleListBoxDS.destroyItems();
									
									var oModelQ = new sap.ui.model.odata.ODataModel(
											"../Services/empQualifications.xsodata/", false);
									oModelQ.setSizeLimit(500);
									oSimpleListBox.setModel(oModelQ);
									
									var oModelTP = new sap.ui.model.odata.ODataModel(
											"../Services/technology_product.xsodata/", false);
									oModelTP.setSizeLimit(500);
									oSimpleListBoxTP.setModel(oModelTP);
									
									var oModelDS = new sap.ui.model.odata.ODataModel(
											"../Services/developmentskills.xsodata/", false);
									oModelDS.setSizeLimit(500);
									oSimpleListBoxDS.setModel(oModelDS);	
								
									oSimpleListBox.setVisible(true);
									oSimpleListBox.setEditable(true);
									oSimpleListBoxTP.setVisible(true);
									oSimpleListBoxTP.setEditable(true);
									oSimpleListBoxDS.setVisible(true);
									oSimpleListBoxDS.setEditable(true);
									oButtoncancel.setVisible(true);
									oButtonrefresh.setVisible(true);
									
									oButtonsave.setEnabled(true);
									
									oDropdownBoxEmployeeName.setEditable(false);
									oDropdownBoxTeamName.setEditable(false);
									
									labelSL.setVisible(true);
									
									oQLB.setVisible(true);
									oQLB.setEditable(true);
									oTPLB.setVisible(true);
									oTPLB.setEditable(true);
									oDSLB.setVisible(true);
									oDSLB.setEditable(true);
									
									if (oButtonedit.getEnabled())
									{
										oButtonedit.setEnabled(false);
									}
									
								}
								else
									{
									alert("Please select Employeename and Teamname!");
									
									}
					
							 }
						});	 
						oButtonedit.setEnabled(false);
	
						// create a button to save the data entered

						var oButtonsave = new sap.ui.commons.Button({
							text : "Save",
							icon : "sap-icon://save",
							enabled : false,
							lite: true,
							press : function() {
								
						
																
								//getting the required values from the form  
								
								var empNameGet = oDropdownBoxEmployeeName.getValue().toUpperCase();
								i = 0;
								
								var QualArrayStore = oQLB.getItems();
								var QualArray = [];
								while (i < oQLB.getItems().length)
								{
									
									QualArray.push((QualArrayStore[i].mProperties.text));
									i++;
								};
															
								var QGet = QualArray.toString();
								
								QGet = QGet.replace(/,/g,";");
								
								
								i = 0;
								var TPArrayStore = oTPLB.getItems();
								var TPArray = [];
								while (i < oTPLB.getItems().length)
								{
									
									TPArray.push((TPArrayStore[i].mProperties.text));
									i++;
								};
															
								var TPGet = TPArray.toString();
								
								TPGet = TPGet.replace(/,/g,";");
							
								
								i = 0;
								var DSArrayStore = oDSLB.getItems();
								var DSArray = [];
								while (i < oDSLB.getItems().length)
								{
									
									DSArray.push((DSArrayStore[i].mProperties.text));
									i++;
								};
															
								var DSGet = DSArray.toString();
								
								DSGet = DSGet.replace(/,/g,";");
								
								var oModel = new sap.ui.model.json.JSONModel();//for refreshing the search view 
								
								
								var aUrl = '../Services/addSkillData.xsjs?empName='
									
									+ encodeURIComponent(empNameGet)
									+ '&qualification='
									+ encodeURIComponent(QGet)
									+ '&tech_prod='
									+ encodeURIComponent(TPGet)
									+ '&dev_skill='
									+ encodeURIComponent(DSGet);
						
								
							
								$.ajax({
									
									url : aUrl,
									type : 'POST',
									dataType : 'text',
									
								success: function(myJSON){
									
									//ocontroller.handleSuccess(myJSON);			
									sap.ui.commons.MessageBox.alert("Record was saved for : " + myJSON,
											function() {
											}, "Success ! ");
									oDropdownBoxTeamName.setSelectedKey("Select Team");
									oDropdownBoxEmployeeName.destroyItems();
									
									oQLB.destroyItems();
									oTPLB.destroyItems();
									oDSLB.destroyItems();
									
									
									oDropdownBoxEmployeeName.setEditable(true);
									oDropdownBoxTeamName.setEditable(true);
									
									
									oSimpleListBox.setVisible(false);
									oSimpleListBoxTP.setEditable(false);
									oSimpleListBoxTP.setVisible(false);
									oSimpleListBoxDS.setEditable(false);
									oSimpleListBoxDS.setVisible(false);
									oButtonsave.setEnabled(false);
									oButtoncancel.setVisible(false);
									oButtonedit.setEnabled(false);
									oButtonrefresh.setVisible(false);
									labelSL.setVisible(false);
									
									oQLB.setEditable(false);
									oTPLB.setEditable(false);
									oDSLB.setEditable(false);
									
														
							                       }
						});
								
							 }
						});	 
						
						var oButtoncancel = new sap.ui.commons.Button({
							text : "Cancel",
							icon : "sap-icon://sys-cancel",
							lite: true,
							press : function() {
								
								oDropdownBoxTeamName.setSelectedKey("Select Team");
								oDropdownBoxEmployeeName.destroyItems();
								
								oQLB.destroyItems();
								oTPLB.destroyItems();
								oDSLB.destroyItems();
								
								
								oDropdownBoxEmployeeName.setEditable(true);
								oDropdownBoxTeamName.setEditable(true);
								
								
								oSimpleListBox.setVisible(false);
								oSimpleListBoxTP.setEditable(false);
								oSimpleListBoxTP.setVisible(false);
								oSimpleListBoxDS.setEditable(false);
								oSimpleListBoxDS.setVisible(false);
								oButtonsave.setEnabled(false);
								oButtoncancel.setVisible(false);
								oButtonrefresh.setVisible(false);
								oButtonedit.setEnabled(false);
								labelSL.setVisible(false);
								
								oQLB.setEditable(false);
								oTPLB.setEditable(false);
								oDSLB.setEditable(false);
					   
							}
								
					
							 
						});	
						
						oButtoncancel.setVisible(false);
						
						
						var oButtonrefresh = new sap.ui.commons.Button({
							text : "refresh",
							icon : "sap-icon://refresh",
							lite: true,
							press : function() {

									
									oTPLB.destroyItems();
									oDSLB.destroyItems();
									oQLB.destroyItems();
													
								
								selectedEmployeeName = oDropdownBoxEmployeeName
								.getValue().toUpperCase();
								
						//service URL
						
						var aUrl = '../Services/populateMU.xsjs?employeename='
								+ escape(selectedEmployeeName);
							
						jQuery
								.ajax({
									url : aUrl,
									method : 'GET',
									dataType : 'json',
									success : function(myJSON) {
										

										tpMaintain = "";
										tpMaintain = myJSON[0].technology_product;
										
										tpMaintainArray = [];
										
										tpMaintainArray = tpMaintain.split(";");
									
										i = 0;
										while (i < tpMaintainArray.length) {
										 
											
											oTPLB.addItem(new sap.ui.core.ListItem({text:tpMaintainArray[i]}));	
											
										    i++;
										}
										
										dsMaintain = "";
										dsMaintain = myJSON[0].development_skills;
										
										dsMaintainArray = [];
										
										dsMaintainArray = dsMaintain.split(";");
									
										i = 0;
										while (i < dsMaintainArray.length) {
										 
											
											oDSLB.addItem(new sap.ui.core.ListItem({text:dsMaintainArray[i]}));	
											
										    i++;
										}
										
										qualMaintain = "";
										qualMaintain = myJSON[0].qualification;
										
										qualMaintainArray = [];
										
										qualMaintainArray = qualMaintain.split(";");
									
										i = 0;
										while (i < qualMaintainArray.length) {
										 
											
											oQLB.addItem(new sap.ui.core.ListItem({text:qualMaintainArray[i]}));	
											
										    i++;
										}
										
										
										
										
										
									}
								});

						oModelQ.refresh();
						oModelTP.refresh();
						oModelDS.refresh();
						
						oSimpleListBox.setModel(oModelQ);
						oSimpleListBoxTP.setModel(oModelTP);
						oSimpleListBoxDS.setModel(oModelDS);
								}
							});
						oButtonrefresh.setVisible(false);
						
						//Create the matrix layout for the main screen 

						var oContent = new sap.ui.commons.layout.MatrixLayout({
							widths : [ "150px", "400px" ]
						});

						var oCell = new sap.ui.commons.layout.MatrixLayoutCell(
								{
									hAlign : sap.ui.commons.layout.HAlign.Left
								});
						oCell.addContent(new sap.ui.commons.Label({
							text : "Team Name:"
						}));

						//Template declaration for the dropdownbox binding 

						var oItemTemplateEmployeeNAme = new sap.ui.core.ListItem();
						oItemTemplateEmployeeNAme.bindProperty("text",
								"EMPLOYEENAME");
						oItemTemplateEmployeeNAme.bindProperty("enabled",
								"enabled");


						
						// TeamDropdownBoxdeclaration
						var oDropdownBoxTeamName = new sap.ui.commons.DropdownBox(
								"oDropdownBoxTeamName",
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
														
														oDropdownBoxEmployeeName.destroyItems();
														oDropdownBoxEmployeeName.addItem(new sap.ui.core.ListItem({
															text : "Select Employee",
															key : "Select Employee"
														}));
														
														var i = 1;
														var cnt = myJSON[0].count;	
												 		while(i<=cnt){
												 			
												 			oDropdownBoxEmployeeName.addItem(new sap.ui.core.ListItem({
																text : myJSON[i].en,
																key : myJSON[i].en
															}))
												 	   	   
												 		   i++;
												 		   
												 		}	
												 			
												 		oDropdownBoxEmployeeName.setSelectedKey("Select Employee");
												     
													}
												});
																				
										}
										else{
											
											oDropdownBoxEmployeeName.destroyItems();
										}
										
										
									
									}
									
								});
						
						oDropdownBoxTeamName.setSelectedKey(" Select Team");			
						
				//get the team names
						
						var aUrl = '../Services/fetchTeamnames.xsjs'
							
						jQuery
							.ajax({
								url : aUrl,
								method : 'GET',
								dataType : 'json',
								success : function(myJSON) {
									
									oDropdownBoxTeamName.addItem(new sap.ui.core.ListItem({
										text : "  Select Team",
										key : "Select Team"
									}));
									
									var i = 1;
									var cnt = myJSON[0].count;	
							 		while(i<=cnt){
							 			
							 			oDropdownBoxTeamName.addItem(new sap.ui.core.ListItem({
											text : myJSON[i].tn,
											key : myJSON[i].tn
										}))
							 	   	   
							 		   i++;
							 		   
							 		}	
							 			
							 		oDropdownBoxTeamName.setSelectedKey("Select Team");
							     
								}
							});
						
						oContent.createRow(oCell, oDropdownBoxTeamName);

						
						
						oCell = new sap.ui.commons.layout.MatrixLayoutCell({
							hAlign : sap.ui.commons.layout.HAlign.Left
						});
						oCell.addContent(new sap.ui.commons.TextView({
							text : "Employee Name:"
						}));

						//variable declaration 
						var tpMaintain;
						var dsMaintain;
						var qualMaintain;
						var qualMaintainArray ;
						
						var temp = [ "" ];//used for adding some text before the qualifications in the add skills facet
						
						var oTextQualification = new sap.ui.commons.TextArea("textAreaQ",{
						
							height : "150px",
							width : "300px",
							editable : false
						
							
							
						});
						
							
						
				    	var oQLB = new sap.ui.commons.ListBox({
														
							height : "150px",
							width : "300px" ,
							select : function(e) {
								
							
								
								jQuery.each(oQLB.getSelectedItems(),
										function(idx, item) {
							
								
										// open a confirmation 
									sap.ui.commons.MessageBox.confirm("Do you want to remove the entry ?", fnCallbackConfirm, "deleteRecordPopup");
									
									function fnCallbackConfirm(bResult) {
										if(bResult)
											{
											oQLB.removeItem(item);
											
											
											
											}
									}

									
																	
												
								});
							},
							
							allowMultiSelect : false,
							visibleItems : 10,
							editable : false
						});
				    	

				    	var oTPLB = new sap.ui.commons.ListBox({
							
							height : "150px",
							width : "300px" ,
							select : function(e) {
								
							
								jQuery.each(oTPLB.getSelectedItems(),
										function(idx, item) {
							
									// open a confirmation 
									sap.ui.commons.MessageBox.confirm("Do you want to remove the entry ?", fnCallbackConfirm, "deleteRecordPopup");
									
									function fnCallbackConfirm(bResult) {
										if(bResult)
											{
									oTPLB.removeItem(item);
									
											}
									}
								});
								
										
							
												
							},
							
							allowMultiSelect : false,
							visibleItems : 10,
							editable : false
						});
				    	
				    	var oDSLB = new sap.ui.commons.ListBox({
							
							height : "150px",
							width : "300px" ,
							select : function(e) {
								
							
								jQuery.each(oDSLB.getSelectedItems(),
										function(idx, item) {
									// open a confirmation 
									sap.ui.commons.MessageBox.confirm("Do you want to remove the entry ?", fnCallbackConfirm, "deleteRecordPopup");
									
									function fnCallbackConfirm(bResult) {
										if(bResult)
											{
									oDSLB.removeItem(item);
									
									
											}
									}
								});
								
										
							
												
							},
							
							allowMultiSelect : false,
							visibleItems : 10,
							editable : false
						});


						
						//Employeename Dropdownbox declaration

						var oDropdownBoxEmployeeName = new sap.ui.commons.DropdownBox(
								"oDropdownBoxEmployeeName",
								{
									tooltip : "Employee name",

									change : function(oEvent) {

										selectedEmployeeName = oDropdownBoxEmployeeName
												.getValue().toUpperCase();

										
										
										//service URL
										
										var aUrl = '../Services/populateMU.xsjs?employeename='
												+ escape(selectedEmployeeName);
											
										jQuery
												.ajax({
													url : aUrl,
													method : 'GET',
													dataType : 'json',
													success : function(myJSON) {
														

														tpMaintain = "";
														tpMaintain = myJSON[0].technology_product;
														
														tpMaintainArray = [];
														oTPLB.destroyItems();
														tpMaintainArray = tpMaintain.split(";");
													
														i = 0;
														while (i < tpMaintainArray.length) {
														 
															
															oTPLB.addItem(new sap.ui.core.ListItem({text:tpMaintainArray[i]}));	
															
														    i++;
														}
														
														dsMaintain = "";
														dsMaintain = myJSON[0].development_skills;
														
														dsMaintainArray = [];
														oDSLB.destroyItems();
														dsMaintainArray = dsMaintain.split(";");
													
														i = 0;
														while (i < dsMaintainArray.length) {
														 
															
															oDSLB.addItem(new sap.ui.core.ListItem({text:dsMaintainArray[i]}));	
															
														    i++;
														}
														
														qualMaintain = "";
														qualMaintain = myJSON[0].qualification;
														
														qualMaintainArray = [];
														oQLB.destroyItems();
														qualMaintainArray = qualMaintain.split(";");
													
														i = 0;
														while (i < qualMaintainArray.length) {
														 
															
															oQLB.addItem(new sap.ui.core.ListItem({text:qualMaintainArray[i]}));	
															
														    i++;
														}
														
														
														
														oButtonedit.setEnabled(true);
														
													}
												});

									}
								});

						//setting the model 
						oDropdownBoxEmployeeName.setModel(oModelEmpName);

						selectedEmployeeName = oDropdownBoxEmployeeName
								.getValue();

						oContent.createRow(oCell, oDropdownBoxEmployeeName);

						var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell(
								{
									hAlign : sap.ui.commons.layout.HAlign.Left
								});
						oCell1.addContent(new sap.ui.commons.TextView({
							text : "Qualifictions:"
						}));

						//Template for the qualification binding

						var oItemTemplateQualification = new sap.ui.core.Item();
						oItemTemplateQualification.bindProperty("text", "name");
						oItemTemplateQualification.bindProperty("enabled",
							"enabled");
						
						var oSorter = new sap.ui.model.Sorter("name", false);		

				    	var oSimpleListBox = new sap.ui.commons.ListBox({
							items : {
								path : "/employeeQualifications",
								template : oItemTemplateQualification,
								sorter:oSorter
							},
							
							height : "150px",
							width : "300px" ,
							select : function(e) {
									
						
								//oQLB.addItem(oSimpleListBox.getSelectedItem());
													
								oQLB.addItem(new sap.ui.core.ListItem({
									text : oSimpleListBox.getSelectedItem().mProperties.text,
									key : oSimpleListBox.getSelectedItem().mProperties.text
								}))
								
							},
							
							allowMultiSelect : false,
							visibleItems : 10,
							editable : false
						});

				    	oSimpleListBox.setModel(oModelQ);
						

//List box for TP 

						var oItemTemplateTP = new sap.ui.core.Item();
						oItemTemplateTP.bindProperty("text", "technology_product");
						oItemTemplateTP.bindProperty("enabled",
								"enabled");
						
						var oSimpleListBoxTP = new sap.ui.commons.ListBox({
							items : {
								path : "/technologyProduct",
								template : oItemTemplateTP
							},
							 sorter: new sap.ui.model.Sorter("technology_product"), // <---  
							height : "150px",
							width : "300px" ,
							select : function(e) {
								
								//oTPLB.addItem(oSimpleListBoxTP.getSelectedItem());	
								oTPLB.addItem(new sap.ui.core.ListItem({
									text : oSimpleListBoxTP.getSelectedItem().mProperties.text,
									key : oSimpleListBoxTP.getSelectedItem().mProperties.text
								}))
								
								
							},
							
							allowMultiSelect : false,
							visibleItems : 10,
							editable : false
						});

						oSimpleListBoxTP.setModel(oModelTP);
										
						
//List End						
						
						
						
//List box for development skills 
						
						var oItemTemplateDS = new sap.ui.core.Item();
						oItemTemplateDS.bindProperty("text", "development_skill");
						oItemTemplateDS.bindProperty("enabled",
								"enabled");
						
						var oSimpleListBoxDS = new sap.ui.commons.ListBox({
							items : {
								path : "/developmentSkills",
								template : oItemTemplateDS
							},
							height : "150px",
							width : "300px" ,
							select : function(e) {
								
								//oDSLB.addItem(oSimpleListBoxDS.getSelectedItem());	
								oDSLB.addItem(new sap.ui.core.ListItem({
									text : oSimpleListBoxDS.getSelectedItem().mProperties.text,
									key : oSimpleListBoxDS.getSelectedItem().mProperties.text
								}))
								
							},
							
							allowMultiSelect : false,
							visibleItems : 10,
							editable : false
						});

						oSimpleListBoxDS.setModel(oModelDS);

//List End						

						var oImage1 = new sap.ui.commons.Image("left1");
						oImage1.setSrc("images/left.jpg");
						oImage1.setTooltip("Hold CTRL to select multiple items from the list !");
						oImage1.setHeight("10px");
						oImage1.setWidth("10px");
						
						
						
						oImage1.setVisible(false);
						oSimpleListBox.setVisible(false);
							
						var oCell2 = new sap.ui.commons.layout.MatrixLayoutCell(
								{
									hAlign : sap.ui.commons.layout.HAlign.Left
								});
						oCell2.addContent(new sap.ui.commons.TextView({
							text : "Technology/Product:"
						}));
						
						var textAreaTP = new sap.ui.commons.TextArea("textAreaTP",{
						
							height : "150px",
							width : "300px",
							editable : false
						
							
							
						});

					
						var oImage2 = new sap.ui.commons.Image("left2");
						oImage2.setSrc("images/left.jpg");
						oImage2.setTooltip("Hold CTRL  to select multiple items from the list !");

						
						
						oSimpleListBoxTP.setVisible(false);
						oImage2.setVisible(false);

						var oCell3 = new sap.ui.commons.layout.MatrixLayoutCell(
								{
									hAlign : sap.ui.commons.layout.HAlign.Left
								});
						oCell3.addContent(new sap.ui.commons.TextView({
							text : "Development Skills:"
						}));
						var textAreaDS = new sap.ui.commons.TextArea("textAreaDS" , {
						
							height : "150px",
							width : "300px" ,
							editable : false
								
							
						});
						
						var oImage3 = new sap.ui.commons.Image("left3");
						oImage3.setSrc("images/left.jpg");
						oImage3.setTooltip("Hold CTRL to select multiple items from the list !");

						
						oSimpleListBoxDS.setVisible(false);
						oImage3.setVisible(false);
						
						oPanelUserMaintain.addButton(oButtonedit);
						oPanelUserMaintain.addButton(oButtonsave);
						oPanelUserMaintain.addButton(oButtoncancel);
						oPanelUserMaintain.addButton(oButtonrefresh);
						

						var oContent2 = new sap.ui.commons.layout.MatrixLayout({
							
						});
						
						var labelES = new sap.ui.commons.Label({
							text : "Existing Skills"
						});
						
						var labelSL = new sap.ui.commons.Label({
							text : "Choose skills from below list"
						});
						
						labelSL.setVisible(false);
												
					
						
						oContent2.createRow(labelSL);
						oContent2.createRow(oSimpleListBox,oSimpleListBoxTP,oSimpleListBoxDS);
						oContent2.createRow(labelES);
						oContent2.createRow(oCell1,oCell2,oCell3);
						oContent2.createRow(oQLB,oTPLB,oDSLB);
						
						
						var oDivider1 = new sap.ui.commons.HorizontalDivider("divider1");
						
						
						oPanelUserMaintain.addContent(oContent);
						oPanelUserMaintain.addContent(oDivider1);
						
						oPanelUserMaintain.addContent(oContent2);
						
					

						return oPanelUserMaintain;

					}
				});
