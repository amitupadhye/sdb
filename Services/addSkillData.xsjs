try {

    //fetching the form data 

    var empName = $.request.parameters.get('empName'); //1
    var qualification = $.request.parameters.get('qualification'); //2
    var tech_prod = $.request.parameters.get('tech_prod'); //3
    var dev_skill = $.request.parameters.get('dev_skill'); //4

    var conn = $.db.getConnection("sdb.Services::anonuser");

    var empID = 'empty';

    var stmt = conn.prepareStatement("select \"employeeID\" from \"skillsDB\".\"sdb.Data::mainTable_skillsDB\" where contains (\"name\" ,?)");
    stmt.setString(1, empName);

    var rs = stmt.executeQuery();

    while (rs.next()) {

        var empID = rs.getNString(1);

    }

    rs.close();
    stmt.close();


    if (empID === 'empty') {
        var upName = empName.toUpperCase();
        var query = "select \"EMPLOYEEID\" from (SELECT \"EMPLOYEEID\" , upper(\"EMPLOYEENAME\") as name FROM \"skillsDB\".\"SLTVIEWFINAL\") where name = ? ";
        //var stmt2 = conn.prepareStatement("select \"EMPLOYEEID\" from \"skillsDB\".\"SLTVIEWFINAL\" where \"EMPLOYEENAME\" = ? ");
        var stmt2 = conn.prepareStatement(query);
        stmt2.setString(1, upName);

        var rs2 = stmt2.executeQuery();

        while (rs2.next()) {
            var empID2 = rs2.getNString(1);
        }

        rs2.close();
        stmt2.close();


        var st2 = conn.prepareStatement("insert into \"skillsDB\".\"sdb.Data::mainTable_skillsDB\" (\"employeeID\",\"name\",\"startdate\",\"ped_esd\",\"role\",\"technology_product\",\"software_development\",\"lead\",\"qualification\") values ( ? , ? ,\'\',\'\',\'\' , ? , ? ,\'\' , ? )");
        st2.setString(1, empID2);
        st2.setString(2, upName);
        st2.setString(3, tech_prod);
        st2.setString(4, dev_skill);
        st2.setString(5, qualification);

        st2.execute();

    } else {

        // Statement to update the form data

        var st = conn.prepareStatement("update \"skillsDB\".\"sdb.Data::mainTable_skillsDB\" set \"technology_product\" = ?,\"software_development\"= ? ,\"qualification\"= ? where \"employeeID\" = ? ");

        st.setString(1, tech_prod);
        st.setString(2, dev_skill);
        st.setString(3, qualification);
        st.setString(4, empID);

        st.execute();

    }


    conn.commit();

    var record = [];
    record.push(empName);

    conn.close();
    $.response.contentType = "text/json";
    $.response.setBody(JSON.stringify(record));

} catch (e) {

    $.response.setBody('Error is' + e);

}