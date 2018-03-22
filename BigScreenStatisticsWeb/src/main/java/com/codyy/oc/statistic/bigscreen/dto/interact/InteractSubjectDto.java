package com.codyy.oc.statistic.bigscreen.dto.interact;

import java.util.ArrayList;
import java.util.List;

/**
 * 教研分布-学科-集体备课互动听课
 * @author robot
 */
public class InteractSubjectDto {
	/**
	 * 评课议课
	 */
	private List<LessonSubjectDto> evaluations = new ArrayList<>();
	/**
	 * 集体备课
	 */
	private List<LessonSubjectDto> prepares = new ArrayList<>();

	public List<LessonSubjectDto> getEvaluations() {
		return evaluations;
	}

	public void setEvaluations(List<LessonSubjectDto> evaluations) {
		this.evaluations = evaluations;
	}

	public List<LessonSubjectDto> getPrepares() {
		return prepares;
	}

	public void setPrepares(List<LessonSubjectDto> prepares) {
		this.prepares = prepares;
	}
}
