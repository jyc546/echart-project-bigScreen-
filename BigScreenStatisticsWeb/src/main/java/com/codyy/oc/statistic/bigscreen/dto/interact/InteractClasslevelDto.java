package com.codyy.oc.statistic.bigscreen.dto.interact;

import java.util.ArrayList;
import java.util.List;

/**
 * 教研分布-年级-集体备课互动听课
 * @author robot
 */
public class InteractClasslevelDto {
	/**
	 * 评课议课
	 */
	private List<LessonClasslevelDto> evaluations = new ArrayList<>();
	/**
	 * 集体备课
	 */
	private List<LessonClasslevelDto> prepares= new ArrayList<>();

	public List<LessonClasslevelDto> getEvaluations() {
		return evaluations;
	}

	public void setEvaluations(List<LessonClasslevelDto> evaluations) {
		this.evaluations = evaluations;
	}

	public List<LessonClasslevelDto> getPrepares() {
		return prepares;
	}

	public void setPrepares(List<LessonClasslevelDto> prepares) {
		this.prepares = prepares;
	}
}
