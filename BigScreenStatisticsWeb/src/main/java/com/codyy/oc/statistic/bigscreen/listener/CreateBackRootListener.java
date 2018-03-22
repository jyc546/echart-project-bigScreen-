package com.codyy.oc.statistic.bigscreen.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 *
 * @author robot
 */
public class CreateBackRootListener implements ServletContextListener {
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		String rootPathJsFile = sce.getServletContext().getRealPath("/front/src/js/rootPath.js");
		String path = sce.getServletContext().getContextPath();
		if ("/".equals(path)) {
			path = "";
		}

		BufferedWriter writer = null;
		try {
			writer = new BufferedWriter(new FileWriter(rootPathJsFile));
			writer.write("var BACK_ROOT = \"" + path + "\"");
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (writer != null) {
				try {
					writer.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {

	}
}
