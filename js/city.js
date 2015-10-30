/*
author: elycir
create: 2012-06
description: 省市区三级(二级)联动
*/
$(function() {
	var citySelector = function() {
		var province = $("#province-sel");
		var city = $("#city-sel");
		var district = $("#district-sel");
		var preProvince = $("#pre_province");
		var preCity = $("#pre_city");
		var preDistrict = $("#pre_district");
		var jsonProvince = "./data/city-choose/json-array-of-province.js";
		var jsonCity = "./data/city-choose/json-array-of-city.js";
		var jsonDistrict = "./data/city-choose/json-array-of-district.js";
		var hasDistrict = true;
		var initProvince = "<option value='0'>请选择省份</option>";
		var initCity = "<option value='0'>请选择城市</option>";
		var initDistrict = "<option value='0'>请选择区县</option>";
		return {
			Init: function() {
				var that = this;
				// debugger
				that._LoadOptions(jsonProvince, preProvince, province, null, null, 0, initProvince);
				province.change(function() {
					that._LoadOptions(jsonCity, preCity, city, preProvince, province, 2, initCity);
				});
				if (hasDistrict) {
					city.change(function() {
						that._LoadOptions(jsonDistrict, preDistrict, district, preCity, city, 4, initDistrict);
					});
					district.change(function() {
						preDistrict.val($('option[value="' + $(this).val() + '"]', this).text());
					});
					province.change(function() {
						city.change();
					});
				}
				province.change();
			},
			_LoadOptions: function(datapath, preobj, targetobj, preParent, parentobj, comparelen, initoption) {
				// debugger
				$.get(
					datapath,
					function(r) {
						// debugger
						var t = ''; // t: html容器
						var s; // s: 选中标识
						var pre; // pre: 初始值
						if (preobj === undefined) {
							pre = 0;
						} else {
							pre = preobj.val();
						}
						for (var i = 0; i < r.length; i++) {
							s = '';
							if (comparelen === 0) {
								if (pre !== "" && pre !== 0 && r[i].name === pre) {
									s = ' selected=\"selected\" ';
									pre = '';
								}
								t += '<option value=' + r[i].code + s + '>' + r[i].name + '</option>';
							} else {
								var p = parentobj.val();
								if (p.substring(0, comparelen) === r[i].code.substring(0, comparelen)) {
									if (pre !== "" && pre !== 0 && r[i].name === pre) {
										s = ' selected=\"selected\" ';
										pre = '';
									}
									t += '<option value=' + r[i].code + s + '>' + r[i].name + '</option>';
								}
							}
						}
						if (initoption !== '') {
							targetobj.html(initoption + t);
						} else {
							targetobj.html(t);
						}
						if (preParent) {
							preParent.val($('option[value="' + parentobj.val() + '"]', parentobj).text());
						}
					},
					"json"
				);
			}
		};
	}();
	citySelector.Init();
});