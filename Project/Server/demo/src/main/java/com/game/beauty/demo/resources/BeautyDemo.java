package com.game.beauty.demo.resources;

import com.game.beauty.demo.log.LogUtil;
import com.game.beauty.demo.scope.ScopeConfig;
import com.game.beauty.demo.service.FileService;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.BasicConfigurator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
@SpringBootApplication
public class BeautyDemo {
	@Resource
	private FileService fileService;

    private final ResourceLoader resourceLoader = new DefaultResourceLoader();

    private String file_path = "/Users/erming/IdeaProjects/demo/files/";    //文件上传的根目录

    @RequestMapping("/")
    String index() {
        return "Hello Spring Boot";
    }

    @RequestMapping(value = "uploadImage", method = RequestMethod.POST)
    public String uploadImage(@RequestParam("pic") MultipartFile[] imageFiles) throws IOException {
        Map<String, Object> map = new HashMap<>();
        map.put("errno", 0);
		map.put("data", null);

        try {
            if (imageFiles != null && imageFiles.length > 0){
                String[] strings = new String[imageFiles.length];
                int i = 0;
                for (MultipartFile imageFile : imageFiles) {
                    String fileName = imageFile.getOriginalFilename();
                    if (StringUtils.isNotBlank(fileName) && isImageFile(fileName)){
                        //String saveFilename = UUID.randomUUID().toString() + getFileType(fileName);
						fileService.saveImage(imageFile.getInputStream(), fileName);
						LogUtil.info("BeautyDemo uploadImage success:" + fileName);

                        //File outFile = new File(file_path + fileName);
                        //imageFile.transferTo(outFile);
                        strings[i] = "/download/" + fileName;
                        i++;
                    }
                }
                map.put("data", Arrays.asList(strings).toString());
            } else {
                map.put("errno", 1);
            }
        } catch (Exception e) {
            map.put("errno", 1);
			LogUtil.info("BeautyDemo uploadImage failed:", e);
            throw e;
        }

        return map.toString();
    }

    /*// @RequestMapping(method = RequestMethod.GET, value = "downloadImage/{filename:.+}")
    @RequestMapping(value = "showImage", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> showImage(@RequestParam("pic") String pic){
        try {
            String path = Paths.get(file_path, pic).toString();
			FileOutputStream fileOutputStream = fileService.loadImage(pic);
            Resource resource = resourceLoader.getResource("file:" + path);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(fileOutputStream);
        } catch (Exception e) {
            throw e;
        }
    }*/

	// @RequestMapping(method = RequestMethod.GET, value = "downloadImage/{filename:.+}")
	@RequestMapping(value = "showImage", method = RequestMethod.GET)
	@ResponseBody
	public  ResponseEntity<?> showImage(@RequestParam("pic") String pic, HttpServletResponse response){
		try {
            byte[] imageBytes = fileService.loadImage(pic);
            LogUtil.info("loadImage success");

            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
		} catch (Exception e) {
			throw e;
		}
	}

    @RequestMapping(value = "downloadImage", method = RequestMethod.GET)
    public void downloadImage(@RequestParam("pic") String pic, HttpServletRequest request, HttpServletResponse response) throws IOException{
        try {
            FileInputStream hFile=new FileInputStream(file_path + pic);
            int i=hFile.available();
            byte data[]=new byte[i];
            hFile.read(data);
            hFile.close();
            response.setContentType("image/*");
            OutputStream toClient=response.getOutputStream();
            toClient.write(data);
            toClient.close();
        }catch (IOException e){
            PrintWriter toClient=response.getWriter();
            response.setContentType("text/html;charset=gb2312");
            toClient.write("无法打开图片");
            toClient.close();
        }


    }

    /**
     * 判断文件是否为图片
     * @param fileName
     * @return
     */
    private boolean isImageFile(String fileName){
        String[] img_type = new String[]{".jpg",".jpeg", ".png", ".gif", ".bmp"};
        if (StringUtils.isBlank(fileName)){
            return false;
        }
        fileName = fileName.toLowerCase();

        for (String type : img_type){
            if (fileName.endsWith(type)){
                return true;
            }
        }

        return false;
    }

    /**
     * 获取文件后缀名
     * @param fileName
     * @return
     */
    private String getFileType(String fileName) {
        if(fileName!=null && fileName.indexOf(".")>=0) {
            return fileName.substring(fileName.lastIndexOf("."), fileName.length());
        }
        return "";
    }

	public static void main(String[] args) {
        ConfigurableApplicationContext configurableApplicationContext = SpringApplication.run(new Class[]{BeautyDemo.class, ScopeConfig.class}, args);
        BasicConfigurator.configure();
    }
}
