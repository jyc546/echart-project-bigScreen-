package com.codyy.oc.statistic.bigscreen.dto.resource;

import java.util.List;

/**
 *
 * @author robot
 */
public class ResCurveGraphDto {
	/**
	 * 收藏量
	 */
	private List<ResMonthDto> collectionData;
	/**
	 * 录制量
	 */
	private List<ResMonthDto> dailyData;
	/**
	 * 下载量
	 */
	private List<ResMonthDto> downloadData;
	/**
	 * 上传量
	 */
	private List<ResMonthDto> uploadData;
	/**
	 * 浏览量
	 */
	private List<ResMonthDto> viewData;

	public List<ResMonthDto> getCollectionData() {
		return collectionData;
	}

	public void setCollectionData(List<ResMonthDto> collectionData) {
		this.collectionData = collectionData;
	}

	public List<ResMonthDto> getDailyData() {
		return dailyData;
	}

	public void setDailyData(List<ResMonthDto> dailyData) {
		this.dailyData = dailyData;
	}

	public List<ResMonthDto> getDownloadData() {
		return downloadData;
	}

	public void setDownloadData(List<ResMonthDto> downloadData) {
		this.downloadData = downloadData;
	}

	public List<ResMonthDto> getUploadData() {
		return uploadData;
	}

	public void setUploadData(List<ResMonthDto> uploadData) {
		this.uploadData = uploadData;
	}

	public List<ResMonthDto> getViewData() {
		return viewData;
	}

	public void setViewData(List<ResMonthDto> viewData) {
		this.viewData = viewData;
	}
}
