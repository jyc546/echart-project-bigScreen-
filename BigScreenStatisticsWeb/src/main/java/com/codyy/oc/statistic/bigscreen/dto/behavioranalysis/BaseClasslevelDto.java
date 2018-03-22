package com.codyy.oc.statistic.bigscreen.dto.behavioranalysis;

import java.util.List;

/**
 * (暂用，后期真实数据修改结构)
 * @author robot
 */
public class BaseClasslevelDto {
	private String baseClasslevelId;
	private String classlevelName;
	private List<BaseSubjectDto> subjects;

	public String getBaseClasslevelId() {
		return baseClasslevelId;
	}

	public void setBaseClasslevelId(String baseClasslevelId) {
		this.baseClasslevelId = baseClasslevelId;
	}

	public String getClasslevelName() {
		return classlevelName;
	}

	public void setClasslevelName(String classlevelName) {
		this.classlevelName = classlevelName;
	}

	public List<BaseSubjectDto> getSubjects() {
		return subjects;
	}

	public void setSubjects(List<BaseSubjectDto> subjects) {
		this.subjects = subjects;
	}
}
