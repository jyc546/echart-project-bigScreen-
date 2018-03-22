package com.codyy.oc.statistic.bigscreen.dto.resource;

/**
 *
 * @author robot
 */
public class ResRatioGraphDto {
	/**
	 * 数量
	 */
	private int count;
	/**
	 * 学生使用率
	 */
	private int studentUseRatio;
	/**
	 * 教师使用率
	 */
	private int teacherUseRatio;
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

	public int getStudentUseRatio() {
		return studentUseRatio;
	}

	public void setStudentUseRatio(int studentUseRatio) {
		this.studentUseRatio = studentUseRatio;
	}

	public int getTeacherUseRatio() {
		return teacherUseRatio;
	}

	public void setTeacherUseRatio(int teacherUseRatio) {
		this.teacherUseRatio = teacherUseRatio;
	}

	public String getResourceType() {
		return resourceType;
	}

	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
}
