function createFilterEntry(rs,obj) {
		return {
			"tn"    : rs.getNString(1),
					
			  };
	}	
function createFilterEntry2(rs,obj) {
	return {
		"count" : rs.getNString(1),
		   };
}


var conn = $.db.getConnection("sdb.Services::anonuser");
var pstmt;
var rs;
var query;
var list = [];
var body = '';

try{
	
	
var query2 = "select count ( distinct\"TEAMNAME\" ) from \"skillsDB\".\"SLTVIEWFINAL\"";
pstmt = conn.prepareStatement(query2);

rs = pstmt.executeQuery();

while (rs.next()){
	
	list.push(createFilterEntry2(rs,"Obj"));

	}	

var query = "select distinct (\"TEAMNAME\") from \"skillsDB\".\"SLTVIEWFINAL\"";


pstmt = conn.prepareStatement(query);

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