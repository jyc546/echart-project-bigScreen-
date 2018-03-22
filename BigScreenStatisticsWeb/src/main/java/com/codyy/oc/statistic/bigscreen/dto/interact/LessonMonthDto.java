package com.codyy.oc.statistic.bigscreen.dto.interact;

/**
 * 教案数量和月份数据
 * @author robot
 */
public class LessonMonthDto {
	/**
	 * 教案数量
	 */
	private int lessonCnt;
	/**
	 * 月份1-12
	 */
	private int month;

	public int getLessonCnt() {
		return lessonCnt;
	}

	public void setLessonCnt(int lessonCnt) {
		this.lessonCnt = lessonCnt;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}
}
