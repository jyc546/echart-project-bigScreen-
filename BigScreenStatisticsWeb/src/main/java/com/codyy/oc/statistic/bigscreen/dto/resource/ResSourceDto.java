package com.codyy.oc.statistic.bigscreen.dto.resource;

/**
 * 资源来源
 * @author robot
 */
public class ResSourceDto {
	/**
	 * 资源数量
	 */
	private int resourceCnt;
	/**
	 * 资源('本级上传','下级推荐','资源数量')
	 */
	private String resourceSource;

	public int getResourceCnt() {
		return resourceCnt;
	}

	public void setResourceCnt(int resourceCnt) {
		this.resourceCnt = resourceCnt;
	}

	public String getResourceSource() {
		return resourceSource;
	}

	public void setResourceSource(String resourceSource) {
		this.resourceSource = resourceSource;
	}
}
