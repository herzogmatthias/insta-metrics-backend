define({ "api": [
  {
    "type": "get",
    "url": "/hashtag/posts-for-tag/:hashtag",
    "title": "",
    "name": "PostsForTag",
    "description": "<p>Get the number of posts under a Hashtag</p>",
    "group": "Hashtag",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hashtag",
            "description": "<p>The Hashtag</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "posts",
            "description": "<p>The number of posts under the Hashtag</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"posts\": 234214\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "Hashtag"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "",
    "name": "Login",
    "description": "<p>Route to Login to the Website</p>",
    "group": "Misc",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password for the Website</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Error happened?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Bearer Auth token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"error\": false,\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773\",\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PasswordFalse",
            "description": "<p>The Password provided was false</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "Misc"
  },
  {
    "type": "get",
    "url": "/post/details-for-pictures/:shortcode",
    "title": "",
    "name": "DetailsForPicture",
    "description": "<p>Get detailed Information about a specific Post</p>",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "shortcode",
            "description": "<p>unique IG id of a picture</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The ig shortcode of the Image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "er",
            "description": "<p>The Engagement Rate of the Image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "caption",
            "description": "<p>The Description of the Image</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likes",
            "description": "<p>The Likes which the Image got</p>"
          },
          {
            "group": "Success 200",
            "type": "Tag[]",
            "optional": false,
            "field": "hashTags",
            "description": "<p>The hashtags which the user used in the caption</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hashTags.name",
            "description": "<p>The name of the Hashtag</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "hashTags.posts",
            "description": "<p>The number of posts with specific Hashtag</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comments",
            "description": "<p>The number of comments</p>"
          },
          {
            "group": "Success 200",
            "type": "BasicUserInformation",
            "optional": false,
            "field": "Owner",
            "description": "<p>the owner of the Image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "owner.avatar",
            "description": "<p>The profile Picture of the owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "owner.name",
            "description": "<p>The name of the owner</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "owner.username",
            "description": "<p>The unique IG username of the owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Comment[]",
            "optional": false,
            "field": "previewComments",
            "description": "<p>An Array of comments written under the post</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "previewComments.likes",
            "description": "<p>Number of likes which the comment has</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "previewComments.timeStamp",
            "description": "<p>Timestamp when the comment was posted</p>"
          },
          {
            "group": "Success 200",
            "type": "BasicUserInformation",
            "optional": false,
            "field": "previewComments.owner",
            "description": "<p>Owner of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "previewComments.text",
            "description": "<p>Content of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "Image[]",
            "optional": false,
            "field": "images",
            "description": "<p>Images related to the post</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "images.isVideo",
            "description": "<p>Is Image a Video?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images.display_url",
            "description": "<p>The url of the image</p>"
          },
          {
            "group": "Success 200",
            "type": "BasicUserInformation[]",
            "optional": false,
            "field": "images.tagged_users",
            "description": "<p>The users who are tagged in the image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n  \"id\": \"B_x3iB_naw8\",\n   \"er\": 4.8616299010544815,\n   \"timeStamp\": 1588623726,\n   \"hashTags\": [{\"name\":\"meme\", \"posts\": 30000}],\n   \"caption\": \"🎾 🤍🤍🤍 hi #meme\",\n   \"comments\": 54738,\n   \"likes\": 8388016,\n   \"owner\": {\n       \"avatar\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/88969499_231226268049340_341618078066409472_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=VYhNq4OhlLIAX9GYc8v&oh=92c70c981fa914f296a637e474f79f52&oe=5EDB9F0B\",\n       \"name\": \"Kylie 🤍\",\n       \"username\": \"kyliejenner\"\n    },\n    \"previewComments\": [\n      {\n        \"likes\": 0,\n        \"timeStamp\": 1588674430,\n        \"owner\": {\n          \"avatar\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/87854878_635204607046228_2637245967128068096_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=0h43tmD6zswAX9e2MAG&oh=e17f8aab91a7ad62a676784e1b299504&oe=5EDA0D39\",\n          \"name\": \"\",\n          \"username\": \"mrwnlqnwny\"\n        },\n        \"text\": \"اتمنا اتكون شريكت حياتي بجمالج انتي جميلة❤️💜💚💙💛🌹🌸🌷💐\"\n      },\n    ],\n    \"images\": [\n      {\n        \"isVideo\": false,\n        \"display_url\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/95477677_542820166426139_3025352104743603900_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=yVP6ukfagT4AX_efQr2&oh=20249261f8f32a0d446c826b7ecaade8&oe=5ED92F3C\",\n        \"tagged_users\": [{\"avatar\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/87854878_635204607046228_2637245967128068096_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=0h43tmD6zswAX9e2MAG&oh=e17f8aab91a7ad62a676784e1b299504&oe=5EDA0D39\",\n          \"name\": \"asdfsadf\",\n          \"username\": \"mrwnlqnwny\"}]\n      },\n      {\n        \"isVideo\": false,\n        \"display_url\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/96091948_117006173327752_9000982950821661011_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=c8uq6TQqrP0AX_GOvoz&oh=5634fb7868ebd2d8f0850ce6cd338b63&oe=5EDB30BE\",\n        \"tagged_users\": []\n      },\n      {\n        \"isVideo\": false,\n        \"display_url\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/95561720_655710378553301_401467551532294014_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=lUXRZw4nmdYAX8zzd9v&oh=59106f3c179e6823688e1750225a678e&oe=5EDB0544\",\n        \"tagged_users\": []\n      }\n    ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/post/er-for-post/:username",
    "title": "",
    "name": "ErForPost",
    "description": "<p>Get the Engagement Rate for a specific post</p>",
    "group": "Post",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Shortcode of the post</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique IG Username</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "engagementRate",
            "description": "<p>The Engagement Rate For the specific Post</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"engagementRate\": 4.34\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/post/last-fifty-pictures/:username",
    "title": "",
    "name": "LastFiftyPictures",
    "description": "<p>Get The Last Fifty Pictures for a Username</p>",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique IG Username</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ImagePreview[]",
            "optional": false,
            "field": "images",
            "description": "<p>An Array of images</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images.id",
            "description": "<p>The ig shortcode of the Image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images.er",
            "description": "<p>The Engagement Rate of the Image</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images.caption",
            "description": "<p>The Description of the Image</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "images.likes",
            "description": "<p>The Likes which the Image got</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "images.comments",
            "description": "<p>The number of comments</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images.author",
            "description": "<p>The name of the Author</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images.avatarUrl",
            "description": "<p>The Profile picture of the Author</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "images.imageUrl",
            "description": "<p>The Url of the Image itself</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "images.timeStamp",
            "description": "<p>The Timestamp when the image got posted</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "images.isVideo",
            "description": "<p>Is the posted Content a Video?</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "images.multipleViews",
            "description": "<p>Has the posted Content more than one view?</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [\n   {\n     \"id\": \"B_x3iB_naw8\",\n     \"er\": 4.833289682279117,\n     \"caption\": \"🎾 🤍🤍🤍 hi\",\n     \"likes\": 8339178,\n     \"comments\": 54298,\n     \"author\": \"Kylie 🤍\",\n     \"avatarUrl\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/88969499_231226268049340_341618078066409472_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=VYhNq4OhlLIAX9GYc8v&oh=92c70c981fa914f296a637e474f79f52&oe=5EDB9F0B\",\n     \"imageUrl\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/95477677_542820166426139_3025352104743603900_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=yVP6ukfagT4AX_efQr2&oh=20249261f8f32a0d446c826b7ecaade8&oe=5ED92F3C\",\n     \"timeStamp\": 1588623726,\n     \"isVideo\": false,\n     \"multipleViews\": true\n   }\n ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RateLimitReached",
            "description": "<p>The Rate Limit of IG reached</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/post/rankings-for-picture/:shortcode",
    "title": "",
    "name": "RankingsForPicture",
    "description": "<p>Get the differnt ranks for a picture and how it compares in different categories to your other pictures</p>",
    "group": "Post",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "shortcode",
            "description": "<p>unique IG id of a picture</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Ranking[]",
            "optional": false,
            "field": "rankings",
            "description": "<p>The different rankings</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rankings.rank",
            "description": "<p>The rank which the picture has compared to others</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "rankings.percentage",
            "description": "<p>The percentage shows how many pictures performed worse than this</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "rankings.type",
            "description": "<p>The Category in which the Picture gets compared</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [\n    {\n        \"rank\": 18,\n        \"percentage\": 64,\n        \"type\": \"Likes\"\n    },\n    {\n        \"rank\": 21,\n        \"percentage\": 58,\n        \"type\": \"Comments\"\n    },\n    {\n        \"rank\": 17,\n        \"percentage\": 66,\n        \"type\": \"Engagement Rate\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/user/avg-engagementrate/:username",
    "title": "",
    "name": "AvgEngagementRate",
    "description": "<p>Get the average Engagement Rate of an User based on the last 50 Pictures</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique IG Username</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "er",
            "description": "<p>The average Egagement Rate</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comments",
            "description": "<p>The average amount of comments</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"er\": 4.5\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/avg-likes-and-comments/:username",
    "title": "",
    "name": "AvgLikesAndComments",
    "description": "<p>Get the average Likes and Comments of an User based on the last 50 Pictures</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique IG Username</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "likes",
            "description": "<p>The average amount of likes</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comments",
            "description": "<p>The average amount of comments</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"likes\": 10,\n   \"comments\": 20\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/avg-price-for-ads/:username",
    "title": "",
    "name": "AvgPriceForAds",
    "description": "<p>Get the average Price for ads based on th Engagement Rate</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique IG Username</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "min",
            "description": "<p>The minimum price for an Ad</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "max",
            "description": "<p>The maximum price for an Ad</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"min\": 10,\n   \"max\": 20\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/delete/:username",
    "title": "",
    "description": "<p>Delete a User by Username</p>",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique IG Username</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Error happened?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text to descripe what happened</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"error\": false,\n   \"text\": \"User deleted!\",\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/general-information/:username",
    "title": "",
    "name": "GeneralInformation",
    "description": "<p>Get the general Information about an User</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique IG Username</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>The Username of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "followers",
            "description": "<p>The number of followers the User has</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "igId",
            "description": "<p>The unique Instagram Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cursor",
            "description": "<p>The Cursor for Instagram queries</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "posts",
            "description": "<p>The number of posts a User has made</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "following",
            "description": "<p>The number of Users the User follows</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avgLikes",
            "description": "<p>The average likes the User gets</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "avgComments",
            "description": "<p>The average Comments the User gets</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avgEngagementRate",
            "description": "<p>The average Engagement Rate the User gets</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avgPriceMin",
            "description": "<p>The minimum price for Ads</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avgPriceMax",
            "description": "<p>The maximum price for Ads</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isBot",
            "description": "<p>Is the User a Bot?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>The Caption of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>The Profile Picture Url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The non unique name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>When was the DB entry created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>When was the DB entry last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"id\": 4,\n   \"userName\": \"kyliejenner\",\n   \"followers\": 173661327,\n    \"igId\": \"12281817\",\n    \"cursor\": \"QVFBb29RMjBTd3R2RWlYZGwzZ3lfQjB4VnFWZUtFN2t4X3BLSk85SE80UmhjWUhFTF91RnRMeGE0UGwyOHB6Z0MxZURfbER0dE5XZDFxWWRrVmpYOTcyVQ==\",\n    \"posts\": 6378,\n    \"following\": 139,\n    \"avgLikes\": 8536573,\n    \"avgComments\": 59801,\n    \"avgEngagementRate\": \"4.95\",\n    \"avgPriceMin\": \"972503.43\",\n    \"avgPriceMax\": \"1276410.75\",\n    \"isBot\": false,\n    \"createdAt\": \"2020-05-03T11:14:00.000Z\",\n    \"updatedAt\": \"2020-05-05T09:36:23.000Z\",\n    \"description\": \"@kyliecosmetics @kylieskin\",\n    \"avatar\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/88969499_231226268049340_341618078066409472_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=VYhNq4OhlLIAX9GYc8v&oh=92c70c981fa914f296a637e474f79f52&oe=5EDB9F0B\",\n    \"name\": \"Kylie 🤍\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/basic-information",
    "title": "",
    "name": "GetBasicInformation",
    "description": "<p>Get the Basic Informations for all Users</p>",
    "group": "User",
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "BasicUserInformation[]",
            "optional": false,
            "field": "users",
            "description": "<p>Array of Users</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.username",
            "description": "<p>Unique Username of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.name",
            "description": "<p>Not unique name of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.avatar",
            "description": "<p>Profile Picture Url of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "users.isBot",
            "description": "<p>Is User a selfmade Bot?</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [\n   {\n     \"avatar\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/90180510_1304649566401948_7586900621320519680_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=0CJxWiguaUgAX88w5p8&oh=37b807b7fc03a7c7165e0f9752b2f5e9&oe=5EDA7458\",\n     \"name\": \"TouchedMePickles\",\n     \"username\": \"memez.every.day.bro\",\n     \"isBot\": true\n   },\n   {\n     \"avatar\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/88969499_231226268049340_341618078066409472_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=VYhNq4OhlLIAX9GYc8v&oh=92c70c981fa914f296a637e474f79f52&oe=5EDB9F0B\",\n     \"name\": \"Kylie 🤍\",\n     \"username\": \"kyliejenner\",\n     \"isBot\": false\n   }\n ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RateLimitReached",
            "description": "<p>The Rate Limit of IG reached</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/graph-data/:username",
    "title": "",
    "name": "GraphData",
    "description": "<p>Get the historic data for Engagement Rate, Likes and Comments</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique IG Username</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "GraphData[]",
            "optional": false,
            "field": "graphs",
            "description": "<p>The different graphs</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "graphs.header",
            "description": "<p>The type of the Graph</p>"
          },
          {
            "group": "Success 200",
            "type": "chart[]",
            "optional": false,
            "field": "graphs.chart",
            "description": "<p>The data for the Graph</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "graphs.chart.name",
            "description": "<p>Timestamp when the image was posted</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "graphs.chart.data",
            "description": "<p>The value e.g. likes or comments</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [\n   {\n   \"header\": \"Engagement Rate\",\n   \"chart\": [\n     {\n       \"name\": 132123132,\n       \"data\": 4.23\n     },\n     {\n       \"name\": 132123132,\n       \"data\": 4.23\n     }\n     ]\n    },\n    {\n   \"header\": \"Likes\",\n   \"chart\": [\n           {\n             \"name\": 132123132,\n             \"data\": 12334\n           },\n           {\n             \"name\": 132123132,\n             \"data\": 123234\n           }\n         ]\n    },\n   {\n   \"header\": \"Comments\",\n   \"chart\": [\n           {\n             \"name\": 132123132,\n             \"data\": 12334\n           },\n           {\n             \"name\": 132123132,\n             \"data\": 123234\n           }\n         ]\n    }\n ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RateLimitReached",
            "description": "<p>The Rate Limit of IG reached</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/new/:username",
    "title": "",
    "name": "NewUser",
    "description": "<p>Add a new User by Username</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique IG Username</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Error happend?</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text to descripe what happend</p>"
          },
          {
            "group": "Success 200",
            "type": "BasicUserInformation",
            "optional": false,
            "field": "user",
            "description": "<p>The New User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Unique Username of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Not unique name of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.avatar",
            "description": "<p>Profile Picture Url of the User</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "user.isBot",
            "description": "<p>Is User a selfmade Bot?</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n   \"error\": false,\n   \"text\": \"New User added!\",\n  \"basicInformation\": {\n    \"avatar\": \"https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/11348214_1481558242162220_192850898_a.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=B7-pbvVKmuUAX8eN6tC&oh=6a31cb46581f18fddc455b6143ef4461&oe=5EDBE1DB\",\n     \"name\": \"flame\",\n     \"username\": \"travisscott\",\n     \"isBot\": \"false\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserAlreadyExists",
            "description": "<p>The User was already added</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The User was not found</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserIsPrivate",
            "description": "<p>The User is private</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/tags/:username",
    "title": "",
    "name": "Tags",
    "description": "<p>Get Tags with imagga for the images the User posts</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Users unique IG Username</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Response Headers": [
          {
            "group": "Response Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Bearer token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Tag[]",
            "optional": false,
            "field": "tags",
            "description": "<p>The different tags</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "tags.confidence",
            "description": "<p>The confidence level of the image recognition</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "tags.tag",
            "description": "<p>One tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tags.tag.en",
            "description": "<p>Name of the tag</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [\n     {\n        \"confidence\": 100,\n        \"tag\": {\n            \"en\": \"racket\"\n        }\n    },\n    {\n        \"confidence\": 100,\n        \"tag\": {\n            \"en\": \"sports implement\"\n        }\n    },\n    {\n        \"confidence\": 100,\n        \"tag\": {\n            \"en\": \"bath towel\"\n        }\n    },\n    {\n        \"confidence\": 100,\n        \"tag\": {\n            \"en\": \"bath linen\"\n        }\n    },\n    {\n        \"confidence\": 100,\n        \"tag\": {\n            \"en\": \"towel\"\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenNotSupplied",
            "description": "<p>The Auth Token was not supplied</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenWrong",
            "description": "<p>The Auth token was wrong</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/routes.ts",
    "groupTitle": "User"
  }
] });
