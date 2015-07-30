
//retrieving the values in JSON format


// function for tp, ds, and qualification from main table
function createFilterEntry(rs, obj) {
	return {
		
		"technology_product" : rs.getNString(1),
		"development_skills" : rs.getNString(2),
		"qualification" : rs.getNString(3)

	};
}


// function to return employeedid from SLTVIEWFINAL

function createFilterEntry2(rs2, obj){
	
	return{
		
		"EMPLOYEEID" : rs2.getNString(1)
		
	};
	
}

var employeename = $.request.parameters.get('employeename');//1



var conn = $.db.getConnection("sdb.Services::anonuser");
var pstmt;
var pstmt2;
var rs;
var rs2; 
var query;
var list = [];
var body = '';

try {

	// query to fetch TP, DS, Qualifications from main table
	
	var query = "select \"technology_product\",\"software_development\",\"qualification\" from \"skillsDB\".\"sdb.Data::mainTable_skillsDB\" where contains (\"name\",?)";

	pstmt = conn.prepareStatement(query);

	pstmt.setString(1, employeename);

	rs = pstmt.executeQuery();

	while (rs.next()) {

		list.push(createFilterEntry(rs, "Obj"));

	}
	rs.close();
	pstmt.close();
	
	// query to fetch employeeid from sltviewfinal view 
	
	var queryemployeedid  = "select \"EMPLOYEEID\" from \"skillsDB\".\"SLTVIEWFINAL\" where \"EMPLOYEENAME\" = ?";

	pstmt2 = conn.prepareStatement(queryemployeedid);
	
	pstmt2.setString(1, employeename);
	
	rs2 = pstmt2.executeQuery();
	
	while (rs2.next()){
	
	list.push(createFilterEntry2(rs2, "obj"));
	
	}
	
	rs2.close();
	pstmt2.close();

	conn.close();

	body = JSON.stringify(list);

	$.trace.debug(body);
	$.response.contentType = 'application/json';
	$.response.setBody(body);
	$.response.headers.set('access-control-allow-origin', '*');
	$.response.status = $.net.http.OK;
	
	

} catch (e) {

	$.response.setBody('Error is = ' + e);

}