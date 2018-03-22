package com.codyy.oc.statistic.bigscreen.dto.behavioranalysis;

/**
 *
 * @author robot
 */
public class CourseDto {
	/**
	 * 课程数量
	 */
	private int courseCnt;
	/**
	 * 授课类型(blackboard:板块型,interaction:对话型,exercise:练习型,teaching:讲授型,balance:平衡型)
	 */
	private String instructMode;

	public int getCourseCnt() {
		return courseCnt;
	}

	public void setCourseCnt(int courseCnt) {
		this.courseCnt = courseCnt;
	}

	public String getInstructMode() {
		return instructMode;
	}

	public void setInstructMode(String instructMode) {
		this.instructMode = instructMode;
	}
}
