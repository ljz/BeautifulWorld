package com.game.beauty.demo.service;

import java.io.FileOutputStream;
import java.io.InputStream;

public interface FileService {
	boolean saveImage(InputStream inputStream, String imageFileName);
	byte[] loadImage(String imageFileName);
}
