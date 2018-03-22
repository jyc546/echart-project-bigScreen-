package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 *
 * @author robot
 */
public class CourseRatioWeekDto {
	/**
	 * 比例
	 */
	private double ratio;
	/**
	 * 周次
	 */
	private int week;

	public double getRatio() {
		return ratio;
	}

	public void setRatio(double ratio) {
		this.ratio = ratio;
	}

	public int getWeek() {
		return week;
	}

	public void setWeek(int week) {
		this.week = week;
	}
}
