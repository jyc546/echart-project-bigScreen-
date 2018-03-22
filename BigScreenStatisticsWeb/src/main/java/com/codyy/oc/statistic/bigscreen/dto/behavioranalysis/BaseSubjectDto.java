package com.codyy.oc.statistic.bigscreen.dto.behavioranalysis;

import java.util.List;

/**
 * (暂用，后期真实数据修改结构)
 * @author robot
 */
public class BaseSubjectDto {
	private String baseSubjectId;
	private String subjectName;
    private List<BaseKnowledgeDto> knowledges;

	public String getBaseSubjectId() {
		return baseSubjectId;
	}

	public void setBaseSubjectId(String baseSubjectId) {
		this.baseSubjectId = baseSubjectId;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}

    public List<BaseKnowledgeDto> getKnowledges() {
        return knowledges;
    }

    public void setKnowledges(List<BaseKnowledgeDto> knowledges) {
        this.knowledges = knowledges;
    }
}
