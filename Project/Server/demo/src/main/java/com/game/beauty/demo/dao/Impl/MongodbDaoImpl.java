package com.game.beauty.demo.dao.Impl;

import com.game.beauty.demo.dao.MongodbDao;
import com.game.beauty.demo.log.LogUtil;
import com.google.common.collect.Lists;
import com.mongodb.Block;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.connection.ClusterSettings;
import com.mongodb.connection.ConnectionPoolSettings;
import com.mongodb.connection.SocketSettings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service("mongodbDao")
@Scope("singleton")
@PropertySource(value={"classpath:application.properties"}, encoding="utf-8")
public class MongodbDaoImpl implements MongodbDao {
	/**
	 * private fields
	 */
	private MongoClient mongoClient;
	private MongoDatabase mongoDatabase;
	private MongoCollection mongoCollection;

	/**
	 * Cluster settings
	 */
	@Value("${dao.mongodb.host}")
	private String mongodbHost;
	@Value("${dao.mongodb.port}")
	private int mongodbPort;
	@Value("${dao.mongodb.database}")
	private String mongodbName;
	@Value("${dao.mongodb.database.collection}")
	private String mongodbCollectionName;

	/**
	 * Connectionpool settings
	 */
	@Value("${dao.mongodb.connectionpool.min.size}")
	private int connectionPoolMinSize;
	@Value("${dao.mongodb.connectionpool.max.size}")
	private int connectionPoolMaxSize;
	@Value("${dao.mongodb.connectionpool.max.wait.queue.size}")
	private int maxWaitQueueSize;
	@Value("${dao.mongodb.connectionpool.max.wait.time}")
	private long maxWaitTimeMS;
	@Value("${dao.mongodb.connectionpool.max.connection.life.time}")
	private long maxConnectionLifeTimeMS;
	@Value("${dao.mongodb.connectionpool.max.connection.idle.time}")
	private long maxConnectionIdleTimeMS;

	/**
	 * Socket settings
	 */
	@Value("${dao.mongodb.socket.connect.timeout}")
	private int connectTimeoutMS;
	@Value("${dao.mongodb.socket.read.timeout}")
	private int readTimeoutMS;
	@Value("${dao.mongodb.socket.receive.buffer.size}")
	private int receiveBufferSize;
	@Value("${dao.mongodb.socket.send.buffer.size}")
	private int sendBufferSize;

	/**
	 * create mongodb client with configured setting
	 */
	@PostConstruct
	public void init() {
		try {
			List<ServerAddress> serverAddressList = Lists.newArrayList(new ServerAddress(mongodbHost,mongodbPort));
			Block<ClusterSettings.Builder> clusterSettings = builder -> builder.hosts(serverAddressList).build();

			Block<ConnectionPoolSettings.Builder> connectionPoolSettings = builder -> builder
					.maxSize(connectionPoolMaxSize).minSize(connectionPoolMinSize)
					.maxWaitQueueSize(maxWaitQueueSize).maxWaitTime(maxWaitTimeMS, TimeUnit.MILLISECONDS)
					.maxConnectionLifeTime(maxConnectionLifeTimeMS, TimeUnit.MILLISECONDS)
					.maxConnectionIdleTime(maxConnectionIdleTimeMS, TimeUnit.MILLISECONDS);

			Block<SocketSettings.Builder> socketSettings = builder -> builder
					.connectTimeout(connectTimeoutMS, TimeUnit.MILLISECONDS)
					.readTimeout(readTimeoutMS, TimeUnit.MILLISECONDS)
					.receiveBufferSize(receiveBufferSize).sendBufferSize(sendBufferSize);

			MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
					.applyToClusterSettings(clusterSettings)
					.applyToConnectionPoolSettings(connectionPoolSettings)
					.applyToSocketSettings(socketSettings)
					.build();

			mongoClient = MongoClients.create(mongoClientSettings);
			mongoDatabase = mongoClient.getDatabase(mongodbName);
			mongoCollection = mongoDatabase.getCollection(mongodbCollectionName);
		} catch (Exception e) {
			LogUtil.error("MongodbDaoImpl init failed:", e);
		}
	}

	public MongoDatabase getMongoDatabase() {
		return mongoDatabase;
	}
}