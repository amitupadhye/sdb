function createFilterEntry(rs) {
		return {
		
			"employeeID" : rs.getNString(1),
			"name" : rs.getNString(2),
			"technology_product" : rs.getNString(3),
			"software_development" : rs.getNString(4),
			"qualification" : rs.getNString(5),
			"ped_esd" : rs.getNString(6),
			"role" : rs.getNString(7),
			"lead" : rs.getNString(8),
			"startdate" : rs.getNString(9)
			
			
		};
	}
		
	var body = '';
	var terms = $.request.parameters.get('query');
	var column = $.request.parameters.get('column');
	var termList = terms.split(" ");
	var searchedterm = terms;
	var termStr = "";
	var i;
	for (i = 0; i < termList.length; i++) {
		termStr += termList[i].replace(/\s+/g, '') + "* ";
	}
	terms = termStr;

	var conn = $.db.getConnection("sdb.Services::anonuser");
	var pstmt;
	var rs;
	var query;
	var list = [];

	try
	{	
		if (column == "TP")
		{
//			query ="select \"employeeID\",\"name\",\"technology_product\" ,\"software_development\",\"qualification\" from \"skillsDB\".\"sorted.sdb.Data::mainTable_skillsDB\" where contains (\"technology_product\",?) ";
			query ="select \"employeeID\",\"name\",\"technology_product\" ,\"software_development\",\"qualification\" ,\"ped_esd\",\"role\",\"lead\",\"startdate\" from \"skillsDB\".\"sdb.Data::mainTable_skillsDB\" where contains (\"technology_product\",?) ";
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, terms);
			
		
		}else if (column == "Q")
		{
//			query ="select \"employeeID\",\"name\",\"technology_product\" ,\"software_development\",\"qualification\" from \"skillsDB\".\"sorted.sdb.Data::mainTable_skillsDB\" where contains (\"qualification\",?)";
			query ="select \"employeeID\",\"name\",\"technology_product\" ,\"software_development\",\"qualification\" ,\"ped_esd\",\"role\",\"lead\",\"startdate\" from \"skillsDB\".\"sdb.Data::mainTable_skillsDB\" where contains (\"qualification\",?)";
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, terms);
			
		}else if (column == "DS")
		{
//			query ="select \"employeeID\",\"name\",\"technology_product\" ,\"software_development\",\"qualification\" from \"skillsDB\".\"sorted.sdb.Data::mainTable_skillsDB\" where contains (\"software_development\",?)";
			query ="select \"employeeID\",\"name\",\"technology_product\" ,\"software_development\",\"qualification\" ,\"ped_esd\",\"role\",\"lead\",\"startdate\" from \"skillsDB\".\"sdb.Data::mainTable_skillsDB\" where contains (\"software_development\",?)";
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, terms);
			
		}else 
		{
//			query ="select \"employeeID\",\"name\",\"technology_product\" ,\"software_development\",\"qualification\" from \"skillsDB\".\"sorted.sdb.Data::mainTable_skillsDB\" where contains (\"name\",?) or contains (\"employeeID\",?) or contains (\"technology_product\",?) or contains (\"software_development\",?) or contains (\"qualification\",?)";	
			query ="select \"employeeID\",\"name\",\"technology_product\" ,\"software_development\",\"qualification\" ,\"ped_esd\",\"role\",\"lead\",\"startdate\" from \"skillsDB\".\"sdb.Data::mainTable_skillsDB\" where contains (\"name\",?) or contains (\"employeeID\",?) or contains (\"technology_product\",?) or contains (\"software_development\",?) or contains (\"qualification\",?)";
			pstmt = conn.prepareStatement(query);
			pstmt.setString(1, terms);
			pstmt.setString(2, terms);
			pstmt.setString(3, terms);
			pstmt.setString(4, terms);
			pstmt.setString(5, terms);
			
		}
		 
		
				

		
		rs = pstmt.executeQuery();

		while (rs.next()) {
			
			list.push(createFilterEntry(rs));
		}

		rs.close();
		pstmt.close();
		list.push({"terms" : searchedterm});

		conn.close();
		

	
	body = JSON.stringify(list);
	$.trace.debug(body);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.headers.set('access-control-allow-origin', '*');
	$.response.status = $.net.http.OK;
	
	} catch (e) {
		
		$.response.setBody('Error is = '+ e );
		
	}



