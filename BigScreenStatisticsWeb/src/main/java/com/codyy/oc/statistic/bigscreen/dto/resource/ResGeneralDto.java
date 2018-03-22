package com.codyy.oc.statistic.bigscreen.dto.resource;

/**
 *
 * @author robot
 */
public class ResGeneralDto {
	/**
	 * 活跃人数
	 */
	private int activeUserCnt;
	/**
	 * 人均收藏量
	 */
	private int collectionAvg;
	/**
	 * 收藏量
	 */
	private int collectionCnt;
	/**
	 * 人均下载量
	 */
	private int downloadAvg;
	/**
	 * 下载量
	 */
	private int downloadCnt;
	/**
	 * 资源总量
	 */
	private int resourceCnt;
	/**
	 * 人均浏览量
	 */
	private int viewAvg;
	/**
	 * 浏览总量
	 */
	private int viewCnt;

	public int getActiveUserCnt() {
		return activeUserCnt;
	}

	public void setActiveUserCnt(int activeUserCnt) {
		this.activeUserCnt = activeUserCnt;
	}

	public int getCollectionAvg() {
		return collectionAvg;
	}

	public void setCollectionAvg(int collectionAvg) {
		this.collectionAvg = collectionAvg;
	}

	public int getCollectionCnt() {
		return collectionCnt;
	}

	public void setCollectionCnt(int collectionCnt) {
		this.collectionCnt = collectionCnt;
	}

	public int getDownloadAvg() {
		return downloadAvg;
	}

	public void setDownloadAvg(int downloadAvg) {
		this.downloadAvg = downloadAvg;
	}

	public int getDownloadCnt() {
		return downloadCnt;
	}

	public void setDownloadCnt(int downloadCnt) {
		this.downloadCnt = downloadCnt;
	}

	public int getResourceCnt() {
		return resourceCnt;
	}

	public void setResourceCnt(int resourceCnt) {
		this.resourceCnt = resourceCnt;
	}

	public int getViewAvg() {
		return viewAvg;
	}

	public void setViewAvg(int viewAvg) {
		this.viewAvg = viewAvg;
	}

	public int getViewCnt() {
		return viewCnt;
	}

	public void setViewCnt(int viewCnt) {
		this.viewCnt = viewCnt;
	}
}
