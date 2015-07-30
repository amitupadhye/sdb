sap.ui.jsview("sdb.sdb_new_search", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf sdb.sdb_new_search
	 */
	getControllerName : function() {
		return "sdb.sdb_new_search";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf sdb.sdb_new_search
	 */
	createContent : function(oController) {
		
		//variable declaration 
		var tpMaintain;
		var dsMaintain;
		var qualMaintain;
		var qualMaintainArray ;
		
		var employeeID;
		var searchCount;
		var Status = "" ;
		var SearchColumn = "SS";

		// Preparing the model for table control
		/*var oModel = new sap.ui.model.odata.ODataModel(
				"../Services/empDetails.xsodata/", false);*/
		
		var oModel = new sap.ui.model.json.JSONModel();

		var oModelempOverview = new sap.ui.model.odata.ODataModel(
				"../Services/empOverview.xsodata/", false);

		var ossModelQ = new sap.ui.model.odata.ODataModel(
				"../Services/empQualifications.xsodata/", false);
		ossModelQ.setSizeLimit(500);
		
		var ossModelTP = new sap.ui.model.odata.ODataModel(
				"../Services/technology_product.xsodata/", false);
		ossModelTP.setSizeLimit(500);
		
		var ossModelDS = new sap.ui.model.odata.ODataModel(
				"../Services/developmentskills.xsodata/", false);
		ossModelDS.setSizeLimit(500);
		
		//Opanel Matrix layout
		
		var oLayoutPanel =  new sap.ui.commons.layout.MatrixLayout({
			id : this.createId("matrix_panel"),
			layoutFixed : false,
			width : "80%"
		});
		
		var oLayoutPanelSO =  new sap.ui.commons.layout.MatrixLayout({
			id : this.createId("matrix_panelSO"),
			layoutFixed : false,
			width : "80%"
		});
		var oLayoutPanelShl1 =  new sap.ui.layout.HorizontalLayout({
			id : this.createId("matrix_panelShl1"),
			layoutFixed : false,
			width : "80%"
		});
		var oLayoutPanelShl2 =  new sap.ui.layout.HorizontalLayout({
			id : this.createId("matrix_panelShl2"),
			layoutFixed : false,
			width : "80%"
		});
		

		//Creating a label for the search
		var oLabel = new sap.ui.commons.Label(this.createId("title"));
		oLabel.setText("Search");
		oLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
		oLabel.setWidth("120px");
		oLabel.setLabelFor(oSearch);

		//create a simple SearchField with suggestion list (list expander hidden)
		var oSearch = new sap.ui.commons.SearchField("filterBy", {
			enableListSuggest : true,
			showListExpander : false,
			maxHistoryItems : 0,
			enableFilterMode : true,
			startSuggestion : 0,
			maxSuggestionItems : 5,
			enableClear : true,
			width : "400px",
			search : function(oEvent) {

				oController.setFilter(oEvent.getParameter("query"));
				//Begin of new search implementation 
				
				
				var aUrl = '../Services/Search.xsjs?query='
						+ encodeURIComponent(oEvent.getParameter("query"))
						+ '&column='
						+ encodeURIComponent(SearchColumn);
					
					jQuery.ajax({
							url : aUrl,
							method : 'GET',
							dataType : 'json',
							success : function(myJSON) {
								
								var aData = myJSON;
								
								oModel.setData({modelData: aData});
								
								this.byId("TF-Name").setModel(oModel);
								oTable.bindRows("/modelData");
								console.log(myJSON);
								searchCount = myJSON.length;
								
								oCountTextView.setText("Found:"+(searchCount - 1));
							}
						});
				
				//End of new search implementation 
				
				//searchCount = oTable._getRowCount();
				
			},
			suggest : function(oEvent) {
				var Selection = oLabel.getText();
				
				var aUrl = '../Services/Search.xsjs?query='
				+ encodeURIComponent(oEvent.getParameter("value"))
				+ '&column='
				+ encodeURIComponent(SearchColumn);
				
				jQuery.ajax({
						url : aUrl,
						method : 'GET',
						dataType : 'json',
						success : function(myJSON) {
							
							var aData = myJSON;
							
							oModel.setData({modelData: aData});
							
							oTable.setModel(oModel);
							oTable.bindRows("/modelData");
							console.log(myJSON);
							searchCount = myJSON.length;
							
							//setting the count to found
							oCountTextView.setText("Found:"+(searchCount - 1));
						}
					});
				
				/*oController.setFilter(oEvent.getParameter("value"), Selection);
				searchCount = oTable._getRowCount();
				oCountTextView.setText("Found: " + searchCount);*/

			}
		});
		
		//adding segmented buttons 
		//testing the activation 

		
		
		
		var oRBG1 = new sap.ui.commons.RadioButtonGroup({
			columns : 3,
			tooltip : "This is a test tooltip for the first RadioButtonGroup",
			lite: true,
			select : function() { 
				SearchColumn = oRBG1.getSelectedItem().getKey();
				oSearch.setValue("");
var aUrl = '../Services/Search.xsjs?query='
					
					+ encodeURIComponent("*");
				
				jQuery.ajax({
						url : aUrl,
						method : 'GET',
						dataType : 'json',
						success : function(myJSON) {
							
							var aData = myJSON;
							
							oModel.setData({modelData: aData});
							
							oTable.setModel(oModel);
							oTable.bindRows("/modelData");
							
							searchCount = myJSON.length;
							
							oCountTextView.setText("Found:"+(searchCount - 1));
						}
					});
				
			} 
			});
		var oItem = new sap.ui.core.Item({
			text : "Technology product", 
			tooltip : "Tooltip 1",
			key : "TP"});
		oRBG1.addItem(oItem);

		oItem = new sap.ui.core.Item({
			text : "Development Skill ", 
			tooltip : "Tooltip 3",
			key : "DS"});
		oRBG1.addItem(oItem);
		
		oItem = new sap.ui.core.Item({
			text : "Qualification", 
			tooltip : "Tooltip 2",
			key : "Q"});
		oRBG1.addItem(oItem);
			
		oRBG1.setEnabled(false);
		
		var oSegmentedButtonSS = new sap.ui.commons.SegmentedButton({
			id:"SSSB",
			buttons:[new sap.ui.commons.Button({id:"SSSBON",text:"ON",lite: true,}),new sap.ui.commons.Button({id:"SSSBOFF",text:"OFF",lite: true})]});
		
		oSegmentedButtonSS.setSelectedButton("SSSBOFF");
		
		oSegmentedButtonSS.attachSelect(function(oEvent) {
			
			Status = oEvent.getParameters().selectedButtonId;	
			
     		if (Status == "SSSBON") {
				oRBG1.setEnabled(true);
				SearchColumn = oRBG1.getSelectedItem().getKey();
				oSearch.setValue("");
				var aUrl = '../Services/Search.xsjs?query='
					
					+ encodeURIComponent("*");
				
				jQuery.ajax({
						url : aUrl,
						method : 'GET',
						dataType : 'json',
						success : function(myJSON) {
							
							var aData = myJSON;
							
							oModel.setData({modelData: aData});
							
							oTable.setModel(oModel);
							oTable.bindRows("/modelData");
							
							searchCount = myJSON.length;
							
							oCountTextView.setText("Found:"+(searchCount - 1));
						}
					});
			} else { 
				oRBG1.setEnabled(false);
				oSearch.setValue("");	
				SearchColumn = "SS";
				var aUrl = '../Services/Search.xsjs?query='
					
					+ encodeURIComponent("*");
				
				jQuery.ajax({
						url : aUrl,
						method : 'GET',
						dataType : 'json',
						success : function(myJSON) {
							
							var aData = myJSON;
							
							oModel.setData({modelData: aData});
							
							oTable.setModel(oModel);
							oTable.bindRows("/modelData");
							
							searchCount = myJSON.length;
							
							oCountTextView.setText("Found:"+(searchCount - 1));
						}
					});
				
			}
			
		});
		
		
		var oCountTextView = new sap.ui.commons.TextView("oCountTextView", {
			//text : 'This is a long text to see if the wrapping property works. If wrapping is set to false it should not wrap automatically. Only defined line breaks should be used. \nThis is a new line.',
			tooltip : 'Count',
			wrapping : false,
			width : '100px',
			semanticColor : sap.ui.commons.TextViewColor.Positive,
			design : sap.ui.commons.TextViewDesign.H5
		});

		//Create a panel instance
		var oPanelsearch = new sap.ui.commons.Panel({
			showCollapseIcon : false,
			width : "80%"
		});
		
		oPanelsearch.setTitle(new sap.ui.core.Title({
			text : "Search Skills"
		}));
		// Export button 
		
		var oButtonExport = new sap.ui.commons.Button({
			text : "Export to Excel",
			icon : "sap-icon://excel-attachment",
			lite: true,
			press : function() 
			{
				
				var aUrl = '../Services/Search.xsjs?query='
					
					+ encodeURIComponent(oSearch.getValue());
				
				jQuery.ajax({
						url : aUrl,
						method : 'GET',
						dataType : 'json',
						success : function(myJSON) {
							
							JSONToCSVConvertor(myJSON,"Report",true);
						
						}
					});
				
				
				
				
				
				
			}
		});
		
		//Add something to the panel's content area
		oLayoutPanelShl1.addContent(oRBG1);
		oLayoutPanelShl1.addContent(oSegmentedButtonSS);
		oLayoutPanelSO.createRow(oLayoutPanelShl1);
		
		//testing new layout//oLayoutPanelShl2.addContent(oLabel);
		oLayoutPanelShl2.addContent(oSearch);
		oLayoutPanelShl2.addContent(oCountTextView);
		oLayoutPanel.createRow(oLayoutPanelShl2);

		
		oPanelsearch.addContent(oLayoutPanelSO);
		oPanelsearch.addContent(oLayoutPanel);

		// Function to create the dialog
		var oDialog1 = new sap.ui.commons.Dialog();

		function openDialog() {

			oDialog1.destroyContent();

			oDialog1.setTitle(employeeName);
			//creating a business card

			var oContentCard = new sap.ui.commons.layout.MatrixLayout({
				widths : [ "80px", "300px" ]
			});

			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
				hAlign : sap.ui.commons.layout.HAlign.Center
			});
			oCell.addContent(new sap.ui.commons.TextView({
				text : "Role:"
			}));
			oContentCard.createRow(oCell, new sap.ui.commons.TextView({
				text : role
			}));

			oCell = new sap.ui.commons.layout.MatrixLayoutCell({
				hAlign : sap.ui.commons.layout.HAlign.Center
			});
			oCell.addContent(new sap.ui.commons.TextView({
				text : "Lead:"
			}));
			oContentCard.createRow(oCell, new sap.ui.commons.TextView({
				text : lead
			}));

			oCell = new sap.ui.commons.layout.MatrixLayoutCell({
				hAlign : sap.ui.commons.layout.HAlign.Center
			});
			oCell.addContent(new sap.ui.commons.TextView({
				text : "Start Date:"
			}));
			oContentCard.createRow(oCell, new sap.ui.commons.DatePicker({
				value : startdate,
				editable : false
			}));

			oCell = new sap.ui.commons.layout.MatrixLayoutCell({
				hAlign : sap.ui.commons.layout.HAlign.Center
			});
			oCell.addContent(new sap.ui.commons.TextView({
				text : "Phone No:"
			}));
			var phone = new sap.ui.commons.TextView("phone");
			oContentCard.createRow(oCell, phone);

			oCell = new sap.ui.commons.layout.MatrixLayoutCell({
				hAlign : sap.ui.commons.layout.HAlign.Center
			});
			oCell.addContent(new sap.ui.commons.TextView({
				text : "Mobile No:"
			}));
			var mobile = new sap.ui.commons.TextView("mobile");
			oContentCard.createRow(oCell, mobile);

			oCell = new sap.ui.commons.layout.MatrixLayoutCell({
				hAlign : sap.ui.commons.layout.HAlign.Center
			});
			oCell.addContent(new sap.ui.commons.TextView({
				text : "Email:"
			}));
			var email = new sap.ui.commons.TextView("Email");
			oContentCard.createRow(oCell, email);

			var aUrl = '../Services/empDetails.xsjs?iNumber='
					+ escape(employeeID.trim());
			jQuery.ajax({
				url : aUrl,
				method : 'GET',
				dataType : 'json',
				success : function(myJSON) {

					phone.setText(myJSON[0].PHONE_NUMBER);
					mobile.setText(myJSON[0].MOBILE_NUMBER);
					email.setText(myJSON[0].EMAIL);

				}
			});
			//creating buttons for editing the skills 
			var ossButtonedit = new sap.ui.commons.Button({
				text : "Edit",
				icon : "sap-icon://edit",
				lite: true,
				press : function() {
					
					ossSimpleListBox.destroyItems();
					ossSimpleListBoxTP.destroyItems();
					ossSimpleListBoxDS.destroyItems();
					
					var ossModelQ = new sap.ui.model.odata.ODataModel(
							"../Services/empQualifications.xsodata/", false);
					ossModelQ.setSizeLimit(500);
					ossSimpleListBox.setModel(ossModelQ);
					
					var ossModelTP = new sap.ui.model.odata.ODataModel(
							"../Services/technology_product.xsodata/", false);
					ossModelTP.setSizeLimit(500);
					ossSimpleListBoxTP.setModel(ossModelTP);
					
					var ossModelDS = new sap.ui.model.odata.ODataModel(
							"../Services/developmentskills.xsodata/", false);
					ossModelDS.setSizeLimit(500);
					ossSimpleListBoxDS.setModel(ossModelDS);	
				
					ossSimpleListBox.setVisible(true);
					ossSimpleListBox.setEditable(true);
					ossSimpleListBoxTP.setVisible(true);
					ossSimpleListBoxTP.setEditable(true);
					ossSimpleListBoxDS.setVisible(true);
					ossSimpleListBoxDS.setEditable(true);
					
					ossButtoncancel.setEnabled(true);
					ossButtonrefresh.setEnabled(true);
					ossButtonsave.setEnabled(true);

					sslabelSL.setVisible(true);
					
					ossQLB.setVisible(true);
					ossQLB.setEditable(true);
					ossTPLB.setVisible(true);
					ossTPLB.setEditable(true);
					ossDSLB.setVisible(true);
					ossDSLB.setEditable(true);
					
					if (ossButtonedit.getEnabled())
					{
						ossButtonedit.setEnabled(false);
					}
				}

			});	 
			ossButtonedit.setEnabled(true);
			
			var ossButtonsave = new sap.ui.commons.Button({
				text : "Save",
				icon : "sap-icon://save",
				enabled : false,
				lite: true,
				press : function() {
					
					//getting the required values from the form  
					
					var empNameGet = oDialog1.getTitle().toUpperCase();
					i = 0;
					
					var QualArrayStore = ossQLB.getItems();
					var QualArray = [];
					while (i < ossQLB.getItems().length)
					{
						
						QualArray.push((QualArrayStore[i].mProperties.text));
						i++;
					};
												
					var QGet = QualArray.toString();
					
					QGet = QGet.replace(/,/g,";");
					
					
					i = 0;
					var TPArrayStore = ossTPLB.getItems();
					var TPArray = [];
					while (i < ossTPLB.getItems().length)
					{
						
						TPArray.push((TPArrayStore[i].mProperties.text));
						i++;
					};
												
					var TPGet = TPArray.toString();
					
					TPGet = TPGet.replace(/,/g,";");
				
					
					i = 0;
					var DSArrayStore = ossDSLB.getItems();
					var DSArray = [];
					while (i < ossDSLB.getItems().length)
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
						
						myJSON = myJSON.replace("[","");
						myJSON = myJSON.replace("]","");
						sap.ui.commons.MessageBox.alert("Record was saved for : " + myJSON,
								function() {
								}, "Success ! ");
						
						
							
						
								
						
						ossSimpleListBox.setVisible(false);
						ossSimpleListBoxTP.setEditable(false);
						ossSimpleListBoxTP.setVisible(false);
						ossSimpleListBoxDS.setEditable(false);
						ossSimpleListBoxDS.setVisible(false);
					
						
						ossButtonsave.setEnabled(false);
						ossButtoncancel.setEnabled(false);
						ossButtonrefresh.setEnabled(false);
						ossButtonedit.setEnabled(true);
						sslabelSL.setVisible(false);
						
						ossQLB.setEditable(false);
						ossTPLB.setEditable(false);
						ossDSLB.setEditable(false);
						
											
				                       }
			});
					
				 
				}

			});	 
			ossButtonsave.setEnabled(false);
			
			var ossButtonrefresh = new sap.ui.commons.Button({
				text : "refresh",
				icon : "sap-icon://refresh",
				lite: true,
				press : function() {
					
					
					ossTPLB.destroyItems();
					ossDSLB.destroyItems();
					ossQLB.destroyItems();
									
				
				selectedEmployeeName = oDialog1.getTitle().toUpperCase();
				
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
						 
							
							ossTPLB.addItem(new sap.ui.core.ListItem({text:tpMaintainArray[i]}));	
							
						    i++;
						}
						
						dsMaintain = "";
						dsMaintain = myJSON[0].development_skills;
						
						dsMaintainArray = [];
						
						dsMaintainArray = dsMaintain.split(";");
					
						i = 0;
						while (i < dsMaintainArray.length) {
						 
							
							ossDSLB.addItem(new sap.ui.core.ListItem({text:dsMaintainArray[i]}));	
							
						    i++;
						}
						
						qualMaintain = "";
						qualMaintain = myJSON[0].qualification;
						
						qualMaintainArray = [];
						
						qualMaintainArray = qualMaintain.split(";");
					
						i = 0;
						while (i < qualMaintainArray.length) {
						 
							
							ossQLB.addItem(new sap.ui.core.ListItem({text:qualMaintainArray[i]}));	
							
						    i++;
						}
						
						
						
						
						
					}
				});

		ossModelQ.refresh();
		ossModelTP.refresh();
		ossModelDS.refresh();
		
		ossSimpleListBox.setModel(ossModelQ);
		ossSimpleListBoxTP.setModel(ossModelTP);
		ossSimpleListBoxDS.setModel(ossModelDS);
				}

			});	 
			ossButtonrefresh.setEnabled(false);
			
			var ossButtoncancel = new sap.ui.commons.Button({
				text : "Cancel",
				icon : "sap-icon://sys-cancel",
				lite: true,
				press : function() {
					
										
					ossQLB.destroyItems();
					ossTPLB.destroyItems();
					ossDSLB.destroyItems();
					
					//Execute refresh first 
					
					selectedEmployeeName = oDialog1.getTitle().toUpperCase();
					
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
									 
										
										ossTPLB.addItem(new sap.ui.core.ListItem({text:tpMaintainArray[i]}));	
										
									    i++;
									}
									
									dsMaintain = "";
									dsMaintain = myJSON[0].development_skills;
									
									dsMaintainArray = [];
									
									dsMaintainArray = dsMaintain.split(";");
								
									i = 0;
									while (i < dsMaintainArray.length) {
									 
										
										ossDSLB.addItem(new sap.ui.core.ListItem({text:dsMaintainArray[i]}));	
										
									    i++;
									}
									
									qualMaintain = "";
									qualMaintain = myJSON[0].qualification;
									
									qualMaintainArray = [];
									
									qualMaintainArray = qualMaintain.split(";");
								
									i = 0;
									while (i < qualMaintainArray.length) {
									 
										
										ossQLB.addItem(new sap.ui.core.ListItem({text:qualMaintainArray[i]}));	
										
									    i++;
									}
									
									
									
									
									
								}
							});
					
					//End of refresh 
					
					ossSimpleListBox.setEditable(false);
					ossSimpleListBox.setVisible(false);
					ossSimpleListBoxTP.setEditable(false);
					ossSimpleListBoxTP.setVisible(false);
					ossSimpleListBoxDS.setEditable(false);
					ossSimpleListBoxDS.setVisible(false);
					ossButtonsave.setEnabled(false);
					ossButtoncancel.setEnabled(false);
					ossButtonrefresh.setEnabled(false);
					ossButtonedit.setEnabled(true);
					sslabelSL.setVisible(false);
					
					ossQLB.setEditable(false);
					ossTPLB.setEditable(false);
					ossDSLB.setEditable(false);
		   
					
				}

			});	 
			ossButtoncancel.setEnabled(false);
			
			//end of creating buttons for editing the skills 
			
			//creating the lists that will display the skill that can be assigned to the employee
			
			var ossItemTemplateQualification = new sap.ui.core.Item();
			ossItemTemplateQualification.bindProperty("text", "name");
			ossItemTemplateQualification.bindProperty("enabled",
				"enabled");
			
			var ossSorter = new sap.ui.model.Sorter("name", false);		

	    	var ossSimpleListBox = new sap.ui.commons.ListBox({
				items : {
					path : "/employeeQualifications",
					template : ossItemTemplateQualification,
					sorter:ossSorter
				},
				
				height : "150px",
				width : "300px" ,
				select : function(e) {
						
			
					//oQLB.addItem(oSimpleListBox.getSelectedItem());
										
					ossQLB.addItem(new sap.ui.core.ListItem({
						text : ossSimpleListBox.getSelectedItem().mProperties.text,
						key : ossSimpleListBox.getSelectedItem().mProperties.text
					}))
					
				},
				
				allowMultiSelect : false,
				visibleItems : 10,
				editable : false
			});

	    	ossSimpleListBox.setModel(ossModelQ);
	    	
	    	var ossItemTemplateTP = new sap.ui.core.Item();
			ossItemTemplateTP.bindProperty("text", "technology_product");
			ossItemTemplateTP.bindProperty("enabled",
					"enabled");
			
			var ossSimpleListBoxTP = new sap.ui.commons.ListBox({
				items : {
					path : "/technologyProduct",
					template : ossItemTemplateTP
				},
				 sorter: new sap.ui.model.Sorter("technology_product"), // <---  
				height : "150px",
				width : "300px" ,
				select : function(e) {
					
					//oTPLB.addItem(oSimpleListBoxTP.getSelectedItem());	
					ossTPLB.addItem(new sap.ui.core.ListItem({
						text : ossSimpleListBoxTP.getSelectedItem().mProperties.text,
						key : ossSimpleListBoxTP.getSelectedItem().mProperties.text
					}))
					
					
				},
				
				allowMultiSelect : false,
				visibleItems : 10,
				editable : false
			});

			ossSimpleListBoxTP.setModel(ossModelTP);
			
			var ossItemTemplateDS = new sap.ui.core.Item();
			ossItemTemplateDS.bindProperty("text", "development_skill");
			ossItemTemplateDS.bindProperty("enabled",
					"enabled");
			
			var ossSimpleListBoxDS = new sap.ui.commons.ListBox({
				items : {
					path : "/developmentSkills",
					template : ossItemTemplateDS
				},
				height : "150px",
				width : "300px" ,
				select : function(e) {
					
					//oDSLB.addItem(oSimpleListBoxDS.getSelectedItem());	
					ossDSLB.addItem(new sap.ui.core.ListItem({
						text : ossSimpleListBoxDS.getSelectedItem().mProperties.text,
						key : ossSimpleListBoxDS.getSelectedItem().mProperties.text
					}))
					
				},
				
				allowMultiSelect : false,
				visibleItems : 10,
				editable : false
			});

			ossSimpleListBoxDS.setModel(ossModelDS);
			
			//end of creating the lists that will display the skill that can be assigned to the employee 
			
			
			//Create matrix for the Skill display 
			
			var oContentSkillDisplay = new sap.ui.commons.layout.MatrixLayout({
			
			});		
	       // creating the list boxes to display the skills in the popup 
			//variable declaration 
			var tpMaintain;
			var dsMaintain;
			var qualMaintain;
			var qualMaintainArray ;
			
	    	var ossQLB = new sap.ui.commons.ListBox({
											
				height : "150px",
				width : "300px" ,
				allowMultiSelect : false,
				visibleItems : 10,
				editable : false,
				select : function(e) {
					
					jQuery.each(ossQLB.getSelectedItems(),
							function(idx, item) {
				
					
							// open a confirmation 
						sap.ui.commons.MessageBox.confirm("Do you want to remove the entry ?", fnCallbackConfirm, "deleteRecordPopup");
						
						function fnCallbackConfirm(bResult) {
							if(bResult)
								{
								ossQLB.removeItem(item);
								
								
								
								}
						}

						
														
									
					});
				},
					
			});
	    	

	    	var ossTPLB = new sap.ui.commons.ListBox({
				
				height : "150px",
				width : "300px" ,
				allowMultiSelect : false,
				visibleItems : 10,
				editable : false,
				select : function(e) {
					
					
					jQuery.each(ossTPLB.getSelectedItems(),
							function(idx, item) {
				
						// open a confirmation 
						sap.ui.commons.MessageBox.confirm("Do you want to remove the entry ?", fnCallbackConfirm, "deleteRecordPopup");
						
						function fnCallbackConfirm(bResult) {
							if(bResult)
								{
						ossTPLB.removeItem(item);
						
								}
						}
					});
					
							
				
									
				},
				
		
				
			});
	    	
	    	var ossDSLB = new sap.ui.commons.ListBox({
				
				height : "150px",
				width : "300px" ,
				allowMultiSelect : false,
				visibleItems : 10,
				editable : false,
				
				select : function(e) {
					
					
					jQuery.each(ossDSLB.getSelectedItems(),
							function(idx, item) {
						// open a confirmation 
						sap.ui.commons.MessageBox.confirm("Do you want to remove the entry ?", fnCallbackConfirm, "deleteRecordPopup");
						
						function fnCallbackConfirm(bResult) {
							if(bResult)
								{
						ossDSLB.removeItem(item);
						
						
								}
						}
					});
					
							
				
									
				},
				
			
			});
	    	/*var ossLabel = new sap.ui.commons.Label("skillsLabel");
	    	ossLabel.setDesign(sap.ui.commons.LabelDesign.Bold);
	    	ossLabel.setText("SKILLS");*/
	    	
	    	var QLabel = new sap.ui.commons.Label("Qlb");
	    	QLabel.setText("Qualification");
	    	
	    	var TPLabel = new sap.ui.commons.Label("TPlb");
	    	TPLabel.setText("Technology/Product");
	    	
	    	var DSLabel = new sap.ui.commons.Label("DSlb");
	    	DSLabel.setText("Development Skills");
	    	
	    	
	    	//var oDivider = new sap.ui.commons.HorizontalDivider("divider", {width: "100%", type: "Page", height: "Small"});
	    	
	    	var oPanelPopupSkillDisplay = new sap.ui.commons.Panel({
				showCollapseIcon : false,

			});
	    	oPanelPopupSkillDisplay.setTitle(new sap.ui.core.Title({
				text : "Skills"
			}));
	    	
	    	var sslabelES = new sap.ui.commons.Label({
				text : "Existing Skills"
			});
			
			var sslabelSL = new sap.ui.commons.Label({
				text : "Choose skills from below list"
			});
			sslabelSL.setVisible(false);
			//Existing skills visibility 
			
			ossSimpleListBox.setVisible(false);
			ossSimpleListBoxTP.setVisible(false);
			ossSimpleListBoxDS.setVisible(false);
			
			
	    	
	    	oPanelPopupSkillDisplay.addButton(ossButtonedit);
	    	oPanelPopupSkillDisplay.addButton(ossButtonsave);
	    	oPanelPopupSkillDisplay.addButton(ossButtoncancel);
	    	oPanelPopupSkillDisplay.addButton(ossButtonrefresh);
	    	
	    	
	    	oContentSkillDisplay.createRow(sslabelSL);
	    	oContentSkillDisplay.createRow(QLabel,TPLabel,DSLabel);
	    	oContentSkillDisplay.createRow(ossSimpleListBox,ossSimpleListBoxTP,ossSimpleListBoxDS);
	    	oContentSkillDisplay.createRow(sslabelES);
	    	oContentSkillDisplay.createRow(ossQLB,ossTPLB,ossDSLB);
	    	oPanelPopupSkillDisplay.addContent(oContentSkillDisplay);
	    	
	    	var aUrl = '../Services/populateMU.xsjs?employeename='
				+ escape(employeeName);
			
		        jQuery
				.ajax({
					url : aUrl,
					method : 'GET',
					dataType : 'json',
					success : function(myJSON) {
						

						tpMaintain = "";
						tpMaintain = myJSON[0].technology_product;
						
						tpMaintainArray = [];
						ossTPLB.destroyItems();
						tpMaintainArray = tpMaintain.split(";");
					
						i = 0;
						while (i < tpMaintainArray.length) {
						 
							
							ossTPLB.addItem(new sap.ui.core.ListItem({text:tpMaintainArray[i]}));	
							
						    i++;
						}
						
						dsMaintain = "";
						dsMaintain = myJSON[0].development_skills;
						
						dsMaintainArray = [];
						ossDSLB.destroyItems();
						dsMaintainArray = dsMaintain.split(";");
					
						i = 0;
						while (i < dsMaintainArray.length) {
						 
							
							ossDSLB.addItem(new sap.ui.core.ListItem({text:dsMaintainArray[i]}));	
							
						    i++;
						}
						
						qualMaintain = "";
						qualMaintain = myJSON[0].qualification;
						
						qualMaintainArray = [];
						ossQLB.destroyItems();
						qualMaintainArray = qualMaintain.split(";");
					
						i = 0;
						while (i < qualMaintainArray.length) {
						 
							
							ossQLB.addItem(new sap.ui.core.ListItem({text:qualMaintainArray[i]}));	
							
						    i++;
						}
						
						
						
						
						
					}
				});

		      //End of list boxes to display the skills in the popup 	
			
			oDialog1.addContent(oContentCard);
			oDialog1.addContent(oPanelPopupSkillDisplay);
			oDialog1.open();
		};


		
		
		
		// create a table to display employee skills 			
		var oTable = new sap.ui.table.Table(this.createId("employeeDataTable"),
				{

					visibleRowCount : 15,
					selectionMode : sap.ui.table.SelectionMode.Single,
					navigationMode : sap.ui.table.NavigationMode.Scrollbar,
					selectionBehavior : sap.ui.table.SelectionBehavior.Row,
					editable : false,
					width : "80%",
					enableColumnReordering : false,
					rowHeight : 20,
					rowSelectionChange : function(oControlEvent) {

						employeeID = oModel.getProperty("employeeID", oTable
								.getContextByIndex(oTable.getSelectedIndex()));
						employeeName = oModel.getProperty("name", oTable
								.getContextByIndex(oTable.getSelectedIndex()));
						role = oModel.getProperty("role", oTable
								.getContextByIndex(oTable.getSelectedIndex()));
						lead = oModel.getProperty("lead", oTable
								.getContextByIndex(oTable.getSelectedIndex()));
						startdate = oModel.getProperty("startdate", oTable
								.getContextByIndex(oTable.getSelectedIndex()));

						var filterEmpID = new sap.ui.model.odata.Filter(
								'employeeID', [ {
									operator : "EQ",
									value1 : employeeID
								} ]);

						if (!oDialog1.isOpen()) {

							openDialog(employeeName, role, lead, startdate,
									filterEmpID);

						}

						oTable.clearSelection();
					}

				});
		
		
		// sample comment

		// Defining and adding the columns and the control templates to the table

		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "EmployeeID"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"employeeID", function(sValue) {
						return sValue && sValue.toUpperCase();
					}),
			width : "60px",

		}));

		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Name"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"name", function(sValue) {
						return sValue && sValue.toUpperCase();
					}),
			width : "200px",

		}));
		
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Technology/Product"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"technology_product", function(sValue) {
						return sValue && sValue.toUpperCase();
					}),
			width : "200px",

		}));
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Development Skill"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"software_development", function(sValue) {
						return sValue && sValue.toUpperCase();
					}),
			width : "200px",

		}));

		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Qualification"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"qualification", function(sValue) {
						return sValue && sValue.toUpperCase();
					}),
			width : "200px",

		}));

		/*oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "PED/ESD"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"ped_esd", function(sValue) {
						return sValue && sValue.toUpperCase();
					}),
			width : "60px",

		}));*/


		var aUrl = '../Services/Search.xsjs?query='
			
			+ encodeURIComponent("*");
		
		jQuery.ajax({
				url : aUrl,
				method : 'GET',
				dataType : 'json',
				success : function(myJSON) {
					
					var aData = myJSON;
					
					oModel.setData({modelData: aData});
					
					oTable.setModel(oModel);
					oTable.bindRows("/modelData");
					
					searchCount = myJSON.length;
					
					oCountTextView.setText("Found:"+(searchCount - 1));
				}
			});

		// create a simple matrix layout
		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			id : this.createId("matrix_Tableview"),
			layoutFixed : true
		});

		//oLayout.createRow(oSegmentedButtonTP);
		oLayout.createRow(oPanelsearch);
		oLayout.createRow(oTable);
		oLayout.createRow(oButtonExport);
		
		
		//Function to convert the JSON to excel 
		
		
		function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
		    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
		    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
		    
		    var CSV = '';    
		    //Set Report title in first row or line
		    
		    CSV += ReportTitle + '\r\n\n';

		    //This condition will generate the Label/Header
		    if (ShowLabel) {
		        var row = "";
		        
		        //This loop will extract the label from 1st index of on array
		        for (var index in arrData[0]) {
		            
		            //Now convert each value to string and comma-seprated
		            row += index + ',';
		        }

		        row = row.slice(0, -1);
		        
		        //append Label row with line break
		        CSV += row + '\r\n';
		    }
		    
		    //1st loop is to extract each row
		    for (var i = 0; i < arrData.length; i++) {
		        var row = "";
		        
		        //2nd loop will extract each column and convert it in string comma-seprated
		        for (var index in arrData[i]) {
		            row += '"' + arrData[i][index] + '",';
		        }

		        row.slice(0, row.length - 1);
		        
		        //add a line break after each row
		        CSV += row + '\r\n';
		    }

		    if (CSV == '') {        
		        alert("Invalid data");
		        return;
		    }   
		    
		    //Generate a file name
		    var fileName = "MyReport_";
		    //this will remove the blank-spaces from the title and replace it with an underscore
		    fileName += ReportTitle.replace(/ /g,"_");   
		    
		    //Initialize file format you want csv or xls
		    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
		    
		    // Now the little tricky part.
		    // you can use either>> window.open(uri);
		    // but this will not work in some browsers
		    // or you will not get the correct file extension    
		    
		    //this trick will generate a temp <a /> tag
		    var link = document.createElement("a");    
		    link.href = uri;
		    
		    //set the visibility hidden so it will not effect on your web-layout
		    link.style = "visibility:hidden";
		    link.download = fileName + ".csv";
		    
		    //this part will append the anchor tag and remove it after automatic click
		    document.body.appendChild(link);
		    link.click();
		    document.body.removeChild(link);
		}
		

		return oLayout;

	}

});
