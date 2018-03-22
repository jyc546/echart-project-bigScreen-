package com.codyy.oc.statistic.bigscreen.dto.interact;

import java.util.List;

/**
 * 教研统计趋势
 * @author robot
 */
public class InteractTrendDto {
	/**
	 * 下载量
	 */
	private List<LessonMonthDto> downloadData;
	/**
	 * 评课议课
	 */
	private List<LessonMonthDto> evaluationData;
	/**
	 * 集体备课
	 */
	private List<LessonMonthDto> prepareData;
	/**
	 * 上传量
	 */
	private List<LessonMonthDto> uploadData;

	public List<LessonMonthDto> getDownloadData() {
		return downloadData;
	}

	public void setDownloadData(List<LessonMonthDto> downloadData) {
		this.downloadData = downloadData;
	}

	public List<LessonMonthDto> getEvaluationData() {
		return evaluationData;
	}

	public void setEvaluationData(List<LessonMonthDto> evaluationData) {
		this.evaluationData = evaluationData;
	}

	public List<LessonMonthDto> getPrepareData() {
		return prepareData;
	}

	public void setPrepareData(List<LessonMonthDto> prepareData) {
		this.prepareData = prepareData;
	}

	public List<LessonMonthDto> getUploadData() {
		return uploadData;
	}

	public void setUploadData(List<LessonMonthDto> uploadData) {
		this.uploadData = uploadData;
	}
}
