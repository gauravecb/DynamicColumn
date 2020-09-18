sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/table/RowAction",
	"sap/ui/table/RowActionItem",
	"sap/ui/table/RowSettings",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"../model/formatter"
], function (Controller, RowAction, RowActionItem, RowSettings, MessageToast, Fragment,formatter) {
	"use strict";

	return Controller.extend("com.dynamiccolumn.DynamicColumn.controller.View1", {
		formatter: formatter,
		onInit: function () {
			var columnData = [{
				columnName: "firstName"
			}, {
				columnName: "lastName"
			}, {
				columnName: "department"
			}, {
				columnName: "active"
			}];

			var rowData = [{
				firstName: "Sachin",
				lastName: "Tendulkar",
				department: "Cricket",
				active: "Retired"
			}, {
				firstName: "Lionel",
				lastName: "Messi",
				department: "Football",
				active: "Active"
			}, {
				firstName: "Mohan",
				lastName: "Lal",
				department: "Film",
				active: "Active"
			}];
			var oTable = this.getView().byId("idTable");
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				rows: rowData,
				columns: columnData
			});
			oTable.setModel(oModel);

			oTable.bindColumns("/columns", function (sId, oContext) {
				var columnName = oContext.getObject().columnName;
				var oTemplate = new sap.m.ObjectStatus({
					text: "{" + columnName + "}",
					state: {
						path: columnName,
						formatter: function (data) {
							if (data) {
								if (data == "Retired") {
									return "Error";
								} else if (data == "Active") {
									return "Success";
								} else {
									return "None";
								}

							}

						}
					}
				});

				return new sap.ui.table.Column({
					label: columnName,
					filterProperty: columnName,
					sortProperty: columnName,
					template: oTemplate
				});
			});

			oTable.bindRows("/rows");
		},
		handleActionPress: function (oEvent) {
			// Open the Fragnemt
			var oView = this.getView();

			if (!this.byId("edit")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "com.dynamiccolumn.DynamicColumn.Fragment.Edit",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("edit").open();
			}

			// Create Content for simple form
			//	var oRow = oEvent.getParameter("row");
			var oForm = this.getView().byId("SimpleForm");
			oForm.removeAllContent();
			var oItem = oEvent.getParameter("item");
			var obj = oItem.getBindingContext().getObject();
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					var val = obj[key];
					var oLabel = new sap.m.Label({
						text: key
					});
					oForm.addContent(oLabel);
					var oInput = new sap.m.Input({
						value: val,
						placeholder: "Enter a first name"
					});
					oForm.addContent(oInput);

				}
			}

		},
		handleCancel: function () {
			this.byId("edit").close();
		},
		handleSave: function (oEvent) {
			var aContent = this.getView().byId("SimpleForm").getContent();
			var Obj = {};
			for (var i = 0; i < aContent.length; i++) {

				if (i % 2 === 0) {
					var sKey = aContent[i].getText();
				}else {
					var sValue = aContent[i].getValue();
				}
				Obj[sKey] = sValue;
			}
		}

	});
});