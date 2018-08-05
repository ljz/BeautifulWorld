package com.game.beauty.demo.resources;

import com.game.beauty.demo.dao.MySQLDao;
import com.game.beauty.demo.log.LogUtil;
import com.game.beauty.demo.model.ImageUrl;
import com.game.beauty.demo.model.ProfileUrl;
import com.game.beauty.demo.scope.ScopeConfig;
import com.game.beauty.demo.service.CommonService;
import com.game.beauty.demo.util.ImageJsonUtil;
import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.BasicConfigurator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@SpringBootApplication
public class BeautyDemo {
    @Resource
    private MySQLDao mySQLDao;
    @Resource
    private CommonService commonService;

    @RequestMapping("/")
    public String index() {
        return "Hello Spring Boot";
    }

    @RequestMapping(value="/crawler/upload/url", method=RequestMethod.POST)
    public String crawlerUploadUrl(@RequestParam(name="image_url", defaultValue = "", required = true) String imageUrl,
                                   @RequestParam(name="profile_url", defaultValue = "", required = false) String profileUrl) {
        try {
            if (StringUtils.isBlank(imageUrl) || StringUtils.isBlank(profileUrl)) { return "false"; }
            long id = commonService.getUuid();
            ImageUrl imageUrlEntity = new ImageUrl(id, imageUrl);
            ProfileUrl profileUrlEntity = new ProfileUrl(id, profileUrl);
            mySQLDao.insertImageUrl(imageUrlEntity);
            mySQLDao.insertProfileUrl(profileUrlEntity);

            Map<Long, ImageUrl> imageUrlMap = Maps.newHashMap();
            imageUrlMap.put(id, imageUrlEntity);
            Map<Long, ProfileUrl> profileUrlMap = Maps.newHashMap();
            profileUrlMap.put(id, profileUrlEntity);
            return ImageJsonUtil.getInsertUrlJson(new long[]{id}, imageUrlMap, profileUrlMap);
        } catch (Exception e) {
            LogUtil.error("BeautyDemo getImageUrl failed:", e);
        }

        return ImageJsonUtil.getInsertUrlJson(null, null, null);
    }

    @RequestMapping(value="/get/image/urls", method=RequestMethod.GET)
    public String getImageUrls(@RequestParam(name="count", defaultValue = "4", required = true) int count) {
        try {
            List<ImageUrl> imageUrlList = mySQLDao.getRandomImageUrls(count);
            return ImageJsonUtil.getImageUrlsJson(imageUrlList);
        } catch (Exception e) {
            LogUtil.error("BeautyDemo getImageUrl failed:", e);
        }

        return ImageJsonUtil.getImageUrlsJson(null);
    }

    @RequestMapping(value="/get/profile/url", method=RequestMethod.GET)
    public String getProfileUrl(@RequestParam(name="image_id", defaultValue = "0", required = true) long imageId) {
        try {
            List<ProfileUrl> profileUrlList = mySQLDao.getProfileUrls(new long[]{imageId});
            return ImageJsonUtil.getProfileUrlJson(profileUrlList);
        } catch (Exception e) {
            LogUtil.error("BeautyDemo getImageUrl failed:", e);
        }

        return ImageJsonUtil.getProfileUrlJson(null);
    }

    /*
    private FileService fileService;
    private final ResourceLoader resourceLoader = new DefaultResourceLoader();
    private String file_path = "classpath:/files/";    //文件上传的根目录

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
			LogUtil.error("BeautyDemo uploadImage failed:", e);
            throw e;
        }

        return map.toString();
    }

    @RequestMapping(value="/upload", method=RequestMethod.POST)
    public String uploadFile(MultipartFile file) {
        try {
            FileUtils.writeByteArrayToFile(new File(file_path + file.getOriginalFilename()), file.getBytes());
            return "ok";
        } catch (Exception e) {
            LogUtil.error("BeautyDemo uploadImage failed:", e);
            return "wrong";
        }
    }

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

    @RequestMapping(value="/get/image/url", method=RequestMethod.GET)
    public String getImageUrl(@RequestParam(name="score", defaultValue = "5", required = false) int score) {
        try {
            return ImageFiles.getImageUrl();
        } catch (Exception e) {
            LogUtil.error("BeautyDemo getImageUrl failed:", e);
            return "wrong";
        }
    }

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

    private String getFileType(String fileName) {
        if(fileName!=null && fileName.indexOf(".")>=0) {
            return fileName.substring(fileName.lastIndexOf("."), fileName.length());
        }
        return "";
    }*/

	public static void main(String[] args) {
        SpringApplication.run(new Class[]{BeautyDemo.class, ScopeConfig.class}, args);
        BasicConfigurator.configure(); // log4j 初始化
    }
}
