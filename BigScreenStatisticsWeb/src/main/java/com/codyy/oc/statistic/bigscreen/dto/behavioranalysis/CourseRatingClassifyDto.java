package com.codyy.oc.statistic.bigscreen.dto.behavioranalysis;

import java.util.List;

/**
 *
 * @author robot
 */
public class CourseRatingClassifyDto {
	/**
	 * 好评
	 */
	private List<CourseDto> veryGoodCourses;
	/**
	 * 一般
	 */
	private List<CourseDto> generalCourses;

	public List<CourseDto> getVeryGoodCourses() {
		return veryGoodCourses;
	}

	public void setVeryGoodCourses(List<CourseDto> veryGoodCourses) {
		this.veryGoodCourses = veryGoodCourses;
	}

	public List<CourseDto> getGeneralCourses() {
		return generalCourses;
	}

	public void setGeneralCourses(List<CourseDto> generalCourses) {
		this.generalCourses = generalCourses;
	}
}
