package com.codyy.oc.statistic.bigscreen.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.codyy.oc.statistic.bigscreen.dto.interact.ActiveSchoolDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.ActiveTeacherDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.GeneralDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.InteractClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.InteractSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.LessonClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.LessonMonthDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.LessonSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.StatusDataDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.SubAreaDto;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import static com.alibaba.fastjson.JSON.parseObject;


/**
 *
 * @author robot
 */
@Service
public class InteractService {
	@Autowired
	private StatisticDataService statisticDataService;
	private String bigScreen = "interact";

	/**
	 * 互动教研整体情况
	 * @param areaCode 区域编码
	 * @return 互动教研整体情况数据
	 */
	public GeneralDto getGeneralData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "general", areaCode);
		if(StringUtils.isBlank(data)) {
			return new GeneralDto();
		}
		return parseObject(data, GeneralDto.class);
	}

	/**
	 * 活跃学校
	 * @param areaCode 区域编码
	 * @return 活跃学校列表数据
	 */
	public List<ActiveSchoolDto> getActiveSchoolData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "activeschool", areaCode);
		List<ActiveSchoolDto> activeSchools = JSONArray.parseArray(data, ActiveSchoolDto.class);
		if (CollectionUtils.isEmpty(activeSchools)) {
			return new ArrayList<>();
		}
		// sort
		int totalCnt;
		for (ActiveSchoolDto activeSchool : activeSchools) {
			totalCnt = activeSchool.getLessonCnt() + activeSchool.getEvaluationLessonCnt() + activeSchool.getPrepareLessonCnt();
			activeSchool.setTotalCnt(totalCnt);
		}

		Collections.sort(activeSchools, new Comparator<ActiveSchoolDto>() {
			@Override
			public int compare(ActiveSchoolDto o1, ActiveSchoolDto o2) {
				return o1.getTotalCnt() < o2.getTotalCnt() ? 1 : -1;
			}
		});
		return activeSchools;
	}

	/**
	 * 活跃教师
	 * @param areaCode 区域编码
	 * @return 活跃教师列表数据
	 */
	public List<ActiveTeacherDto> getActiveTeacherData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "activeteacher", areaCode);
		List<ActiveTeacherDto> activeTeachers = JSONArray.parseArray(data, ActiveTeacherDto.class);
		if (CollectionUtils.isEmpty(activeTeachers)) {
			return new ArrayList<>();
		}

		// sort
		int totalCnt;
		for (ActiveTeacherDto activeTeacher : activeTeachers) {
			totalCnt = activeTeacher.getLessonCnt() + activeTeacher.getEvaluationLessonCnt() + activeTeacher.getPrepareLessonCnt();
			activeTeacher.setTotalCnt(totalCnt);
		}

		Collections.sort(activeTeachers, new Comparator<ActiveTeacherDto>() {
			@Override
			public int compare(ActiveTeacherDto o1, ActiveTeacherDto o2) {
				return o1.getTotalCnt() < o2.getTotalCnt() ? 1 : -1;
			}
		});
		return activeTeachers;
	}

	/**
	 * 行政区教研数据统计
	 * @param areaCode 区域编码
	 * @return 行政区教研数据
	 */
	public List<SubAreaDto> getSubAreaData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "subarea", areaCode);
		List<SubAreaDto> subAreas = JSONArray.parseArray(data, SubAreaDto.class);
		if (CollectionUtils.isEmpty(subAreas)) {
			return new ArrayList<>();
		}

		// sort
		Collections.sort(subAreas, new Comparator<SubAreaDto>() {
			@Override
			public int compare(SubAreaDto o1, SubAreaDto o2) {
				return o1.getAcvitityCnt() + o1.getLessonCnt() < o2.getAcvitityCnt() + o2.getLessonCnt() ? 1 : -1;
			}
		});
		return subAreas;
	}

	/**
	 * 集体备课年份数据
	 * @param areaCode 区域编码
	 * @param year 年份
	 * @return 集体备课年份数据
	 */
	public List<LessonMonthDto> getPrepareYearData(String areaCode, String year) {
		String data = statisticDataService.readDataFromFile(bigScreen, "prepareyear", areaCode);
		if (StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		Map allPrepareYearData = parseObject(data, Map.class);
		return (List<LessonMonthDto>) allPrepareYearData.get(year);
	}

	/**
	 * 教案下载年份数据
	 * @param areaCode 区域编码
	 * @param year 年份
	 * @return 教案下载年份数据
	 */
	public List<LessonMonthDto> getDownloadYearData(String areaCode, String year) {
		String data = statisticDataService.readDataFromFile(bigScreen, "downloadyear", areaCode);
		if (StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		Map allPrepareYearData = parseObject(data, Map.class);
		return (List<LessonMonthDto>) allPrepareYearData.get(year);
	}

	/**
	 * 评课议课年份数据
	 * @param areaCode 区域编码
	 * @param year 年份
	 * @return 评课议课年份数据
	 */
	public List<LessonMonthDto> getEvaluationYearData(String areaCode, String year) {
		String data = statisticDataService.readDataFromFile(bigScreen, "evaluationyear", areaCode);
		if (StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		Map allPrepareYearData = parseObject(data, Map.class);
		return (List<LessonMonthDto>) allPrepareYearData.get(year);
	}

	/**
	 * 教案上传年份数据
	 * @param areaCode 区域编码
	 * @param year 年份
	 * @return 教案上传年份数据
	 */
	public List<LessonMonthDto> getUploadYearData(String areaCode, String year) {
		String data = statisticDataService.readDataFromFile(bigScreen, "lessonyear", areaCode);
		if (StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		Map allPrepareYearData = parseObject(data, Map.class);
		return (List<LessonMonthDto>) allPrepareYearData.get(year);
	}

	public List<StatusDataDto> getStatusdData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "status", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		return JSON.parseArray(data, StatusDataDto.class);
	}

	public List<LessonSubjectDto> getLessonSubjectData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "lessonsubject", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		return JSONArray.parseArray(data, LessonSubjectDto.class);
	}

	public InteractSubjectDto getSubjectData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "subject", areaCode);
		if(StringUtils.isBlank(data)) {
			return new InteractSubjectDto();
		}
		return parseObject(data, InteractSubjectDto.class);
	}

	public List<LessonClasslevelDto> getLessonClassLevelData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "lessonclasslevel", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		return JSONArray.parseArray(data, LessonClasslevelDto.class);
	}

	public InteractClasslevelDto getClassLevelData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "classlevel", areaCode);
		if(StringUtils.isBlank(data)) {
			return new InteractClasslevelDto();
		}
		return parseObject(data, InteractClasslevelDto.class);
	}
}
