package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 课程有效性
 * @author robot
 */
public class CourseValidityStatusDto {
	/**
	 * 非有效授课数量
	 */
	private int invalidCourseCnt;
	/**
	 * 有效授课数量
	 */
	private int validCourseCnt;

	public int getInvalidCourseCnt() {
		return invalidCourseCnt;
	}

	public void setInvalidCourseCnt(int invalidCourseCnt) {
		this.invalidCourseCnt = invalidCourseCnt;
	}

	public int getValidCourseCnt() {
		return validCourseCnt;
	}

	public void setValidCourseCnt(int validCourseCnt) {
		this.validCourseCnt = validCourseCnt;
	}
}
