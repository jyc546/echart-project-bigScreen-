package com.codyy.oc.statistic.bigscreen.dto.behavioranalysis;

import java.util.List;

/**
 *
 * @author robot
 */
public class CourseSubjectDto {
	/**
	 * 学科名称
	 */
	private String subjectName;
	private List<CourseDto> courses;

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public List<CourseDto> getCourses() {
        return courses;
    }

    public void setCourses(List<CourseDto> courses) {
        this.courses = courses;
    }
}
