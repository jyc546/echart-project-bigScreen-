package com.codyy.oc.statistic.bigscreen.dto.resource;

/**
 *
 * @author robot
 */
public class ResAreaDto {
	/**
	 * 区域名称
	 */
	private String areaName;
	/**
	 * 收藏量
	 */
	private int count;

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}
