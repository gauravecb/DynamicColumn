sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.dynamiccolumn.DynamicColumn.controller.View1", {
		onInit: function () {
			var columnData = [{
				columnName: "firstName"
			}, {
				columnName: "lastName"
			}, {
				columnName: "department"
			},{
				columnName: "active"
			}];

			var rowData = [{
				firstName: "Sachin",
				lastName: "Tendulkar",
				department: "Cricket",
				active: "R"
			}, {
				firstName: "Lionel",
				lastName: "Messi",
				department: "Football",
				active: "A"
			}, {
				firstName: "Mohan",
				lastName: "Lal",
				department: "Film",
				active: "A"
			}];
			var oTable = this.getView().byId("idTable");
			var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
		    rows: rowData,
		    columns: columnData
		});
		oTable.setModel(oModel);
      
		oTable.bindColumns("/columns", function(sId, oContext) {
		    var columnName = oContext.getObject().columnName;
		    return new sap.ui.table.Column({
		        label: columnName,
		        template: columnName,
		    });
		});
      
		oTable.bindRows("/rows");
		}
	});
});