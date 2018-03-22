package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 课程故障
 * @author robot
 */
public class CourseFaultDto {
	/**
	 * 故障数量
	 */
	private int count;
	/**
	 * 故障名称
	 */
	private String faultName;

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getFaultName() {
		return faultName;
	}

	public void setFaultName(String faultName) {
		this.faultName = faultName;
	}
}
