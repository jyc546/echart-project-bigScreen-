package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 课程分布(主讲教室课程与接收教室课程的指向关系)
 * @author robot
 */
public class CourseDistributionDto {
	/**
	 * 次数
	 */
	private int count;
	/**
	 * 接收区行政代码
	 */
	private String fromAreaCode;
	/**
	 * 主讲区行政代码
	 */
	private String toAreaCode;

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getFromAreaCode() {
		return fromAreaCode;
	}

	public void setFromAreaCode(String fromAreaCode) {
		this.fromAreaCode = fromAreaCode;
	}

	public String getToAreaCode() {
		return toAreaCode;
	}

	public void setToAreaCode(String toAreaCode) {
		this.toAreaCode = toAreaCode;
	}
}
