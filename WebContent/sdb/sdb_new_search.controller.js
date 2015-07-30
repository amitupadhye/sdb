sap.ui.controller("sdb.sdb_new_search", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf sdb.sdb_new_search
	 */
	//	onInit: function() {
	//
	//	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf sdb.sdb_new_search
	 */
	//	onBeforeRendering: function() {
	//
	//	},
	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf sdb.sdb_new_search
	 */
	//	onAfterRendering: function() {
	//
	//	},
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf sdb.sdb_new_search
	 */
	//	onExit: function() {
	//
	//	}
	emptyFilter : function emptyFilter() {

		gFilterTerms = "";
		gFilterAttribute = "";
	},

	setFilter : function setFilter(terms) {

		var mySplitResults = terms.split(' ');

		console.log(mySplitResults);

		var splitCount = mySplitResults.length;

		console.log(splitCount);

		
			gFilterTerms = mySplitResults[0].toUpperCase();

			console.log(gFilterTerms);

			gFilterAttribute = "technology_product";
			gFilterAttribute2 = "software_development";
			gFilterAttribute3 = "qualification";

			if (gFilterTerms == "*")
				this.emptyFilter();
			if (gFilterTerms == "")
				this.emptyFilter();

			oTable = this.byId("employeeDataTable");

			//Build the OData Service Filter Options
			var filter = new sap.ui.model.odata.Filter(gFilterAttribute, [ {
				operator : "Contains",
				value1 : gFilterTerms
			} ]);
			var filter2 = new sap.ui.model.odata.Filter(gFilterAttribute2, [ {
				operator : "Contains",
				value1 : gFilterTerms
			} ]);
			var filter3 = new sap.ui.model.odata.Filter(gFilterAttribute3, [ {
				operator : "Contains",
				value1 : gFilterTerms
			} ]);

			if (gFilterTerms == "" || gFilterTerms == "*")

			{

				oTable.bindRows("/employeeDetails");
			} else {

				oTable.bindRows({
					path : "/employeeDetails",
					parameters : {
						select : 'name,employeeID'
					},
					filters : [ filter ]
				});

				var getRows = oTable._getRowCount();

				//console.log(getRows);

				if (getRows == 0) {
					oTable.bindRows({
						path : "/employeeDetails",
						parameters : {
							select : 'name,employeeID'
						},
						filters : [ filter2 ]
					});

					getRows = oTable._getRowCount();

					if (getRows == 0) {
						oTable.bindRows({
							path : "/employeeDetails",
							parameters : {
								select : 'name,employeeID'
							},
							filters : [ filter3 ]
						});

					}
					;

				}
				;

			}
			;

			oTable.clearSelection();

		}



});