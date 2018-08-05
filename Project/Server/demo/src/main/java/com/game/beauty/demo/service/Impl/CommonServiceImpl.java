package com.game.beauty.demo.service.Impl;

import com.game.beauty.demo.log.LogUtil;
import com.game.beauty.demo.service.CommonService;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

@Service("commonService")
public class CommonServiceImpl implements CommonService {
    private static final CloseableHttpClient httpclient = HttpClients.createDefault();

    @Override
    public long getUuid() {
        try {
            HttpGet httpGet = new HttpGet("http://154.8.151.240:8100/getuuid");
            // System.out.println("Executing request " + httpGet.getRequestLine());

            ResponseHandler<String> responseHandler = response -> {
                int status = response.getStatusLine().getStatusCode();
                if (status >= 200 && status < 300) {
                    HttpEntity entity = response.getEntity();
                    return entity != null ? EntityUtils.toString(entity) : null;
                } else {
                    throw new ClientProtocolException("Unexpected response status: " + status);
                }
            };
            String responseBody = httpclient.execute(httpGet, responseHandler);
            return Long.valueOf(responseBody);
            // System.out.println("----------------------------------------");
            // System.out.println(responseBody);
        } catch (Exception e) {
            LogUtil.error("[CommonService] getUuid error", e);
        }

        return 0L;
    }
}
