package com.codyy.oc.statistic.bigscreen.dto.resource;

/**
 * 资源使用情况
 * @author robot
 */
public class ResRecentDataDto {
	/**
	 * 收藏量
	 */
	private int collectionCnt;
	/**
	 * 下载量
	 */
	private int downloadCnt;
	/**
	 * 上传量
	 */
	private int uploadCnt;
	/**
	 * 平均浏览量
	 */
	private int viewAvg;
	/**
	 * 浏览量
	 */
	private int viewCnt;

	public int getCollectionCnt() {
		return collectionCnt;
	}

	public void setCollectionCnt(int collectionCnt) {
		this.collectionCnt = collectionCnt;
	}

	public int getDownloadCnt() {
		return downloadCnt;
	}

	public void setDownloadCnt(int downloadCnt) {
		this.downloadCnt = downloadCnt;
	}

	public int getUploadCnt() {
		return uploadCnt;
	}

	public void setUploadCnt(int uploadCnt) {
		this.uploadCnt = uploadCnt;
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
