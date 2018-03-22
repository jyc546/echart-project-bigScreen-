package com.codyy.oc.statistic.bigscreen.service;

import com.alibaba.fastjson.JSON;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResAreaDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResGeneralDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResMonthDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResRatioGraphDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResRecentDataDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResSchoolDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResSourceDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResTypeRatioDto;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author robot
 */
public class ResourceService {
    @Autowired
    private StatisticDataService statisticDataService;
    private String bigScreen = "resource";

    /**
     * 资源使用情况
     * @param areaCode 区域编码
     * @return 资源使用情况数据
     */
    public ResRecentDataDto getRecentData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "recent", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ResRecentDataDto();
        }
        return JSON.parseObject(data, ResRecentDataDto.class);
    }

    /**
     * 资源收藏量(按月份)
     * @param areaCode 区域编码
     * @return 资源收藏(按月份)量数据
     */
    public List<ResMonthDto> getCollectionYearData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "collectioncnt", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResMonthDto.class);
    }

    /**
     * 资源录制量(按月份)
     * @param areaCode 区域编码
     * @return 资源录制量(按月份)数据
     */
    public List<ResMonthDto> getDailyYearData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "dailyrescnt", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResMonthDto.class);
    }

    /**
     * 资源下载量(按月份)
     * @param areaCode 区域编码
     * @return 资源下载量(按月份)数据
     */
    public List<ResMonthDto> getDownloadYearData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "downloadcnt", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResMonthDto.class);
    }

    /**
     * 资源上传量(按月份)
     * @param areaCode 区域编码
     * @return 资源上传量(按月份)数据
     */
    public List<ResMonthDto> getUploadYearData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "uploadcnt", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResMonthDto.class);
    }

    /**
     * 资源浏览量(按月份)
     * @param areaCode 区域编码
     * @return 资源浏览量(按月份)数据
     */
    public List<ResMonthDto> getViewYearData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "viewcnt", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResMonthDto.class);
    }

    /**
     * 按浏览量查询资源类型比例
     * @param areaCode 区域编码
     * @return 资源类型比例数据
     */
    public List<ResRatioGraphDto> getDownloadResTypeData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "downloadratio", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResRatioGraphDto.class);
    }

    /**
     * 按收藏量查询资源类型比例
     * @param areaCode 区域编码
     * @return 资源类型比例数据
     */
    public List<ResRatioGraphDto> getCollectionResTypeData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "collectionratio", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResRatioGraphDto.class);
    }

    /**
     * 按浏览量查询资源类型比例
     * @param areaCode 区域编码
     * @return 资源类型比例数据
     */
    public List<ResRatioGraphDto> getViewResTypeData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "viewratio", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResRatioGraphDto.class);
    }

    /**
     * 按评论量查询资源类型比例
     * @param areaCode 区域编码
     * @return 资源类型比例数据
     */
    public List<ResRatioGraphDto> getCommentResTypeData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "commentratio", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResRatioGraphDto.class);
    }

    public ResGeneralDto getGeneralData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "general", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ResGeneralDto();
        }
        return JSON.parseObject(data, ResGeneralDto.class);
    }

    public List<ResSubjectDto> getSubjectData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "subject", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResSubjectDto.class);
    }

    public List<ResTypeRatioDto> getResourceRatioData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "resourceratio", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResTypeRatioDto.class);
    }

    public List<ResSourceDto> getSourceData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "source", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResSourceDto.class);
    }

    /**
     * 获取子区域上传的资源数量
     * @param areaCode 父区域编码
     * @return 子区域上传的资源数量
     */
    public List<ResAreaDto> getSubAreaUploadResCount(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "subareaupload", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResAreaDto.class);
    }

    /**
     * 获取子区域资源被下载数量
     * @param areaCode 父区域编码
     * @return 子区域资源被下载数量
     */
    public List<ResAreaDto> getSubAreaDownloadedResCount(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "subareadownload", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResAreaDto.class);
    }

    /**
     * 获取子区域录制的资源数量
     * @param areaCode 父区域编码
     * @return 子区域录制的资源数量
     */
    public List<ResAreaDto> getSubAreaDailyResCount(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "subareadaily", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResAreaDto.class);
    }

    /**
     * 获取子区域资源被收藏数量
     * @param areaCode 父区域编码
     * @return 子区域资源被收藏数量
     */
    public List<ResAreaDto> getSubAreaCollectionedResCount(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "subareacollection", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResAreaDto.class);
    }

    /**
     * 获取子区域资源被浏览数量
     * @param areaCode 父区域编码
     * @return 子区域资源被浏览数量
     */
    public List<ResAreaDto> getSubAreaViewedResCount(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "subareaview", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResAreaDto.class);
    }

    /**
     * 资源年级分数据
     * @param areaCode 区域编码
     * @return 资源年级分数据
     */
    public List<ResClasslevelDto> getResClasslevelData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "classlevel", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResClasslevelDto.class);
    }

    /**
     * 资源学校分数据
     * @param areaCode 区域编码
     * @return 资源学校分数据
     */
    public List<ResSchoolDto> getResSchoolData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "school", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return JSON.parseArray(data, ResSchoolDto.class);
    }
}
