package com.codyy.oc.statistic.bigscreen.dto.resource;

import java.util.List;

/**
 *
 * @author robot
 */
public class ResSubAreaDataDto {
	/**
	 * 收藏量
	 */
	private List<ResAreaDto> collectionData;
	/**
	 * 录制量
	 */
	private List<ResAreaDto> dailyData;
	/**
	 * 下载量
	 */
	private List<ResAreaDto> downloadData;
	/**
	 * 上传量
	 */
	private List<ResAreaDto> uploadData;
	/**
	 * 浏览量
	 */
	private List<ResAreaDto> viewData;

	public List<ResAreaDto> getCollectionData() {
		return collectionData;
	}

	public void setCollectionData(List<ResAreaDto> collectionData) {
		this.collectionData = collectionData;
	}

	public List<ResAreaDto> getDailyData() {
		return dailyData;
	}

	public void setDailyData(List<ResAreaDto> dailyData) {
		this.dailyData = dailyData;
	}

	public List<ResAreaDto> getDownloadData() {
		return downloadData;
	}

	public void setDownloadData(List<ResAreaDto> downloadData) {
		this.downloadData = downloadData;
	}

	public List<ResAreaDto> getUploadData() {
		return uploadData;
	}

	public void setUploadData(List<ResAreaDto> uploadData) {
		this.uploadData = uploadData;
	}

	public List<ResAreaDto> getViewData() {
		return viewData;
	}

	public void setViewData(List<ResAreaDto> viewData) {
		this.viewData = viewData;
	}
}
