package com.game.beauty.demo.service.Impl;

import com.game.beauty.demo.dao.MongodbDao;
import com.game.beauty.demo.log.LogUtil;
import com.game.beauty.demo.service.FileService;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import org.bson.types.ObjectId;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.InputStream;

@Service("fileService")
@Scope("singleton")
@PropertySource(value={"classpath:application.properties"}, encoding="utf-8")
public class FileServiceImpl implements FileService {
	@Resource
	private MongodbDao mongodbDao;

	@Override
	public boolean saveImage(InputStream inputStream, String pictureName) {
		if (mongodbDao == null) {
			return false;
		}

		GridFSBucket gridFSBucket = GridFSBuckets.create(mongodbDao.getMongoDatabase());
		ObjectId fileId = gridFSBucket.uploadFromStream(pictureName, inputStream);
		LogUtil.info(fileId.toHexString() + " " + fileId.toString());
		System.out.println("fileId: " + fileId.toHexString() + ", " + fileId.toString());

		return true;
	}

	@Override
	public byte[] loadImage(String pictureName) {
		if (mongodbDao == null) {
			return null;
		}


		try {
			GridFSBucket gridFSBucket = GridFSBuckets.create(mongodbDao.getMongoDatabase());
			GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(pictureName);
			int fileLength = (int) downloadStream.getGridFSFile().getLength();
			byte[] bytesToWriteTo = new byte[fileLength];
			downloadStream.read(bytesToWriteTo);
			downloadStream.close();

			return bytesToWriteTo;
		} catch (Exception e) {
			LogUtil.error("MongodbDaoImpl loadImage failed:", e);
			return null;
		}
	}
}
