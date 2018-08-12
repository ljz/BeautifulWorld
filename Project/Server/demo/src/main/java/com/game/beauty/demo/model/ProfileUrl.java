package com.game.beauty.demo.model;

public class ProfileUrl {
    private long id;
    private String profileUrl;

    public ProfileUrl(long id, String profileUrl) {
        this.id = id;
        this.profileUrl = profileUrl;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }
}
