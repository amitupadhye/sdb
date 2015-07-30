function createFilterEntry(rs,obj) {
		return {
			"PHONE_NUMBER"    : rs.getNString(1),
			"MOBILE_NUMBER"    : rs.getNString(2),
			"EMAIL" :  rs.getNString(3)
			
			  };
	}	

var iNumber = $.request.parameters.get('iNumber');//1

var conn = $.db.getConnection("sdb.Services::anonuser");
var pstmt;
var rs;
var query;
var list = [];
var body = '';

try{
	
var query = "select \"PHONE_NUMBER\",\"MOBILE_NUMBER\",\"MAIL_ADDRESS\" from \"skillsDB\".\"EMPDETAILS\" where \"employeeID\" = ?";

pstmt = conn.prepareStatement(query);

pstmt.setString(1, iNumber);

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