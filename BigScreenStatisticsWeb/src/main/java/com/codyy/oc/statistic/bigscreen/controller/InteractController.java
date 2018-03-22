package com.codyy.oc.statistic.bigscreen.controller;

import com.codyy.oc.commons.vo.ReturnVo;
import com.codyy.oc.base.controller.BaseController;
import com.codyy.oc.statistic.bigscreen.dto.interact.ActiveSchoolDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.ActiveTeacherDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.GeneralDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.InteractClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.InteractSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.InteractTrendDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.LessonClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.LessonSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.StatusDataDto;
import com.codyy.oc.statistic.bigscreen.dto.interact.SubAreaDto;
import com.codyy.oc.statistic.bigscreen.service.InteractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 互动教研
 * @author robot
 */
@RequestMapping("/bigscreen/interact")
public class InteractController extends BaseController {
	@Autowired
	private InteractService interactService;

	/**
	 * 互动教研整体情况
	 * @param areaCode 区域编码
	 * @return 互动教研整体情况数据
	 */
	@RequestMapping("/generaldata")
	@ResponseBody
	public ReturnVo<GeneralDto> getGeneralData(String areaCode) {
		ReturnVo<GeneralDto> returnVo = new ReturnVo<>();
		GeneralDto generalData = interactService.getGeneralData(areaCode);
		returnVo.setResult(generalData);
		return returnVo;
	}

	/**
	 * 活跃学校
	 * @param areaCode 区域编码
	 * @return 活跃学校列表数据
	 */
	@RequestMapping("/activeschooldata")
	@ResponseBody
	public ReturnVo<List<ActiveSchoolDto>> getActiveSchoolData(String areaCode) {
		ReturnVo<List<ActiveSchoolDto>> returnVo = new ReturnVo<>();
		List<ActiveSchoolDto> activeSchools = interactService.getActiveSchoolData(areaCode);
		returnVo.setResult(activeSchools);
		return returnVo;
	}

	/**
	 * 活跃教师
	 * @param areaCode 区域编码
	 * @return 活跃教师列表数据
	 */
	@RequestMapping("/activeteacherdata")
	@ResponseBody
	public ReturnVo<List<ActiveTeacherDto>> getActiveTeacherData(String areaCode) {
		ReturnVo<List<ActiveTeacherDto>> returnVo = new ReturnVo<>();
		List<ActiveTeacherDto> activeSchools = interactService.getActiveTeacherData(areaCode);
		returnVo.setResult(activeSchools);
		return returnVo;
	}

	/**
	 * 行政区教研数据统计
	 * @param areaCode 区域编码
	 * @return 行政区教研数据
	 */
	@RequestMapping("/subareadata")
	@ResponseBody
	public ReturnVo<List<SubAreaDto>> getSubAreaData(String areaCode) {
		ReturnVo<List<SubAreaDto>> returnVo = new ReturnVo<>();
		List<SubAreaDto> activeSchools = interactService.getSubAreaData(areaCode);
		returnVo.setResult(activeSchools);
		return returnVo;
	}

	/**
	 * 教研统计趋势图
	 * @param areaCode 区域编码
	 * @param year 年份
	 * @return 教研统计趋势图数据
	 */
	@RequestMapping("/trendstaticdata")
	@ResponseBody
	public ReturnVo<InteractTrendDto> getTrendStaticData(String areaCode, String year) {
		ReturnVo<InteractTrendDto> returnVo = new ReturnVo<>();
		InteractTrendDto trendData = new InteractTrendDto();
		trendData.setPrepareData(interactService.getPrepareYearData(areaCode, year));
		trendData.setDownloadData(interactService.getDownloadYearData(areaCode, year));
		trendData.setEvaluationData(interactService.getEvaluationYearData(areaCode, year));
		trendData.setUploadData(interactService.getUploadYearData(areaCode, year));
		returnVo.setResult(trendData);
		return returnVo;
	}

	/**
	 * 集体备课评课议课状态
	 * @param areaCode 区域编码
	 * @return 集体备课评课议课状态数据
	 */
	@RequestMapping("/statusdata")
	@ResponseBody
	public ReturnVo<List<StatusDataDto>> getStatusdData(String areaCode) {
		ReturnVo<List<StatusDataDto>> returnVo = new ReturnVo<>();
		List<StatusDataDto> statusDatas = interactService.getStatusdData(areaCode);
		returnVo.setResult(statusDatas);
		return returnVo;
	}

	/**
	 * 教研分布-学科-教案数量
	 * @param areaCode 区域编码
	 * @return 教研分布-学科-教案数量数据
	 */
	@RequestMapping("/lessonsubjectdata")
	@ResponseBody
	public ReturnVo<List<LessonSubjectDto>> getLessonSubjectData(String areaCode) {
		ReturnVo<List<LessonSubjectDto>> returnVo = new ReturnVo<>();
		List<LessonSubjectDto> lessonSubjects = interactService.getLessonSubjectData(areaCode);
		returnVo.setResult(lessonSubjects);
		return returnVo;
	}

	/**
	 * 教研分布-学科-评课议课集体备课
	 * @param areaCode 区域编码
	 * @return 教研分布-学科-评课议课集体备课数据
	 */
	@RequestMapping("/subjectdata")
	@ResponseBody
	public ReturnVo<InteractSubjectDto> getSubjectData(String areaCode) {
		ReturnVo<InteractSubjectDto> returnVo = new ReturnVo<>();
		InteractSubjectDto interactSubject = interactService.getSubjectData(areaCode);
		returnVo.setResult(interactSubject);
		return returnVo;
	}

	/**
	 * 教研分布-年级-教案数量
	 * @param areaCode 区域编码
	 * @return 教研分布-年级-教案数量数据
	 */
	@RequestMapping("/lessonclassleveldata")
	@ResponseBody
	public ReturnVo<List<LessonClasslevelDto>> getLessonClassLevelData(String areaCode) {
		ReturnVo<List<LessonClasslevelDto>> returnVo = new ReturnVo<>();
		List<LessonClasslevelDto> lessonSubjects = interactService.getLessonClassLevelData(areaCode);
		returnVo.setResult(lessonSubjects);
		return returnVo;
	}

	/**
	 * 教研分布-年级-评课议课集体备课
	 * @param areaCode 区域编码
	 * @return 教研分布-年级-评课议课集体备课数据
	 */
	@RequestMapping("/classleveldata")
	@ResponseBody
	public ReturnVo<InteractClasslevelDto> getClassLevelData(String areaCode) {
		ReturnVo<InteractClasslevelDto> returnVo = new ReturnVo<>();
		InteractClasslevelDto interactSubject = interactService.getClassLevelData(areaCode);
		returnVo.setResult(interactSubject);
		return returnVo;
	}
}
