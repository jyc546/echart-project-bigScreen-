package com.codyy.oc.statistic.bigscreen.dto.resource;

/**
 * 资源总览-比例图
 * @author robot
 */
public class ResTypeRatioDto {
	/**
	 * 资源数量
	 */
	private int count;
	/**
	 * 资源类型(video:视频,doc:文档,pic:图片,audio:音频)
	 */
	private String resourceType;

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
}
