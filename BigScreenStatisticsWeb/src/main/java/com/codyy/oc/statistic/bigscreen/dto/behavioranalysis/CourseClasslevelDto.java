package com.codyy.oc.statistic.bigscreen.dto.behavioranalysis;

import java.util.List;

/**
 *
 * @author robot
 */
public class CourseClasslevelDto {
	/**
	 * 年级名称
	 */
	private String classlevelName;
	private List<CourseDto> courses;

	public String getClasslevelName() {
		return classlevelName;
	}

	public void setClasslevelName(String classlevelName) {
		this.classlevelName = classlevelName;
	}

	public List<CourseDto> getCourses() {
		return courses;
	}

	public void setCourses(List<CourseDto> courses) {
		this.courses = courses;
	}
}
