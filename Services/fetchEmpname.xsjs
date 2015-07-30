function createFilterEntry(rs,obj) {
		return {
			"en"    : rs.getNString(1),
					
			  };
	}	
function createFilterEntry2(rs,obj) {
	return {
		"count" : rs.getNString(1),
		   };
}

var teamName = $.request.parameters.get('teamName');//1

var conn = $.db.getConnection("sdb.Services::anonuser");
var pstmt;
var rs;
var query;
var list = [];
var body = '';

try{
	
	
var query2 = "select count ( \"EMPLOYEENAME\" ) from \"skillsDB\".\"SLTVIEWFINAL\" where \"TEAMNAME\" = ?";
pstmt = conn.prepareStatement(query2);
pstmt.setString(1, teamName);

rs = pstmt.executeQuery();

while (rs.next()){
	
	list.push(createFilterEntry2(rs,"Obj"));

	}	

var query = "select  (\"EMPLOYEENAME\") from \"skillsDB\".\"SLTVIEWFINAL\" where \"TEAMNAME\" = ? order by \"EMPLOYEENAME\" "  ;
pstmt = conn.prepareStatement(query);
pstmt.setString(1, teamName);

rs = pstmt.executeQuery();

while (rs.next()){
	
	list.push(createFilterEntry(rs,"Obj"));

	}

rs.close();
pstmt.close();
conn.close();





body = JSON.stringify(list);
$.trace.debug(body);
$.response.contentType = 'application/json';
$.response.setBody(body);
$.response.headers.set('access-control-allow-origin', '*');
$.response.status = $.net.http.OK;

}
catch(e){
	
	
	$.response.setBody('Error is = '+ e );
	
}