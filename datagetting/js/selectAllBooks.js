function select_cur_dept(dept_i) {
  var campusid = 1015;
  var termid = 137;
  var deptid = $("#clDeptSelectBox").children()[dept_i].value;
  clClearSelectBox('clCourseSelectBox');
  clClearSelectBox('clSectionSelectBox');
  var url = clGetHandlerURL() + 'o=r&cm=' + campusid + '&tm=' + termid + '&dp=' + deptid;
  clFetchData(url, 'clCourseSelectBox', 1);
  console.log(deptid);
}

function select_cur_course(dept_i, course_i) {
  var campusid = 1015;
  var termid = 137;
  var deptid = $("#clDeptSelectBox").children()[dept_i].value;
  var course = $("#clCourseSelectBox").children()[course_i].value;
  clClearSelectBox('clSectionSelectBox');
}