package com.codyy.oc.statistic.bigscreen.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

/**
 *
 * @author robot
 */
@Service
public class StatisticDataService {
	@Autowired
	private HttpServletRequest request;

	public void saveDataToFile(String bigScreen, String block, String areaCode, String data) {
		String path = this.getFilePath(bigScreen, areaCode);
		File file = new File(path);
		if (!file.exists()) {
			file.mkdirs();
		}

		String fileName = this.getFileName(bigScreen, block, areaCode);
		writeData(new File(path, fileName), data);
	}

	public String readDataFromFile(String bigScreen, String block, String areaCode) {
		String path = this.getFilePath(bigScreen, areaCode);
		String fileName = this.getFileName(bigScreen, block, areaCode);
		File file = new File(path, fileName);
		if (!file.exists()) {
			return "";
		}
		return readData(file);
	}

	public String readDataOrTemplateFromFile(String bigScreen, String block, String areaCode) {
		String path = this.getFilePath(bigScreen, areaCode);
		String fileName = this.getFileName(bigScreen, block, areaCode);

		File file = new File(path, fileName);
		if (!file.exists()) {
			path = this.getTemplateFilePath(bigScreen);
			fileName = this.getFileNameWithoutCode(bigScreen, block);

			file = new File(path, fileName);
		}
		return readData(file);
	}

	public String readRemarksDataFromFile(String bigScreen, String block) {
		String path = this.getRemarksFilePath(bigScreen);
		String fileName = this.getFileNameWithoutCode(bigScreen, block);

		File file = new File(path, fileName);
		return readData(file);
	}

	private String readData(File file) {
		StringBuilder data = new StringBuilder();
		String str;
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF8"));
			while ((str = reader.readLine()) != null) {
				data.append(str);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (reader != null) {
					reader.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return data.toString();
	}

	private void writeData(File file, String data) {
		BufferedWriter writer = null;
		try {
			writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file), "UTF8"));
			writer.write(data);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (writer != null) {
					writer.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	private String getFilePath(String bigScreen, String areaCode) {
		String root = getStatisticDataRoot();
		return root + File.separator + bigScreen + File.separator + areaCode;
	}

	private String getTemplateFilePath(String bigScreen) {
		String root = getStatisticDataRoot();
		return root + File.separator + "template" + File.separator + bigScreen;
	}

	private String getRemarksFilePath(String bigScreen) {
		String root = getStatisticDataRoot();
		return root + File.separator + "template" + File.separator + bigScreen + File.separator + "remarks";
	}

	private String getFileName(String bigScreen, String block, String areaCode) {
		return bigScreen + "_" + block + "_" + areaCode + ".json";
	}

	private String getFileNameWithoutCode(String bigScreen, String block) {
		return bigScreen + "_" + block + ".json";
	}

	private String getStatisticDataRoot() {
		return request.getServletContext().getRealPath("/WEB-INF/resource/staticdata");
	}
}
